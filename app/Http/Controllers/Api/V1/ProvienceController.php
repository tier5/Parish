<?php
/**
* ProvienceController constructor.
* @param Request $request
*/

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Provience;
use App\Models\User;
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

class ProvienceController extends Controller {

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
     * Get Provience list
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getProvinceList(Request $request,$user_id){
         try {
            DB::beginTransaction();

            $provinces=Provience::where('created_by',$user_id)->whereNull('deleted_at')->get();

            $noOfProvinces =count($provinces);
            if($noOfProvinces){

                $provinceArray = [];
                foreach ($provinces as $key => $province) {

                    $provinceArray[$key]['id'] = $province->id;
                    $provinceArray[$key]['province_name'] = $province->name;
                    $provinceArray[$key]['user_id'] = $province->users->id;
                    $provinceArray[$key]['parish_id'] = $province->users->parish_id;
                    $provinceArray[$key]['password'] = $province->users->uniqueKey;
                    $provinceArray[$key]['first_name'] = $province->users->first_name;
                    $provinceArray[$key]['last_name'] = $province->users->last_name;
                }

                    $response = [
                        'status' => true,
                        'message' => $noOfProvinces . ($noOfProvinces > 1 ? " provinces have " : " province has ") . "been found.",
                        'provinces' => $provinceArray
                    ];
                    $responseCode = 200;

                } else {
                    $response = [
                        'status' => true,
                        'noData' => "No Province been found."
                    ];
                    $responseCode = 200;
                }

                }
                catch (Exception $exception) {
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
                }

                return response()->json($response, $responseCode);
        }

    /**
     * Create a new Provience with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createProvience(Request $request)
    {
        try {
            DB::beginTransaction();

            $provience = new Provience();

            $user = new User();

            /*
             * Validate mandatory fields
             */
            if ($request->has('province_name'))
                $provience->name = $request->input('province_name');
            else
                throw new HttpBadRequestException("Province name is required.");

            if ($request->has('first_name'))
                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("First name is required.");

            if ($request->has('last_name'))
                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");
            
            /**
             * Check WEM already create poster in this province
             */

            $checkProvince = Provience::where('created_by',  $request->input('user_id'))
                            ->where('name' , $request->input('province_name'))
                            ->whereNull('deleted_at')->first();

            if(count($checkProvince)) {

                $response = [
                'status' => false,
                'error' => "You have already created a Provincial Pastor for this Province.",
                ];
                $responseCode = 422;

                return response()->json($response, $responseCode);
            }

			$this->randomUsername =Helpers::generateNumber();

			$this->randomPassword = Helpers::generateNumber();

            /**
             * Check unique user
             */
        
            $registerUser = User::where('parish_id', $this->randomUsername)->first();


            if(count($registerUser)) {

            	return $this->createProvience();

            } 

            $user->parish_id = $this->randomUsername;

            $user->password = $this->randomPassword;

            $user->uniqueKey = $this->randomPassword;

            $user->user_type = 2;

            $user->save();

            $insertedId = $user->id;

            $provience->user_id = $insertedId;

            $provience->created_by = $request->input('user_id');

            $provience->save();

            $response = [
            'status' => true,
            'password' => $this->randomPassword,
            'message' => "Provincial Pastor created successfully."
            ];
            $responseCode = 201;
           
	        } catch (HttpBadRequestException $httpBadRequestException) {
	            $response = [
	                'status' => false,
	                'error' => $httpBadRequestException->getMessage()
	            ];
	            $responseCode = 400;
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
                unset($provience);
	        }

        return response()->json($response, $responseCode);

	}

    /**
     * Get Provience poster Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProvinceDetail(Request $request, $province_id){
         try {
            DB::beginTransaction();

            $province=Provience::find($province_id);

            $noOfProvince =count($province);
            if($noOfProvince){

                $provinceArray = [];

                    $provinceArray['id'] = $province->id;
                    $provinceArray['province_name'] = $province->name;
                    $provinceArray['user_id'] = $province->users->id;
                    $provinceArray['first_name'] = $province->users->first_name;
                    $provinceArray['last_name'] = $province->users->last_name;

                    $response = [
                        'status' => true,
                        'message' => $noOfProvince . ($noOfProvince > 1 ? " provinces have " : " province has ") . "been found.",
                        'provinces' => $provinceArray
                    ];
                    $responseCode = 200;

                } else {
                    $response = [
                        'status' => false,
                        'error' => "No province detail has been found."
                    ];
                    $responseCode = 200;
                }

                }
                catch (Exception $exception) {
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
                }

                return response()->json($response, $responseCode);
        }


    /**
     * Update Provience with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProvience(Request $request, $user_id, $created_by, $province_id)
    {
        try {
            DB::beginTransaction();

            $provience = Provience::find($province_id);

            $user = User::find($user_id);

            /*
             * Validate mandatory fields
             */
            if ($request->has('province_name'))
                $provience->name = $request->input('province_name');
            else
                throw new HttpBadRequestException("Province name is required.");

            if ($request->has('first_name'))
                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))
                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");

            $user->user_type = 2;

            $user->save();

            $provience->save();

            $response = [
            'status' => true,
            'message' => "Province updated successfully."
            ];
            $responseCode = 200;
           
            } catch (HttpBadRequestException $httpBadRequestException) {
                $response = [
                    'status' => false,
                    'error' => $httpBadRequestException->getMessage()
                ];
                $responseCode = 400;
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
                unset($provience);
            }

        return response()->json($response, $responseCode);

    }

    /**
     * Delete an existing Province
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */
   
    public function deleteProvience(Request $request, $user_id, $province_id)
    {
        try {
            DB::beginTransaction();

            $province = Provience::findOrFail($province_id)->delete();

           if($province)
           {

                $response = [
                'status' => true,
                'message' => "Province Pastor deleted successfully."
                ];
                $responseCode = 200;
            }
            else
            {

               $response = [
                'status' => true,
                'error' => "No province has been found."
                ];
                $responseCode = 200;  
            }
           
            } catch (HttpBadRequestException $httpBadRequestException) {
                $response = [
                    'status' => false,
                    'error' => $httpBadRequestException->getMessage()
                ];
                $responseCode = 400;
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
                unset($area);
            }

        return response()->json($response, $responseCode);
    }
}