<?php
/**
* ParishController constructor.
* @param Request $request
*/

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Provience;
use App\Models\Report;
use App\Models\Zone;
use App\Models\Area;
use App\Models\User;
use App\Models\Parish;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\WemPayment;
use App\Helpers;
use Crypt;
use DB;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;
use Log;
use SoftDeletes;
use \Stripe;

class ParishController extends Controller {

    /**
     * @var null|string
     */

    private $userId = null;

    /**
     * @var null|string
     */

    private $userName = null;

    /**
     * @var null|string
     */

    private $randomUsername = null;

     /**
     * @var null|string
     */

    private $randomPassword = null;   

    /**
     * Get Parish list
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getParishList(Request $request,$user_id) {

        try {

            DB::beginTransaction();

            $parishes   =Parish::where('created_by',$user_id)->whereNull('deleted_at')->get();

            $noOfParish =count($parishes);

            if($parishes){

                $parishArray = [];

                foreach ($parishes as $key => $parish) {

                    $parishArray[$key]['id']                    = $parish->id;
                    $parishArray[$key]['user_id']               = $parish->users->id;
                    $parishArray[$key]['parish_id']             = $parish->users->parish_id;
                    $parishArray[$key]['parish_name']           = $parish->name;
                    $parishArray[$key]['province_name']         = $parish->areas->zones->proviences->name;
                    $parishArray[$key]['zone_name']             = $parish->areas->zones->name;
                    $parishArray[$key]['area_name']             = $parish->areas->name;
                    $parishArray[$key]['pastor_name_area']      = $parish->areas->users->first_name;
                    $parishArray[$key]['pastor_name_zone']      = $parish->areas->zones->users->first_name;
                    $parishArray[$key]['pastor_name_province']  = $parish->areas->zones->proviences->users->first_name;
                    $parishArray[$key]['password']              = $parish->users->uniqueKey;
                    $parishArray[$key]['first_name']            = $parish->users->first_name;
                    $parishArray[$key]['last_name']             = $parish->users->last_name;
                    $parishArray[$key]['payment_status']        = $parish->payment_status;
                    $parishArray[$key]['penalty_percent']       = $parish->penalty_percent;
                }
                    $response = [
                        'status'    => true,
                        'message'   => $noOfParish . ($noOfParish > 1 ? " parish have " : " parish has ") . "been found.",
                        'parish'    => $parishArray
                    ];
                    $responseCode = 200;

            } else {
                $response = [
                    'status' => false,
                    'message' => "No parish has been found."
                ];
                $responseCode = 404;
            }

        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Create a new Parish with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createParish(Request $request)
    {
        try {

            DB::beginTransaction();

            $parish = new Parish();

            $user   = new User();

            /*
             * Validate mandatory fields
             */
            if ($request->has('area_id'))

                $parish->area_id = $request->input('area_id');
            else
                throw new HttpBadRequestException("Area selection is required.");

            if ($request->has('parish_name'))

                $parish->name = $request->input('parish_name');
            else
                throw new HttpBadRequestException("Parish name is required.");

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("First name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            if ($request->has('start_date'))

                $parish->start_date = $request->input('start_date');
            else
                throw new HttpBadRequestException("Start Date is required.");

            $this->randomUsername = Helpers::generateNumber();

            $this->randomPassword = Helpers::generateNumber();

            /**
             * Check unique user
             */
        
            $registerUser = User::where('parish_id', $this->randomUsername)->first();


            if(count($registerUser)) {

                return $this->createProvience();

            } 

            $user->parish_id    = $this->randomUsername;

            $user->password     = $this->randomPassword;

            $user->uniqueKey    = $this->randomPassword;

            $user->user_type    = 3;

            $user->save();

            $insertedId         = $user->id;

            $parish->user_id    = $insertedId;

            $parish->created_by = $request->input('user_id');

            $parish->save();


            $wem = User::find($request->input('user_id'));
            // start stripe payment charge 

            $key  = \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $charge = \Stripe\Charge::create(array(
                  "amount" => 100, //$1 for this time
                  "currency" => "usd",
                  "customer" => $wem->stripe_id,
                ));
            if($charge->id) {
                $wem_payment = new WemPayment();
                $wem_payment->wem_id = $request->input('user_id');
                $wem_payment->parish_user_id = $user->id;
                $wem_payment->name ='parish creation';
                $wem_payment->stripe_id = $charge->id;
                $wem_payment->card_brand = $wem['card_brand'];
                $wem_payment->card_last_four = $wem['card_last_four'];
                $wem_payment->save();
            }

            $response = [
            'status'        => true,
            'password'      => $this->randomPassword,
            'message'       => "Parish created successfully."
            ];
            $responseCode = 201;
           
        } catch (HttpBadRequestException $httpBadRequestException) {
                $response = [
                    'status'    => false,
                    'error'     => $httpBadRequestException->getMessage()
                ];
                $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($provience);
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Update Parish with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateParish(Request $request, $user_id, $created_by, $parish_id) {

        try {
            DB::beginTransaction();

            $parish = Parish::find($parish_id);

            $user   = User::find($user_id);

            /*
             * Validate mandatory fields
             */
            if ($request->has('parish_name'))

                $parish->name = $request->input('parish_name');
            else
                throw new HttpBadRequestException("Parish name is required.");

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");
            
            if ($request->has('start_date'))

                $parish->start_date = $request->input('start_date');
            else
                throw new HttpBadRequestException("Start Date is required.");
            
            $user->save();

            if ($request->has('area_id'))

                $parish->area_id = $request->input('area_id');

            $parish->save();

            $response = [
            'status'    => true,
            'message'   => "Parish updated successfully."
            ];
            $responseCode = 200;
           
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($provience);
        }
        
        return response()->json($response, $responseCode);
    }

    /**
     * Delete an existing Parish
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteParish($parish_id) {

        try {
            DB::beginTransaction();

            $parish = Parish::findOrFail($parish_id)->delete();

            if($parish)
            {

            $response = [
                'status'    => true,
                'message'   => "Parish deleted successfully."
                ];
                $responseCode = 200;
            }
            else
            {

               $response = [
                'status'    => true,
                'message'   => "No province has been found."
                ];
                $responseCode = 404;  
            }
           
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($area);
        }

        return response()->json($response, $responseCode);
    }

    /**
    * Filter Parish using Province id , Zone id , Area Id
    *
    * @param $province_id ,$zone_id, $area_id
    * @return \Illuminate\Http\JsonResponse
    */
    
    public function filteParish(Request $request) {

        try {

            DB::beginTransaction();
           
            if($request->has('province_id') || $request->has('zone_id') || $request->has('area_id') || $request->has('compliance')){

                $province_id    =   $request->input('province_id');
                $zone_id        =   $request->input('zone_id');
                $area_id        =   $request->input('area_id');

                if($request->has('area_id') && $request->input('area_id')!=0) {
                    $parishes_area = Area::find($area_id)->parishes;

                    if($request->has('compliance')) {
                        $parishArray = [];
                        $parishList  = $parishes_area;


                           foreach ( $parishList as $parish) {
                               $allreports= Report::where('parish_id', $parish->id)
                                   ->where('report_month', date('m'))
                                   ->whereNull('deleted_at')
                                   ->get();
                               $reports =  Report::where('parish_id', $parish->id)
                                   ->where('compliance',1)
                                   ->where('report_month', date('m'))
                                   ->whereNull('deleted_at')
                                   ->get();
                               if($request->input('compliance')==1) {
                                   if(count($reports)==count($allreports) && (count($reports)>0)) {
                                       $parishArray[] = $parish;
                                   }
                               }
                               else {
                                   if(count($reports)<count($allreports) || count($allreports)==0 || count($reports)==0) {
                                       $parishArray[]= $parish;
                                   }
                               }

                           }
                           $parishes    = $parishArray;

                    } else {
                        $parishes = $parishes_area;
                    }
                } else {

                   if($request->has('zone_id') && $request->input('zone_id')!=0) {

                        $parishes_zones = Zone::find($zone_id)->parishes;
                        if($request->has('compliance')) {
                        $parishArray = [];
                        $parishList  = $parishes_zones;


                           foreach ( $parishList as $parish) {
                               $allreports= Report::where('parish_id', $parish->id)
                                   ->where('report_month', date('m'))
                                   ->whereNull('deleted_at')
                                   ->get();
                               $reports =  Report::where('parish_id', $parish->id)
                                   ->where('compliance',1)
                                   ->where('report_month', date('m'))
                                   ->whereNull('deleted_at')
                                   ->get();
                               if($request->input('compliance')==1) {
                                   if(count($reports)==count($allreports) && (count($reports)>0)) {
                                       $parishArray[] = $parish;
                                   }
                               }
                               else {
                                   if(count($reports)<count($allreports) || count($allreports)==0 || count($reports)==0) {
                                       $parishArray[]= $parish;
                                   }
                               }

                           }
                           $parishes    = $parishArray;

                    } else {
                        $parishes = $parishes_zones;
                    }
                    } else {

                       if($request->has('province_id') && $request->input('province_id')!=0) {
                           $areas = Provience::find($province_id)->areas;
                           $area_array = [];
                           foreach ($areas as $area) {
                               array_push($area_array, $area->id);
                           }
                           $parishes = Parish::whereIn('area_id', $area_array)->get();

                       } else {
                           /** Get compliant or non compliant parish */
                           $parishArray = [];

                           $userDetails        = User::find($request->input('user_id'));

                           if($userDetails->user_type!=0) {
                                $parishList  = Parish::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get();
                           } else {
                                $parishList  = Parish::whereNull('deleted_at')->get();
                           }
                           
                           foreach ( $parishList as $parish) {
                               $allreports= Report::where('parish_id', $parish->id)
                                                   ->where('report_month', date('m'))
                                                   ->whereNull('deleted_at')
                                                   ->get();
                                $reports =  Report::where('parish_id', $parish->id)
                                                  ->where('compliance',1)
                                                  ->where('report_month', date('m'))
                                                  ->whereNull('deleted_at')
                                                  ->get();
                                if($request->input('compliance')==1) {
                                    if(count($reports)==count($allreports) && (count($reports)>0)) {
                                        $parishArray[] = $parish;
                                    }
                                }
                               else {
                                       if(count($reports)<count($allreports) || count($allreports)==0 || count($reports)==0) {
                                           $parishArray[]= $parish;
                                       }
                               }

                           }
                           $parishes    = $parishArray;

                       }
                    }
                }
             
            } else {
                if($request->has('user_id')) {

                    $userDetails = User::find($request->input('user_id'));

                    if($userDetails->user_type == 1) {
                        $parishes=Parish::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get();
                        if(count($parishes) >0) {
                           $due_date       = Parish::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get()->first()->due_date;  
                        }

                    } else if ($userDetails->user_type == 0) {
                        
                        $parishes       = Parish::whereNull('deleted_at')->get();
                        if(count($parishes) >0) {
                           $due_date       = Parish::whereNull('deleted_at')->get()->first()->due_date;
                        }
                    } else {
                        if($userDetails->pastor_type == 1) {
                             $province = Provience::where('user_id',$request->input('user_id'))->first();
                             $zones    = Zone::where('provience_id',$province->id)->whereNull('deleted_at')->get();
                            if($zones){
                                $zoneArray = array();
                                foreach($zones as $zone) {
                                    array_push($zoneArray, $zone->id);
                                }
                                if($zoneArray) {
                                    $areaArray = array();
                                    $areas=Area::whereIn('zone_id',$zoneArray)->whereNull('deleted_at')->get();
                                    if($areas) {
                                        foreach($areas as $area) {
                                        array_push($areaArray, $area->id);
                                        }
                                        if($areaArray) {
                                           $parishes=Parish::whereIn('area_id',$areaArray)->whereNull('deleted_at')->get();
                                        } else {
                                           $parishes= []; 
                                        } 
                                    } else {
                                        $parishes= []; 
                                    }
                                   
                                } else {
                                   $parishes= []; 
                                }
                            }  
                        } elseif($userDetails->pastor_type == 2) {
                            $zone  = Zone::where('user_id',$request->input('user_id'))->first();
                            $areas = Area::where('zone_id',$zone->id)->whereNull('deleted_at')->get();
                            if($areas) {
                                $areaArray = array();
                                foreach($areas as $area) {
                                array_push($areaArray, $area->id);
                                }
                                if($areaArray) {
                                   $parishes=Parish::whereIn('area_id',$areaArray)->whereNull('deleted_at')->get();
                                } else {
                                   $parishes= []; 
                                }
                            }
                        }else{
                            $area  = Area::where('user_id',$request->input('user_id'))->first();
                            $parishes=Parish::where('area_id',$area->id)->whereNull('deleted_at')->get();
                        }
                   }
                   
                } else {
                    throw new HttpBadRequestException("Please Provide user id.");
                }
            }
            
            if(count($parishes) >0 ){
                $parishArray    = [];

                $noOfParishes   = count($parishes);
                foreach ($parishes as $key=>$parish) {

                    $due_date                                   = $parish->due_date;
                    
                    $parishArray[$key]['id']                    = $parish->id;
                    $parishArray[$key]['user_id']               = $parish->users->id;
                    $parishArray[$key]['parish_id']             = $parish->users->parish_id;
                    $parishArray[$key]['parish_name']           = $parish->name;
                    $parishArray[$key]['province_name']         = $parish->areas->zones->proviences->name;
                    $parishArray[$key]['province_id']           = $parish->areas->zones->proviences->id;
                    $parishArray[$key]['zone_name']             = $parish->areas->zones->name;
                    $parishArray[$key]['zone_id']               = $parish->areas->zones->id;
                    $parishArray[$key]['area_name']             = $parish->areas->name;
                    $parishArray[$key]['area_id']               = $parish->areas->id;
                    $parishArray[$key]['pastor_name_area']      = $parish->areas->users->first_name;
                    $parishArray[$key]['pastor_name_zone']      = $parish->areas->zones->users->first_name;
                    $parishArray[$key]['pastor_name_province']  = $parish->areas->zones->proviences->users->first_name;
                    $parishArray[$key]['password']              = $parish->users->uniqueKey;
                    $parishArray[$key]['first_name']            = $parish->users->first_name;
                    $parishArray[$key]['last_name']             = $parish->users->last_name;
                    $parishArray[$key]['payment_status']        = $parish->payment_status;
                    $parishArray[$key]['penalty']               = $parish->penalty;
                    $parishArray[$key]['penalty_percent']       = $parish->penalty_percent;
                }
                $response = [
                'status'        => true,
                'message'       => $noOfParishes . ($noOfParishes > 1 ? " parishes have " : " parish has ") . "been found.",
                'parishes'      => $parishArray,
                'due_date'      => $due_date
                ];
                $responseCode = 200;
            }
            else
            {
                $response = [
                    'status' => true,
                    'noData' => "No parish has been found.",
                ];
                $responseCode = 200;  
            }
           
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {

            DB::commit();
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Get Parish poster Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getParishDetail(Request $request, $parish_id) {

        try {

            DB::beginTransaction();

            $parish = Parish::find($parish_id);
            $noOfParish = count($parish);
            
            if($parish){
                $parishArray = [];
                
                $parishArray['id']                      = $parish->id;
                $parishArray['user_id']                 = $parish->users->id;
                $parishArray['parish_id']               = $parish->users->parish_id;
                $parishArray['parish_name']             = $parish->name;
                $parishArray['province_name']           = $parish->areas->zones->proviences->name;
                $parishArray['province_id']             = $parish->areas->zones->proviences->id;
                $parishArray['zone_name']               = $parish->areas->zones->name;
                $parishArray['zone_id']                 = $parish->areas->zones->id;
                $parishArray['area_name']               = $parish->areas->name;
                $parishArray['area_id']                 = $parish->areas->id;
                $parishArray['pastor_name_area']        = $parish->areas->users->first_name;
                $parishArray['pastor_name_zone']        = $parish->areas->zones->users->first_name;
                $parishArray['pastor_name_province']    = $parish->areas->zones->proviences->users->first_name;
                $parishArray['password']                = $parish->users->uniqueKey;
                $parishArray['first_name']              = $parish->users->first_name;
                $parishArray['last_name']               = $parish->users->last_name;
                $parishArray['start_date']              = Date('m-d-Y',strtotime($parish->start_date));
                $parishArray['payment_status']          = $parish->payment_status;

                    $response = [
                        'status'    => true,
                        'message'   => $noOfParish . ($noOfParish > 1 ? " parishes have " : " parish has ") . "been found.",
                        'parish'    => $parishArray
                    ];
                    $responseCode = 200;
            } else {
                    $response = [
                        'status'    => false,
                        'error'     => "No parish detail has been found."
                    ];
                    $responseCode = 200;
                }
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Add due date for all parishes
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function addDueDate(Request $request, $user_id) {

        try {

            DB::beginTransaction();

            $parishes = Parish::where('created_by',$user_id)->whereNull('deleted_at')->get();
            $noOfParish = count($parishes);

            if($parishes){
                $parishArray = [];

                foreach ($parishes as  $parish) {

                    $parish->due_date = $request->input('due_date');
                    $parish->save();
                }
                $response = [
                    'status'    => true,
                    'message'   => 'Due date for the current month added successfully.'
                ];
                $responseCode = 200;
            } else {
                $response = [
                    'status'    => false,
                    'error'     => "Due date not added."
                ];
                $responseCode = 200;
            }
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Update payment status for all parishes
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePaymentStatus() {

        try {

            DB::beginTransaction();

            $parishes = Parish::whereNull('deleted_at')->get();
            $noOfParish = count($parishes);

            if($parishes){

                foreach ($parishes as  $parish) {

                    $due_date = $parish->due_date;
                    $month    = date('m');
                    $year     = date('Y');
                    $payment  = Payment::whereNull('deleted_at')
                                        ->where('created_by' , $parish->user_id)
                                        ->where('upload_month', $month)
                                        ->where('upload_year', $year)
                                        ->get();

                    if(count($payment)>0) {

                        $parish->payment_status = 1;

                    } else {

                        $date = date("Y-m-d");
                        if(($due_date!=null) && ($date>$due_date)) {

                            $parish->payment_status = 2;
                        }
                        else {
                            $parish->payment_status = 0;
                        }
                    }
                    $parish->save();
                }
                $response = [
                    'status'    => true,
                    'message'   => 'Payment status updated successfully.'
                ];
                $responseCode = 200;
            } else {
                $response = [
                    'status'    => false,
                    'error'     => "Payment status not updated."
                ];
                $responseCode = 200;
            }
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }
        $response = [
                    'status'    => true,
                    'message'   => 'Payment status updated successfully.'
                ];
        return response()->json($response, $responseCode);
    }

    /**
     * Update penalty status for the parish
     * @param Request $request,,$user_id
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateParishPenalty(Request $request, $user_id) {

        try {
            DB::beginTransaction();

            $parish_id = $request->input('id');
            $parish = Parish::find($parish_id);

            if (count($parish)>0) {

                if($parish->penalty==1) {
                    $parish->penalty = 0;
                    $parish->penalty_percent = 0.00;
                } else {
                    $parish->penalty = 1;
                }
            }

            $parish->save();

            $response = [
                'status'    => true,
                'message'   => "Parish penalty updated successfully."
            ];
            $responseCode = 200;

        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($parish);
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Get penalty for the parish
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPenalty($user_id) {

        try {

            DB::beginTransaction();

            $parish = Parish::whereNull('deleted_at')
                            ->where('user_id',$user_id)
                            ->get();

            if(count($parish)>0) {

                $parish   = $parish->first();
                $due_date = $parish->due_date;
                

                $date = strtotime( $due_date."+7 days");
                $overdue_date= date('Y-m-d', $date);
                $present_date = date('Y-m-d');
                $month = date('m');
                if($parish->penalty==1) {

                    if($present_date>$overdue_date ) {

                        $payment =  Payment::whereNull('deleted_at')
                                        ->where('created_by' , $parish->user_id)
                                        ->where('upload_month', $month)
                                        ->get();
                        if(count($payment)>0) {
                            $pay_date = strtotime($payment->first()->created_at);
                            $payment_date = date('Y-m-d',$pay_date);

                            if($payment_date>$overdue_date) {
                                $penalty_percent = $parish->penalty_percent;
                            } else {
                                $penalty_percent = 0.00;
                            }
                        } else {
                            $penalty_percent = 0.00;
                        }
                        
                    } else {
                        $penalty_percent = 0.00;
                    }
                } else {
                    $penalty_percent = 0.00;
                    $payment_date    = 'None';
                }

                $response = [
                    'status'    => true,
                    'message'   => 'Penalty fetched successfully.',
                    'penalty_percent' => $penalty_percent,
                    'paydate' => $payment_date
                   ];
                $responseCode = 200;
                
            } else {
                $response = [
                    'status'    => false,
                    'error'     => "Parish not found."
                ];
                $responseCode = 200;
            }
            
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }

        return response()->json($response, $responseCode);
    }



    /**
     * Update penalty % for the parish
     * @param Request $request,,$user_id
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePenaltyPercentage(Request $request, $user_id) {

        try {
            DB::beginTransaction();

            $parish_id = $request->input('id');
            $parish = Parish::find($parish_id);

            if (count($parish)>0) {
                $parish->penalty_percent = $request->input('penalty_percent');
                $parish->save();

                $response = [
                'status'    => true,
                'message'   => "Parish penalty percentage updated successfully."
                ];
                $responseCode = 200;

            } else {
                $response = [
                'status'    => false,
                'message'   => "Parish not found."
                ];
            }

            
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($parish);
        }

        return response()->json($response, $responseCode);
    }


    /**
     * get Dashboard Data
     *
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDashboard($userId)
    {
        try {
            DB::beginTransaction();

            $user = User::find($userId);
            if (count($user)>0) {

                if($user->user_type==0) {
                    $parishList = Parish::whereNull('deleted_at')->get();
                } else {
                    $parishList = Parish::where('created_by',$userId)->whereNull('deleted_at')->get();
                }

                $totalParishes = count($parishList);

                $month = date('m');


                $compliance = 1;
                $parishCompliance = [];
                $parishNonCompliance = [];
                foreach ( $parishList as $parish) {
                    $allreports= Report::where('parish_id', $parish->id)
                                        ->where('report_month', $month)
                                        ->whereNull('deleted_at')
                                        ->get();
                    $reports =  Report::where('parish_id', $parish->id)
                                        ->where('compliance',$compliance)
                                        ->where('report_month', $month)
                                        ->whereNull('deleted_at')
                                        ->get();
                    if($compliance==1) {
                        if(count($reports)==count($allreports) && (count($reports)>0)) {
                            $parishCompliance[] = $parish;
                        }
                        else {
                           $parishNonCompliance[]= $parish;

                        }
                    } else {
                        if(count($reports)<count($allreports) || count($allreports)==0 || count($reports)==0) {
                            $parishNonCompliance[]= $parish;
                        }
                    }

                }

                $noOfParishes   = count($parishCompliance);
                $complianceList= $noOfParishes;
                    
                $noOfParishes   = count($parishNonCompliance);
                $nonComplianceList= $noOfParishes;
                    
         
                $response = [
                    'status'        => true,
                    'message'       => " parish has been found.",
                    'totalParishes' => $totalParishes,
                    'parishesCompliance'      => $complianceList,
                    'parishesNonCompliance'   => $nonComplianceList,
                    'month'         => $month
                ];
                $responseCode = 200;


            } else {
                $response = [
                    'status'    => false,
                    'error'       => 'User cannot view parishes list'
                ];
                $responseCode = 400;   
            }

            
           
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'    => false,
                'error'     => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
        }


        return response()->json($response, $responseCode);
    }

    /**
     * get Parish Data
     *
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getParish($user_id) {

        try {

            DB::beginTransaction();

            $get_parish = Parish::where('user_id',$user_id)->get();
            $noOfParish = count($get_parish);
            
            if(count($get_parish)>0){
                $parish = $get_parish->first();
                $parishArray = [];
                
                $parishArray['id']                      = $parish->id;
                $parishArray['user_id']                 = $parish->users->id;
            
                $parishArray['password']                = $parish->users->uniqueKey;
                $parishArray['first_name']              = $parish->users->first_name;
                $parishArray['last_name']               = $parish->users->last_name;
                $parishArray['start_date']              = date('m-d-Y',strtotime($parish->start_date));
                $parishArray['due_date']                = date('m-d-Y',strtotime($parish->due_date));
                $parishArray['penalty']                 = date('m-d-Y',strtotime($parish->penalty));
                $parishArray['payment_status']          = $parish->payment_status;

                    $response = [
                        'status'    => true,
                        'message'   => "Parish has been found.",
                        'parish'    => $parishArray
                    ];
                    $responseCode = 200;
            } else {
                    $response = [
                        'status'    => false,
                        'error'     => "No parish detail has been found."
                    ];
                    $responseCode = 200;
                }
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();
        }

        return response()->json($response, $responseCode);
    }

}