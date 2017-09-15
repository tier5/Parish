<?php
/**
* ZoneController controller to manage zone crud function for zone province.
* @param Request $request
*/

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Provience;
use App\Models\Zone;
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

class ZoneController extends Controller {

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
     * Get Zone list with respect to created_by
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllZone(Request $request,$created_by) {

         try {
            DB::beginTransaction();

            $zones=Zone::where('created_by',$created_by)
                        ->whereNull('deleted_at')->get();

            $noOfZones =count($zones);
            if($noOfZones){

                $zoneArray = [];
                foreach ($zones as $key => $zone) {

                    $zoneArray[$key]['id']              = $zone->id;
                    $zoneArray[$key]['zone_name']       = $zone->name;
                    $zoneArray[$key]['province_id']     = $zone->provience_id;
                    $zoneArray[$key]['province_name']   = $zone->proviences->name;
                    $zoneArray[$key]['user_id']         = $zone->users->id;
                    $zoneArray[$key]['parish_id']       = $zone->users->parish_id;
                    $zoneArray[$key]['password']        = $zone->users->uniqueKey;
                    $zoneArray[$key]['first_name']      = $zone->users->first_name;
                    $zoneArray[$key]['last_name']       = $zone->users->last_name;
                }

                $response = [
                    'status'    => true,
                    'message'   => $noOfZones . ($noOfZones > 1 ? " zones have " : " zone has ") . "been found.",
                    'zones'     => $zoneArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status' => true,
                    'noData' => "No zone has been found."
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
     * Get Zone list with respect to province
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getZoneList(Request $request,$created_by,$province_id) {

         try {
            DB::beginTransaction();

            $zones=Zone::where('created_by',$created_by)
                                ->where('provience_id',$province_id)
                                ->whereNull('deleted_at')->get();

            $noOfZones =count($zones);
            if($noOfZones){

                $zoneArray = [];
                foreach ($zones as $key => $zone) {

                    $zoneArray[$key]['id']              = $zone->id;
                    $zoneArray[$key]['zone_name']       = $zone->name;
                    $zoneArray[$key]['province_id']     = $zone->provience_id;
                    $zoneArray[$key]['province_name']   = $zone->proviences->name;
                    $zoneArray[$key]['user_id']         = $zone->users->id;
                    $zoneArray[$key]['parish_id']       = $zone->users->parish_id;
                    $zoneArray[$key]['password']        = $zone->users->uniqueKey;
                    $zoneArray[$key]['first_name']      = $zone->users->first_name;
                    $zoneArray[$key]['last_name']       = $zone->users->last_name;
                }

                $response = [
                    'status'    => true,
                    'message'   => $noOfZones . ($noOfZones > 1 ? " zones have " : " zone has ") . "been found.",
                    'zones'     => $zoneArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'    => false,
                    'error'     => "No zone has been found."
                ];
                $responseCode = 202;
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
     * Get Zonal Pastor Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getZoneDetail(Request $request, $zone_id) {
       
         try {
            DB::beginTransaction();

            $zone=Zone::find($zone_id);

            $noOfZone =count($zone);

            if($noOfZone){

                $zoneArray = [];

                $zoneArray['id']            = $zone->id;
                $zoneArray['zone_name']     = $zone->name;
                $zoneArray['province_id']   = $zone->provience_id;
                $zoneArray['province_name'] = $zone->proviences->name;
                $zoneArray['user_id']       = $zone->users->id;
                $zoneArray['parish_id']     = $zone->users->parish_id;
                $zoneArray['password']      = $zone->users->uniqueKey;
                $zoneArray['first_name']    = $zone->users->first_name;
                $zoneArray['last_name']     = $zone->users->last_name;

                $response = [
                    'status'    => true,
                    'message'   => $noOfZone . ($noOfZone > 1 ? " zones have " : " zone has ") . "been found.",
                    'zones'     => $zoneArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'    => false,
                    'error'     => "No zone detail has been found."
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
     * Create a new Zone with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createZone(Request $request){
        
        try {
            DB::beginTransaction();

            $zone = new Zone();

            $user = new User();

            /*
             * Validate mandatory fields
             */

            if ($request->has('province_id'))

                $zone->provience_id = $request->input('province_id');
            else
                throw new HttpBadRequestException("Please select province.");

            if ($request->has('zone_name'))

                $zone->name = $request->input('zone_name');
            else
                throw new HttpBadRequestException("Zone name is required.");

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            /**
            * Check WEM already create poster in this zone
            */

            $checkZone = Zone::where('created_by', $request->input('user_id'))
                        ->where('provience_id',$request->input('province_id'))
                        ->where('name',$request->input('zone_name'))
                        ->whereNull('deleted_at')->first();

            if(count($checkZone)) {

                $response = [
                    'status'    => false,
                    'error'     => "You have already created a Zonal Pastor for this Zone."
                ];
                $responseCode = 422;

                return response()->json($response, $responseCode);
            }

            $this->randomUsername = Helpers::generateNumber();

            $this->randomPassword = Helpers::generateNumber();

            /**
             * Check unique user
             */
        
            $registerUser = User::where('parish_id', $this->randomUsername)->first();


            if(count($registerUser)) {

                return $this->createZone();
            }

            $user->parish_id    = $this->randomUsername;

            $user->password     = $this->randomPassword;

            $user->uniqueKey    = $this->randomPassword;

            $user->user_type    = 2;

            $user->pastor_type  = 2;

            $user->save();

            $insertedId         = $user->id;

            $zone->user_id      = $insertedId;

            $zone->created_by   = $request->input('user_id');

            $zone->save();

                $response = [
                    'status'    => true,
                    'password'  => $this->randomPassword,
                    'message'   => "Zonal Pastor created successfully."
                ];
            $responseCode = 201;
           
        } catch (HttpBadRequestException $httpBadRequestException) {
            $response = [
                'status'   => false,
                'error'    => $httpBadRequestException->getMessage()
            ];
            $responseCode = 400;
        } catch (ClientException $clientException) {
            DB::rollBack();

            $response = [
                'status'       => false,
                'error'        => "Internal server error.",
                'error_info'   => $clientException->getMessage()
            ];
            $responseCode = 500;
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error($exception->getMessage());

            $response = [
                'status'       => false,
                'error'        => "Internal server error.",
                'error_info'   => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($zone);
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Update Zone with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateZone(Request $request, $user_id, $created_by, $zone_id){

        try {
            DB::beginTransaction();

            $zone = Zone::find($zone_id);

            $user = User::find($user_id);

            /*
             * Validate mandatory fields
             */

            if ($request->has('province_id'))

                $zone->provience_id = $request->input('province_id');
            else
                throw new HttpBadRequestException("Please select province.");

            if ($request->has('zone_name'))

                $zone->name = $request->input('zone_name');
            else
                throw new HttpBadRequestException("Zone name is required.");

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

            $checkZone = Zone::where('created_by',  $created_by)
                            ->where('name' , $request->input('zone_name'))
                            ->where('id' , '!=' , $zone_id)
                            ->whereNull('deleted_at')->first();

            if(count($checkZone)) {

                $response = [
                    'status'    => false,
                    'error'     => "You have already created a Zonal Pastor for this Zone and Province.",
                ];
                $responseCode = 422;

                return response()->json($response, $responseCode);
            }

            $user->user_type    = 2;

            $user->pastor_type  = 2;

            $user->save();
            
            $zone->save();

            $response = [
                'status' => true,
                'message' => "Zonal Pastor updated successfully."
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
            unset($zone);
        }

        return response()->json($response, $responseCode);
    }
    /**
     * Delete an existing Zone
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */
   
    public function deleteZone(Request $request, $user_id, $zone_id)
    {
        try {
            DB::beginTransaction();

            $areas=Area::where('zone_id',$zone->id)->get();

            if($areas) {

                $areaArray =[];

                foreach($areas as $key=>$area) {

                    $paymentArea = Payment::where('created_by',$area->user_id)->delete();

                }

            }

            $zone = Zone::findOrFail($zone_id)->delete();

            if($zone) {

                $payment = Payment::where('created_by',$user_id)->delete();

                $response = [
                    'status'    => true,
                    'message'   => "Zone Pastor deleted successfully."
                ];
                $responseCode = 200;
            }
            else
            {
                $response = [
                    'status'    => true,
                    'error'     => "No zone has been found."
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
            unset($zone);
        }

        return response()->json($response, $responseCode);
    }

    /**
    * Filter Zone using Province id
    *
    * @param $province_id
    * @return \Illuminate\Http\JsonResponse
    */
    
    public function filterZone(Request $request)
    {
        try {

            DB::beginTransaction();
           
            if($request->has('province_id')){

                $province_id =  $request->input('province_id');
                
                $zones = Provience::find($province_id)->zones;
               
            } else {

                if($request->has('user_id')) {
                   
                    $zones=Zone::where('created_by',$request->input('user_id'))->whereNull('deleted_at')->get();

                } else {
                    throw new HttpBadRequestException("Please Provide user id.");
                }
            }
            
            if(count($zones)>0)
            {
                $zoneArray = [];
              
                foreach($zones as $key => $zone){

                    $zoneArray[$key]['id']              = $zone->id;
                    $zoneArray[$key]['zone_name']       = $zone->name;
                    $zoneArray[$key]['province_name']   = $zone->proviences->name;
                    $zoneArray[$key]['province_id']     = $zone->proviences->id;
                    $zoneArray[$key]['user_id']         = $zone->users->id;
                    $zoneArray[$key]['parish_id']       = $zone->users->parish_id;
                    $zoneArray[$key]['password']        = $zone->users->uniqueKey;
                    $zoneArray[$key]['first_name']      = $zone->users->first_name;
                    $zoneArray[$key]['last_name']       = $zone->users->last_name;
                } 
                
                $noOfZones = count($zoneArray);   

                $response = [
                    'status'    => true,
                    'message'   => $noOfZones . ($noOfZones > 1 ? " zones have " : " zone has ") . "been found.",
                    'zones'     => $zoneArray
                ];
                $responseCode = 200;
            }
            else
            {
                $response = [
                    'status' => true,
                    'noData' => "No zone has been found."
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