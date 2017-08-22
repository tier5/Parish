<?php

namespace App\Http\Controllers\Api\V1;
use App\Exceptions\HttpBadRequestException;
use App\Models\User;
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

            $user->save();

            /**
             * Fire a mail to info@parish.com with original subject and message
             */
             Mail::send('emails.registerEmail', [
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'email' => 'info@parish.com',
            ], function ($mail) use ($user) {
                /** @noinspection PhpUndefinedMethodInspection */
                $mail->from($user->email, 'WEM Registraion');
                /** @noinspection PhpUndefinedMethodInspection */
                $mail->to('work@tier5.us', "Parish")
                    ->subject('Parish Registraion');
            });

            $response = [
                'status' => true,
                'message' => "Message sent successfully."
            ];

            $response = [
                'status' => true,
                'message' => "User signed up successfully."
            ];
            $responseCode = 201;
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status' => false,
                'error' => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (QueryException $queryException) {
            if (!empty($queryException->errorInfo) && $queryException->errorInfo[1] == 1062) {
                $response = [
                    'status' => false,
                    'error' => "User is already signed up.",
                ];
                $responseCode = 409;
            } else {
                $response = [
                    'status' => false,
                    'error' => "Internal server error.",
                    'error_info' => $queryException->getMessage()
                ];
                $responseCode = 500;
            }
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status' => false,
                'error' => "Internal server error.",
                'error_info' => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status' => false,
                'error' => "Internal server error.",
                'error_info' => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
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
    public function signIn(Request $request)
    {
        try {
            /**
             * Validate mandatory fields
             */
            if (!$request->has('email'))
                throw new HttpBadRequestException("Email is required.");
            if (!$request->has('password'))
                throw new HttpBadRequestException("Password is required.");

            /**
             * Authenticate user using JWTAuth
             */
            if ($token = JWTAuth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();

                if ($user->deleted_at != null){
                /** can't login due to soft delete */
                 $response = [
                    'status' => false,
                    'error' => "Invalid email or password.",
                    'token' => $token
                ];
                $responseCode = 422;
                }
                else
                {
                    if ($user->user_status == 0){
                    /** can't login due to status is on hold */
                     $response = [
                        'status' => false,
                        'error' => "User account on hold.",
                        'token' => $token
                    ];
                    $responseCode = 422;
                    }
                    else
                    {
                      $response = [
                    'status' => true,
                    'message' => "User signed in successfully.",
                    'user_type' => $user->user_type,
                    'token' => $token,
                    ];
                    $responseCode = 200; 
                    }
                }
            } else {
                $response = [
                    'status' => false,
                    'error' => "Invalid email or password.",
                    'token' => $token
                ];
                $responseCode = 422;
            }
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status' => false,
                'error' => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } /** @noinspection PhpUndefinedClassInspection */ catch (JWTAuthException $JWTAuthException) {
            $response = [
                'status' => false,
                'error' => "Failed to create token.",
                'error_info' => $JWTAuthException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            $response = [
                'status' => false,
                'error' => "Internal server error.",
                "error_info" => $exception->getMessage()
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
                'status' => true,
                'message' => 'User signed out successfully.'
            ];
            $responseCode = 200;
        } catch (JWTException $JWTException) {
            $response = [
                'status' => false,
                'error' => "Token mismatched.",
                'error_info' => $JWTException->getMessage()
            ];
            $responseCode = 401;
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            $response = [
                'status' => false,
                'error' => "Internal server error.",
                "error_info" => $exception->getMessage()
            ];
            $responseCode = 500;
        }

        return response()->json($response, $responseCode);
    }

}