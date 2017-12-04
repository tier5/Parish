<?php
/**
* UserController controller to manage sign in , sign up, reset password and disable user
* @param Request $request
*/

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Provience;
use App\Models\Zone;
use App\Models\Area;
use App\Models\Parish;
use App\Models\Report;
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

class UserController extends Controller {

    /**
     * @var null|string
     */

    private $userId = null;

    /**
    * @var null|string
    */

    private $randomPassword = null; 

    /**
     * Get User Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function getDetail(Request $request, $userId) {

        try {
            DB::beginTransaction();

            $user=User::find($userId);

            $noOfUser =count($user);

            if($noOfUser){

                $userArray = [];

                $userArray['id']            = $user->id;
                $userArray['parish_id']     = $user->parish_id;
                $userArray['first_name']    = $user->first_name;
                $userArray['last_name']     = $user->last_name;
                $userArray['uniqueKey']     = $user->uniqueKey;

                $response = [
                    'status'        => true,
                    'message'       => 'get user detail',
                    'userDetail'    => $userArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'    => false,
                    'error'     => "No user has been found."
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
     * Update User Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateUserDetail(Request $request, $userId)
    {
        try {
            DB::beginTransaction();

            $user = User::find($userId);

            /**
             * Validate mandatory fields
             */

            if ($request->has('first_name'))

                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))

                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            $user->save();

            $response = [
                'status'    => true,
                'message'   => "User updated successfully."
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
        }

        return response()->json($response, $responseCode);
    }
    /**
     * Reset Password poster Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function resetPassword(Request $request, $userId) {

        try {
            
            DB::beginTransaction();

            $user=User::findOrFail($userId);

            $this->randomPassword   = Helpers::generateNumber();

            $user->password         =  $this->randomPassword;
            $user->uniqueKey        =  $this->randomPassword;
            $user->save();

            $response = [
                'status'    => true,
                'password'  => $this->randomPassword,
                'message'   => "Password reset successfully."
                        ];
            $responseCode = 200;
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
     * Reset username poster Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function resetUsername(Request $request, $userId) {

        try {
            
            DB::beginTransaction();

            $user=User::findOrFail($userId);
            if ($request->has('username')) {
              $userCount = User::where('parish_id',$request->input('username'))
                                ->where('id','!=',$userId)
                                ->count(); 
              if($userCount == 0) {
                $user->parish_id = $request->input('username');
                $user->save();

                $response = [
                    'status'    => true,
                    'usename'  => $request->input('username'),
                    'message'   => "Username updated successfully."
                            ];
                $responseCode = 200;   
              } else {

                $response = [
                    'status'    => false,
                    'error'   => "Username not avilable"
                            ];
                $responseCode = 200;
              }                 
            } else {
              throw new HttpBadRequestException("Username is required.");  
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
     * List of WEM for SuperAdmin
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getWemList(Request $request, $userId) {

        try {
            
            DB::beginTransaction();

            $user=User::findOrFail($userId);
            if ($user->user_type == 0) {
              $getWEM = User::where('user_type',1)->get(); 
              if(count($getWEM) >0) {
                $wemArray = [];

                foreach ($getWEM as $key => $user) {

                    $wemArray[$key]['id']           = $user->id;
                    $wemArray[$key]['first_name']   = $user->first_name;
                    $wemArray[$key]['last_name']    = $user->last_name;
                    $wemArray[$key]['email']        = $user->email;
                    $wemArray[$key]['status']       = $user->user_status;
                    $wemArray[$key]['percentage']   = $user->percentage;
                }
                    $response = [
                        'status'    => true,
                        'wem'       => $wemArray
                    ];
                    $responseCode = 200;
              } else {

                $response = [
                    'status'    => false,
                    'error'   => "No data found"
                            ];
                $responseCode = 200;
              }                 
            } else {
              throw new HttpBadRequestException("User is not a Superadmin.");  
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
     * Change status of WEM
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function changeWemStatus(Request $request, $userId) {
        try {
            
            DB::beginTransaction();

            $user=User::findOrFail($userId);
            if ($user->user_type == 0) {
              $wem = User::findOrFail($request->input('id'));
              if($wem->user_status == 1) {
                $wem->user_status = 0;
              } else {
                $wem->user_status = 1;
              }
              
              $save = $wem->save();
            if($save) {
                $response = [
                    'status'    => true,
                    'message'       => 'Wem status changed successfully'
                ];
                $responseCode = 200;   
            } else {
                $response = [
                    'status'    => false,
                    'error'       => 'Wem status changed failed'
                ];
                $responseCode = 400;   
            }
                            
            } else {
              throw new HttpBadRequestException("User is not a Superadmin.");  
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
     * Update WEM Percentage
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateWemPercentage(Request $request, $userId)
    {
        try {
            DB::beginTransaction();

            $user = User::find($userId);
            if ($user->user_type == 0) {
                $wem = User::find($request->input('id'));

                if ($request->has('percentage'))

                $wem->percentage = $request->input('percentage');
                else

                throw new HttpBadRequestException("Percentage is required.");

                $wem->save();
                $response = [
                    'status'    => true,
                    'message'       => 'Wem updated successfully'
                ];
                $responseCode = 200;   
                $responseCode = 200;   

            } else {
                $response = [
                    'status'    => false,
                    'error'       => 'User is not a Super Admin'
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
     * Get count of province , zone area pastor, wem and parish depends on user logged in
     * userId id of logged in user
     * user type => 1 : WEM , user type => 2 : pastor, user type => 3 : parish , user type => 0 : Super admin
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function getUserCount(Request $request, $userId) {

        try {
            DB::beginTransaction();

            $user=User::find($userId);

            $user_type = '';

            if($user->user_type == 0 ) {

                $user_type      = 'Super-admin';

                $countOfwem     = User::where('user_type',1)
                                   ->whereNull('deleted_at')
                                   ->count();

                $countOfExemption = User::where('user_type',1)
                                   ->where('user_status',1)
                                   ->whereNull('deleted_at')
                                   ->count();

                $countOfHold    = User::where('user_type',1)
                                   ->where('user_status',0)
                                   ->whereNull('deleted_at')
                                   ->count();
                
                $countOfParish  = User::where('user_type',3)
                                   ->whereNull('deleted_at')
                                   ->count();
                
                $countOfProvincePaster = User::where('user_type',2)
                                        ->where('pastor_type',1)
                                        ->whereNull('deleted_at')
                                        ->count();
                
                $countOfZonePaster = User::where('user_type',2)
                                   ->where('pastor_type',2)
                                   ->whereNull('deleted_at')
                                   ->count();
                
                $countOfAreaPaster = User::where('user_type',2)
                                   ->where('pastor_type',3)
                                   ->whereNull('deleted_at')
                                   ->count();

                $count['wem']       = $countOfwem;
                $count['parish']    = $countOfParish;
                $count['province']  = $countOfProvincePaster;
                $count['zone']      = $countOfZonePaster;
                $count['area']      = $countOfAreaPaster;
                $count['wem_on_hold']           = $countOfHold;
                $count['wem_on_exemption']      = $countOfExemption;

                $response = [
                    'status'        => true,
                    'message'       => 'Dashbard user count Information',
                    'user_type'     => $user_type,
                    'userCount'     => $count
                ];
                $responseCode = 200;

            } else if($user->user_type == 1 ) {

                $user_type      = 'WEM';

                $countOfParish  =   Parish::where('created_by',$userId)
                                       ->whereNull('deleted_at')
                                       ->count();
                
                $countOfProvincePaster = Provience::where('created_by',$userId)
                                               ->whereNull('deleted_at')
                                               ->count();
                
                $countOfZonePaster      = Zone::where('created_by',$userId)
                                           ->whereNull('deleted_at')
                                           ->count();
                
                $countOfAreaPaster      = Area::where('created_by',$userId)
                                           ->whereNull('deleted_at')
                                           ->count();

                $count['parish']    = $countOfParish;
                $count['province']  = $countOfProvincePaster;
                $count['zone']      = $countOfZonePaster;
                $count['area']      = $countOfAreaPaster;

                $response = [
                    'status'        => true,
                    'message'       => 'Dashbard user count Information',
                    'user_type'     => $user_type,
                    'userCount'     => $count
                ];
                $responseCode = 200;

            } else if ($user->user_type == 2 ) {

                if($user->pastor_type == 1 ) {

                    /** province */

                    $user_type      = 'Province';

                    $prov = Provience::where('user_id',$userId)->first();
                    
                    $countOfZonePaster      = Zone::where('provience_id',$prov->id)
                                                   ->whereNull('deleted_at')
                                                   ->count();
                    $areaInfo               = Provience::find($prov->id)->areas;
                    $countOfAreaPaster      = count($areaInfo);
                    $area_array = [];
                    
                    foreach ($areaInfo as $area) {
                       array_push($area_array, $area->id);
                    }

                    $countOfParish = Parish::whereIn('area_id', $area_array)->count();


                    $count['parish']    = $countOfParish;
                    $count['zone']      = $countOfZonePaster;
                    $count['area']      = $countOfAreaPaster;

                } else if($user->pastor_type == 2 ) {

                    /** zone */

                    $user_type      = 'Zone';

                    $zone = Zone::where('user_id',$userId)->first();

                    $countOfAreaPaster      = Area::where('zone_id',$zone->id)
                                                   ->whereNull('deleted_at')
                                                   ->count();
                    $parish                 =  Zone::find($zone->id)->parishes;
                    $countOfParish          =  count($parish);


                    $count['parish']    = $countOfParish;
                    $count['area']      = $countOfAreaPaster;
                    
                } else {
                    
                    /** area */

                    $user_type      = 'Area';

                    $area = Area::where('user_id',$userId)->first();

                    $countOfParish  =   Parish::where('area_id',$area->id)
                                       ->whereNull('deleted_at')
                                       ->count();
                    $count['parish']    = $countOfParish;
                }
                

                $response = [
                    'status'        => true,
                    'user_type'     => $user_type,
                    'message'       => 'Dashbard user count Information',
                    'userCount'     => $count
                ];
                $responseCode = 200;
            } else {

                $parish = Parish::where('user_id',$userId)->first();
                $countOfReport  = Report::where('parish_id',$parish->id)->whereNull('deleted_at')->count();
                $countOfPayment = Payment::where('created_by',$userId)->whereNull('deleted_at')->count();

                $count['payment']   = $countOfPayment;
                $count['report']    = $countOfReport;

                $response = [
                    'status'        => true,
                    'user_type'     => 'Parish',
                    'message'       => 'Dashbard user count Information',
                    'userCount'     => $count
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