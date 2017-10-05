<?php
/**
* AreaController to manage CRUD operation of area.
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

class AreaController extends Controller {

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
    * @var null|string
    */
    public $user_type;

    /**
     * Define Constructor
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function __construct(){

        $user = JWTAuth::parseToken()->toUser();

        $this->user_type    = $user->user_type;
        $this->pastor_type  = $user->pastor_type;
    }

    /**
     * Get Area list with respect to created_by
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllArea(Request $request,$created_by) {

        try {

            DB::beginTransaction();

            $areas= ($this->user_type == 1) ? Area::where('created_by',$created_by)
                                ->whereNull('deleted_at')->get() : Area::find($created_by)->zones->proviences->areas;

            $noOfAreas =count($areas);

            if($noOfAreas) {

                $areaArray = [];

                foreach ($areas as $key => $area) {

                    $areaArray[$key]['id']              = $area->id;
                    $areaArray[$key]['area_name']       = $area->name;
                    $areaArray[$key]['zone_id']         = $area->zone_id;
                    $areaArray[$key]['province_name']   = $area->zones->proviences->name;
                    $areaArray[$key]['province_id']     = $area->zones->proviences->id;
                    $areaArray[$key]['zone_name']       = $area->zones->name;
                    $areaArray[$key]['user_id']         = $area->users->id;
                    $areaArray[$key]['parish_id']       = $area->users->parish_id;
                    $areaArray[$key]['password']        = $area->users->uniqueKey;
                    $areaArray[$key]['first_name']      = $area->users->first_name;
                    $areaArray[$key]['last_name']       = $area->users->last_name;
                }

                $response = [
                    'status'        => true,
                    'message'       => $noOfAreas . ($noOfAreas > 1 ? " areas have " : " area has ") . "been found.",
                    'areas'         => $areaArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status' => true,
                    'noData' => "No area has been found."
                ];
                $responseCode = 200;
            }

        }
        catch (Exception $exception) {

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
     * Get Area list with respect to province and zone
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAreaList(Request $request,$created_by,$zone_id) {

        try {

            DB::beginTransaction();

            $areas=Area::where('created_by',$created_by)
                        ->where('zone_id',$zone_id)
                        ->whereNull('deleted_at')->get();

            $noOfAreas =count($areas);

            if($noOfAreas){

                $areaArray = [];
                foreach ($areas as $key => $area) {

                    $areaArray[$key]['id']              = $area->id;
                    $areaArray[$key]['area_name']       = $area->name;
                    $areaArray[$key]['zone_id']         = $area->zone_id;
                    $areaArray[$key]['province_name']   = $area->zones->proviences->name;
                    $areaArray[$key]['province_id']     = $area->zones->proviences->id;
                    $areaArray[$key]['zone_name']       = $area->zones->name;
                    $areaArray[$key]['user_id']         = $area->users->id;
                    $areaArray[$key]['parish_id']       = $area->users->parish_id;
                    $areaArray[$key]['password']        = $area->users->uniqueKey;
                    $areaArray[$key]['first_name']      = $area->users->first_name;
                    $areaArray[$key]['last_name']       = $area->users->last_name;
                }

                $response = [
                    'status'        => true,
                    'message'       => $noOfAreas . ($noOfAreas > 1 ? " areas have " : " area has ") . "been found.",
                    'areas'         => $areaArray
                ];
                $responseCode = 200;

            } else {

                $response = [
                    'status'        => false,
                    'message'       => "No Area has been found."
                ];
                $responseCode = 200;
            }

        }
        catch (Exception $exception) {

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
     * Get zone detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAreaDetail(Request $request, $area_id) {

        try {

            DB::beginTransaction();

            $area=Area::find($area_id);

            $noOfArea =count($area);

            if($noOfArea){

                $areaArray = [];

                $areaArray['id']            = $area->id;
                $areaArray['area_name']     = $area->name;
                $areaArray['zone_id']       = $area->zone_id;
                $areaArray['province_id']   = $area->zones->proviences->id;
                $areaArray['province_name'] = $area->zones->proviences->name;
                $areaArray['zone_name']     = $area->zones->name;
                $areaArray['user_id']       = $area->users->id;
                $areaArray['parish_id']     = $area->users->parish_id;
                $areaArray['password']      = $area->users->uniqueKey;
                $areaArray['first_name']    = $area->users->first_name;
                $areaArray['last_name']     = $area->users->last_name;

                $response = [
                    'status'        => true,
                    'message'       => $noOfArea . ($noOfArea > 1 ? " areas have " : " area has ") . "been found.",
                    'areas'         => $areaArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'        => false,
                    'message'       => "No area detail has been found."
                ];
                $responseCode = 200;
            }

        }
        catch (Exception $exception) {

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
     * Create a new Area with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createArea(Request $request) {
        
        try {

            DB::beginTransaction();

            $area = new Area();

            $user = new User();

            /*
             * Validate mandatory fields
             */

            if ($request->has('province_id'))

             $request->input('province_id');

            else
                throw new HttpBadRequestException("Please select province.");

            if ($request->has('zone_id'))

                $area->zone_id = $request->input('zone_id');
            else
                throw new HttpBadRequestException("Please select zone.");

            if ($request->has('area_name'))

                $area->name = $request->input('area_name');
            else
                throw new HttpBadRequestException("Area name is required.");

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            /**
             * Check WEM already create poster in this area
             */

            $checkArea = Area::where('created_by', $request->input('user_id'))
                                ->where('zone_id',$request->input('zone_id'))
                                ->where('name',$request->input('area_name'))
                                ->whereNull('deleted_at')->first();

            if(count($checkArea)) {

                $response = [
                    'status'    => false,
                    'error'     => "You have already created a Area Pastor for this area."
                ];
                $responseCode = 422;

                return response()->json($response, $responseCode);
            }


            $length = 8;

            $this->randomUsername = Helpers::generateNumber();

            $this->randomPassword = Helpers::generateNumber();

            /**
             * Check unique user
             */
        
            $registerUser = User::where('parish_id', $this->randomUsername)->first();


            if(count($registerUser)) {

                return $this->createArea();
            } 

            $user->parish_id    = $this->randomUsername;

            $user->password     = $this->randomPassword;

            $user->uniqueKey    = $this->randomPassword;

            $user->user_type    = 2;

            $user->pastor_type  = 3;

            $user->save();

            $insertedId         = $user->id;

            $area->user_id      = $insertedId;

            $area->created_by   = $request->input('user_id');

            $area->save();

            $response = [
                'status'            => true,
                'password'          => $this->randomPassword,
                'message'           => "Area Pastor created successfully."
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

            unset($area);
        }

        return response()->json($response, $responseCode);
    }
    
    /**
     * Update Area with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateArea(Request $request, $user_id, $created_by, $area_id) {

        try {

            DB::beginTransaction();

            $area = Area::find($area_id);

            $user = User::find($user_id);

            /*
             * Validate mandatory fields
             */

            if ($request->has('province_id'))

             $request->input('province_id');
            else
                throw new HttpBadRequestException("Please select province.");

            if ($request->has('zone_id'))

                $area->zone_id = $request->input('zone_id');
            else
                throw new HttpBadRequestException("Please select zone.");

            if ($request->has('area_name'))

                $area->name = $request->input('area_name');
            else
                throw new HttpBadRequestException("Area name is required.");

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            /**
             * Check WEM already poster in this zone
             */

            $checkArea = Area::where('created_by',  $created_by)
                                ->where('name' , $request->input('area_name'))
                                ->where('id' , '!=' , $area_id)
                                ->whereNull('deleted_at')->first();

            if(count($checkArea)) {

                $response = [
                    'status'    => false,
                    'error'     => "You have already created a Area Pastor for this area and province.",
                ];
                $responseCode = 422;

                return response()->json($response, $responseCode);
            }

            $user->user_type    = 2;

            $user->pastor_type  = 3;

            $user->save();

            $area->save();

            $response = [
                'status'    => true,
                'message'   => "Area Pastor updated successfully."
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

            unset($area);
        }
        return response()->json($response, $responseCode);
    }

    /**
     * Delete an existing Area
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteArea(Request $request, $user_id, $area_id){

        try {

            DB::beginTransaction();

            $area = Area::findOrFail($area_id)->delete();

            if($area) {

                $payment = Payment::where('created_by',$user_id)->delete();

                $response = [
                        'status'    => true,
                        'message'   => "Area Pastor deleted successfully."
                    ];
                    $responseCode = 200;

            }  else {

               $response = [
                    'status'    => true,
                    'message'   => "No area has been found."
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

            unset($user);

            unset($area);
        }

        return response()->json($response, $responseCode);
    }
    
    /**
     * Filter Area by province and zone Id
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function filterArea(Request $request) {

        try {

            DB::beginTransaction();
           
               if($request->has('province_id') || $request->has('zone_id')){

                    $province_id    =  $request->input('province_id');
                    $zone_id        =   $request->input('zone_id');

                    if($request->has('zone_id')) {

                        $areas  = Zone::find($zone_id)->areas;
                    } else {

                       $areas   = Provience::find($province_id)->areas;
                    }
               
                } else {

                    if($request->has('user_id')) {

                        $userDetails = user::find($request->input('user_id'));
                        if($userDetails->user_type == 1) {
                           $areas=Area::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get();
                        } else {
                            if($userDetails->pastor_type == 1) {
                                $province = Provience::where('user_id',$request->input('user_id'))->first();
                                $zones=Zone::where('provience_id',$province->id)->whereNull('deleted_at')->get();
                                $zoneArray = array();
                                if($zones){
                                    foreach($zones as $zone) {
                                        array_push($zoneArray, $zone->id);
                                    }
                                    if($zoneArray) {
                                        $areas=Area::whereIn('zone_id',$zoneArray)->whereNull('deleted_at')->get();
                                    } else {
                                       $areas= []; 
                                    }
                                }  
                            } else {
                                $zone = Zone::where('user_id',$request->input('user_id'))->first();
                                $areas=Area::where('zone_id',$zone->id)->whereNull('deleted_at')->get();
                            }
                        }
                    } else {

                        throw new HttpBadRequestException("Please Provide user id.");
                    }
                }
                
                if(count($areas)>0)
                {
                    $areaArray = [];
                    $noOfAreas = count($areas);

                    foreach ($areas as $key => $area) {

                        $areaArray[$key]['id']                      = $area->id;
                        $areaArray[$key]['area_name']               = $area->name;
                        $areaArray[$key]['zone_id']                 = $area->zone_id;
                        $areaArray[$key]['zone_name']               = $area->zones->name;
                        $areaArray[$key]['province_name']           = $area->zones->proviences->name;
                        $areaArray[$key]['province_id']             = $area->zones->proviences->id;
                        $areaArray[$key]['pastor_name_zone']        = $area->zones->users->first_name;
                        $areaArray[$key]['pastor_name_province']    = $area->zones->proviences->users->first_name;
                        $areaArray[$key]['user_id']                 = $area->users->id;
                        $areaArray[$key]['parish_id']               = $area->users->parish_id;
                        $areaArray[$key]['password']                = $area->users->uniqueKey;
                        $areaArray[$key]['first_name']              = $area->users->first_name;
                        $areaArray[$key]['last_name']               = $area->users->last_name;
                    }
                    
                    $response = [
                        'status'    => true,
                        'message'   => $noOfAreas . ($noOfAreas > 1 ? " areas have " : " area has ") . "been found.",
                        'areas'     => $areaArray
                    ];
                    $responseCode = 200;
                }
                else
                {

                   $response = [
                        'status' => true,
                        'noData' => "No area has been found.",
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
}