<?php
/**
 * Functional Scope: API for Sign Up, Sign In and Sign Out.
 */
namespace App\Http\Controllers\Api\V1;
use App\Exceptions\HttpBadRequestException;
use App\Models\Parish;
use App\Models\User;
use App\Models\Subscription;
use App\Models\PasswordReset;
use Auth;
use Crypt;
use DB;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use JWTAuthException;
use Log;
use Mail;
use Tymon\JWTAuth\Exceptions\JWTException;
use \Stripe\Plan;

class AuthController extends Controller {

    /**
     * Signs up a new user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws HttpBadRequestException
     */

    public function signUp(Request $request) {

        try {

            DB::beginTransaction();

            $user = new User();

            /**
             * Validate mandatory fields and register a new user
             */
            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("First name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            if ($request->has('email'))

                $user->email = $request->input('email');
            else
                throw new HttpBadRequestException("Email is required.");

            if ($request->has('password'))

                $user->password = $request->input('password');
            else
                throw new HttpBadRequestException("Password is required");

            if ($request->has('confirm_password'))

                $user->password = $request->input('confirm_password');
            else
                throw new HttpBadRequestException("Password is required");

            /**
             * Check user present or not then update or create only for soft deleted user
             */

            $registerUser = User::where('email', $request->input('email'))->whereNotNull('deleted_at')->first();

            if(count($registerUser)) {

                $registerUser->first_name   = $request->input('first_name');
                $registerUser->last_name    = $request->input('last_name');
                $registerUser->email        = $request->input('email');
                $registerUser->password     = $request->input('password');
                $registerUser->uniqueKey    = Crypt::encrypt($request->input('password'));
                $registerUser->deleted_at   = NULL;
                $registerUser->save();

            } else {

                /**
                 * Check unique user
                 */

                $registerUser = User::where('email', $request->input('email'))->first();

                if(count($registerUser)) {

                $response = [
                    'status'    => false,
                    'error'     => "User is already signed up.",
                ];
                $responseCode = 409;

                return response()->json($response, $responseCode);

                } else {

                $user->uniqueKey = Crypt::encrypt($request->input('password'));

                // start stripe payment charge 

                $key  = \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                $stripe_token = $request->input('token');
                $creditCardToken = $stripe_token['id'];
                $plan_id = $request->input('planId');
                $plan = \Stripe\Plan::retrieve($plan_id);
                $amount = $plan->amount;
                $currency = $plan->currency;
                
                $customer = \Stripe\Customer::create(array(
                  "email" => $request->input('email'),
                  "source" => $creditCardToken,
                ));

                
                    $user->stripe_id = $customer->id;
                    $user->card_brand = $stripe_token['card']['brand'];
                    $user->card_last_four = $stripe_token['card']['last4'];
                    $user->save();
                    $subscription =\Stripe\Subscription::create(array(
                      "customer" => $customer->id,
                      "items" => array(
                        array(
                          "plan" => $plan_id,
                        ),
                      )
                    )); 

                    if($subscription->id) {
                        $subscribe = new Subscription();
                        $subscribe->user_id = $user->id;
                        $subscribe->name = $plan->interval;
                        $subscribe->stripe_id = $subscription->id;
                        $subscribe->stripe_plan = $plan_id;
                        $subscribe->quantity = 1;
                        $subscribe->save();

                        $subscription_ends      = date('m/d/Y',$subscription->current_period_end);
                        $subscription_starts    = date('m/d/Y',$subscription->current_period_start);
                        $planAmount             = ($amount/100);
                         /**
                         * Fire a mail to user with original subject and message
                         */

                         Mail::send('emails.registerEmail', [
                            'firstName'             => $user->first_name,
                            'lastName'              => $user->last_name,
                            'email'                 => 'info@parish.com',
                            'subscription_ends'     => $subscription_ends,
                            'subscription_starts'   => $subscription_starts,
                            'amount'                => $planAmount,
                            'plan'                  => $plan->name,
                            'interval'              => $plan->interval
                        ], function ($mail) use ($user) {
                            /** @noinspection PhpUndefinedMethodInspection */
                            $mail->from($user->email, 'WEM Registraion');
                            /** @noinspection PhpUndefinedMethodInspection */
                            $mail->to($user->email, "Parish")
                                ->subject('Parish WEM Registraion');
                        });
                    }

                    $response = [
                        'status'    => true,
                        'message'   => "Message sent successfully."
                    ];

                    $response = [
                        'status'    => true,
                        'message'   => "User signed up successfully."
                    ];
                    $responseCode = 201;                                                                                            
                }
            }

           

        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status' => false,
                'error' => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (QueryException $queryException) {

            if (!empty($queryException->errorInfo) && $queryException->errorInfo[1] == 1062) {
                $response = [
                    'status'    => false,
                    'error'     => "User is already signed up.",
                ];
                $responseCode = 409;
            } else {
                $response = [
                    'status'        => false,
                    'error'         => "Internal server error.",
                    'error_info'    => $queryException->getMessage()
                ];
                $responseCode = 500;
            }

        } catch (ClientException $clientException) {

            DB::rollBack();

            $response = [
                'status'            => false,
                'error'             => "Internal server error.",
                'error_info'        => $clientException->getMessage()
            ];
            $responseCode = 500;

        } catch (Exception $exception) {

            DB::rollBack();

            Log::error($exception->getMessage());
            $error_message = ($exception->getMessage()=='Your card has expired.')?'Your card has expired.':(($exception->getMessage()=='Your card was declined.')?'Your card was declined.':'Internal server error.');
            $response = [
                'status'            => false,
                'error'             =>  $error_message,//"Internal server error.",
                'error_info'        => $exception->getMessage()
            ];

            $responseCode = 500;

        } finally {

            DB::commit();

            unset($user);
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Function to get all plans from stripe
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws HttpBadRequestException
     */

    public function listPlan(Request $request) {
        try {

            $key = \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $getAllPlans = \Stripe\Plan::all();
            $plans = [];
            if($getAllPlans && $getAllPlans->data) {
                foreach($getAllPlans->data as $key=>$value) {
                    $plans[$key]['id'] = $value->id;
                    $plans[$key]['name'] = $value->name;
                    $plans[$key]['amount'] = $value->amount;
                    $plans[$key]['currency'] = $value->currency;
                    $plans[$key]['interval'] = $value->interval;
                    $plans[$key]['trial_period_days'] = $value->trial_period_days;
                    $plans[$key]['statement_descriptor'] = $value->statement_descriptor;
                    $plans[$key]['created'] = $value->created;
                }
                $response = [
                    'status'    => true,
                    'message'   => 'Fetched all plans Successfully.',
                    'plans'     =>  $plans
                ];
                $responseCode = 200;
            } else {
                 $response = [
                    'status'    => true,
                    'message'   => 'No plans found.',
                    'plans'     => $plans
                ];
                $responseCode = 200;
            }
        } catch (HttpBadRequestException $httpBadRequestException) {

            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } 

        return response()->json($response, $responseCode);
    }

 
    /**
     * Function to validate email
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws HttpBadRequestException
     */

    public function validationEmail(Request $request) {
        try {
            $email       = $request->input('email');
            $emailExists = User::where('email',$email)->count();
            if($emailExists > 0){
                $response = [
                'status'      => false,
                'message'     => 'Email already exists.'
                ];
                $responseCode = 200;  
            } else {
                $response = [
                'status'      => true,
                'message'     => 'Email is available.'
                ];
                $responseCode = 200;   
            }
            
        } catch (HttpBadRequestException $httpBadRequestException) {

            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } 

        return response()->json($response, $responseCode);
    }

    /**
     * Signs in a authenticated user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws HttpBadRequestException
     */

    public function signIn(Request $request) {

        try {

            /**
             * Validate mandatory fields
             */
            if (!$request->has('username'))

                throw new HttpBadRequestException("Username is required.");

            if (!$request->has('password'))

                throw new HttpBadRequestException("Password is required.");

            /**
             * Authenticate user using JWTAuth
             */

            $field = filter_var($request->input('username'), FILTER_VALIDATE_EMAIL) ? 'email' : 'parish_id';
            $request->merge([$field => $request->input('username')]);

            if ($token = JWTAuth::attempt($request->only($field, 'password'))) {
                $user = Auth::user();

                if ($user->deleted_at != null){
                /** can't login due to soft delete */
                 $response = [
                    'status'    => false,
                    'error'     => "Invalid username or password.",
                    'token'     => $token
                ];
                $responseCode = 422;

                } else {

                    if ($user->user_status == 0){
                    /** can't login due to status is on hold */
                     $response = [
                        'status'    => false,
                        'error'     => "User account on hold.",
                        'token'     => $token
                    ];
                    $responseCode = 423;
                    }
                    else
                    {
                        if($user->user_type==3) {
                            $paymentStatus = Parish::where('user_id', $user->id)->get()->first()->payment_status;
                            $penaltyPercent = Parish::where('user_id', $user->id)->get()->first()->penalty_percent;
                        } else {
                            $paymentStatus = 1;
                            $penaltyPercent = 0.00;

                        }

                    $response = [
                        'status'            => true,
                        'message'           => "User signed in successfully.",
                        'user_id'           => $user->id,
                        'user_first_name'   => $user->first_name,
                        'user_last_name'    => $user->last_name,
                        'user_type'         => $user->user_type,
                        'pastor_type'       => $user->pastor_type,
                        'token'             => $token,
                        'payment_status'    => $paymentStatus,
                        'penalty_percent'   => $penaltyPercent
                    ];
                    $responseCode = 200; 
                    }
                }
            } else {
                $response = [
                    'status'    => false,
                    'error'     => "Invalid username or password."
                ];
                $responseCode = 422;
            }

        } catch (HttpBadRequestException $httpBadRequestException) {

            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } /** @noinspection PhpUndefinedClassInspection */ 
        catch (JWTAuthException $JWTAuthException) {

            $response = [
                'status'        => false,
                'error'         => "Failed to create token.",
                'error_info'    => $JWTAuthException->getMessage()
            ];
            $responseCode = 500;

        } catch (Exception $exception) {

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                "error_info"    => $exception->getMessage()
            ];
            $responseCode = 500;
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Signs out a user
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function signOut()
    {
        try {
            /*
             * When user request for signing out, invalidate JWT token
             */
            JWTAuth::invalidate(JWTAuth::getToken());

            $response = [
                'status'        => true,
                'message'       => 'User signed out successfully.'
            ];
            $responseCode = 200;

        } catch (JWTException $JWTException) {
            $response = [
                'status'        => false,
                'error'         => "Token mismatched.",
                'error_info'    => $JWTException->getMessage()
            ];
            $responseCode = 401;
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                "error_info"    => $exception->getMessage()
            ];
            $responseCode = 500;
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Forget password generate url
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function forgetPassword(Request $request) {
        try {

            /**
             * Validate mandatory fields
             */
            if (!$request->has('email'))

                throw new HttpBadRequestException("Email is required.");
            
            $user = User::where('email',$request->input('email'))->first();
            if ($user) {
                
                if ($user->deleted_at != null){
                /** can't login due to soft delete */
                $response = [
                    'status'    => false,
                    'error'     => "User already deleted, so cannot reset password.",
                ];
                $responseCode = 422;

                } else {

                /**
                 * Fire a mail to user with original subject and message
                 */
                    $token = str_random(64);
                    $reset = new PasswordReset();
                    $reset->email = $user->email;
                    $reset->token = $token;
                    $reset->created_at = date('Y-m-d h:i:j');
                    $reset->save();
                    $url = url('/') . '/reset-password/' . $user->email . '/' . $token;
                    $name = $user->firstName . ' ' . $user->lastName;

                     Mail::send('emails.resetpasswordEmail', [
                        'firstName'     => $user->first_name,
                        'lastName'      => $user->last_name,
                        'email'         => 'info@parish.com',
                        'url'           => $url
                        
                    ], function ($mail) use ($user) {
                        /** @noinspection PhpUndefinedMethodInspection */
                        $mail->from('info@parish.com', 'WEM Reset-Password');
                        /** @noinspection PhpUndefinedMethodInspection */
                        $mail->to($user->email, "Parish")
                            ->subject('Parish WEM Re-set Password Link');
                    });
                    $response = [
                        'status'            => true,
                        'message'           => "Confirmation mail send to your email address.",
                    ];
                    $responseCode = 200; 
                }
            } else {
                $response = [
                    'status'    => false,
                    'error'     => "Sorry! no data avilable for this email address."
                ];
                $responseCode = 422;
            }

        } catch (HttpBadRequestException $httpBadRequestException) {    

            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } /** @noinspection PhpUndefinedClassInspection */ 
        catch (JWTAuthException $JWTAuthException) {

            $response = [
                'status'        => false,
                'error'         => "Failed to create token.",
                'error_info'    => $JWTAuthException->getMessage()
            ];
            $responseCode = 500;

        } catch (Exception $exception) {

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                "error_info"    => $exception->getMessage()
            ];
            $responseCode = 500;
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Reset Password if user Successfully fill up his reset password form
     *
     * @return \Illuminate\Http\JsonResponse
     */
      
    public function resetPassword(Request $request) {
        $reset = PasswordReset::where('email', $request->email)->where('token', $request->token)->first();
        if ($reset != null) {
            /*if (strtotime($reset->created_at) > strtotime("-30 minutes")) {*/
                if ($request->email != null && $request->password != null && $request->confirm_password != null) {
                    if ($request->password == $request->confirm_password) {
                        
                        $user = User::where('email', $request->email)->first();
                        if ($user != null) {
                            $user->password = $request->input('password');
                            $user->uniqueKey = Crypt::encrypt($request->input('password'));
                            $user->update();
                            $password = PasswordReset::where('email', $user->email)->delete();
                            
                            $response = [
                                'status'        => true,
                                'message'         => "Password Reset Successfully"
                            ];
                            $responseCode = 200;
                            return response()->json($response, $responseCode);
                        } else {
                            $response = [
                                'status'        => false,
                                'error'         => "User not Found"
                            ];
                            $responseCode = 400;
                            return response()->json($response, $responseCode);
                        }
                    } else {
                        $response = [
                            'status'        => false,
                            'error'         => "Password and confirm should be same"
                        ];
                        $responseCode = 406;
                        return response()->json($response, $responseCode);
                    }
                } else {
                    
                    $response = [
                    'status'        => false,
                    'error'         => "Enter Password and confirm password"
                    ];
                    $responseCode = 406;
                    return response()->json($response, $responseCode);
                }
            /*} else {
                $response = [
                    'status'        => false,
                    'error'         => "Token expired"
                ];
                $responseCode = 403;
                return response()->json($response, $responseCode);
            }*/
        } else {
            $response = [
                'status'        => false,
                'error'         => "Token not valid or You Use this token already"
            ];
            $responseCode = 403;
            return response()->json($response, $responseCode);
        }
    }
}