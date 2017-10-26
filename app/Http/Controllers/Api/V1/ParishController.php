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
use App\Models\Zone;
use App\Models\Area;
use App\Models\User;
use App\Models\Parish;
use App\Models\Payment;
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

    public function createParish(Request $request) {
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
            
            $user->first_name   = $request->input('first_name');

            $user->last_name    = $request->input('last_name');
            
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
            /*$paymentdel = Payment::findOrFail(48)->delete();
            dd($paymentdel);*/
            $parishInfo = Parish::find($parish_id);
            $paymentdel = Payment::where('created_by',$parishInfo->user_id)->delete();
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
           
            if($request->has('province_id') || $request->has('zone_id') || $request->has('area_id')){

                $province_id    =   $request->input('province_id');
                $zone_id        =   $request->input('zone_id');
                $area_id        =   $request->input('area_id');

                if($request->has('area_id')) {
                    $parishes = Area::find($area_id)->parishes;
                } else {

                   if($request->has('zone_id')) {

                        $parishes = Zone::find($zone_id)->parishes;
                    } else {

                        $areas = Provience::find($province_id)->areas;
                        $area_array =[];
                        foreach ($areas as  $area) {
                            array_push($area_array,$area->id);
                        }

                        $parishes = Parish::whereIn('area_id',$area_array)->get();
                    }
                }
             
            } else {
                if($request->has('user_id')) {
                   $userDetails = user::find($request->input('user_id'));
                   if($userDetails->user_type == 1) {
                     $parishes=Parish::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get();
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
            
            if(count($parishes) >0 )
            {
                $parishArray    = [];
                $noOfParishes   = count($parishes);

                foreach ($parishes as $key=>$parish) {
                    
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
                }
                
                $response = [
                'status'        => true,
                'message'       => $noOfParishes . ($noOfParishes > 1 ? " parishes have " : " parish has ") . "been found.",
                'parishes'      => $parishArray
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
}