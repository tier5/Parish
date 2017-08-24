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

    public function getParishList(Request $request,$user_id){
        try {
            DB::beginTransaction();

            $parishes=Parish::where('created_by',$user_id)->whereNull('deleted_at')->get();

            $noOfParish =count($parishes);

            if($parishes){

                $parishArray = [];

                foreach ($parishes as $key => $parish) {

                    $parishArray[$key]['id'] = $parish->id;
                    $parishArray[$key]['user_id'] = $parish->users->id;
                    $parishArray[$key]['parish_id'] = $parish->users->parish_id;
                    $parishArray[$key]['parish_name'] = $parish->name;
                    $parishArray[$key]['provience_name'] = $parish->areas->zones->proviences->name;
                    $parishArray[$key]['zone_name'] = $parish->areas->zones->name;
                    $parishArray[$key]['area_name'] = $parish->areas->name;
                    $parishArray[$key]['pastor_name_area'] = $parish->areas->users->first_name;
                    $parishArray[$key]['pastor_name_zone'] = $parish->areas->zones->users->first_name;
                    $parishArray[$key]['pastor_name_province'] = $parish->areas->zones->proviences->users->first_name;
                    $parishArray[$key]['password'] = $parish->users->uniqueKey;
                    $parishArray[$key]['first_name'] = $parish->users->first_name;
                    $parishArray[$key]['last_name'] = $parish->users->last_name;
                }
                
                    $response = [
                        'status' => true,
                        'message' => $noOfParish . ($noOfParish > 1 ? " parish have " : " parish has ") . "been found.",
                        'parish' => $parishArray
                    ];
                    $responseCode = 200;

                } else {
                    $response = [
                        'status' => false,
                        'message' => "No parish has been found."
                    ];
                    $responseCode = 404;
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

            $user = new User();

            /*
             * Validate mandatory fields
             */
            if ($request->has('area_id'))
                $parish->area_id = $request->input('area_id');
            else
                throw new HttpBadRequestException("Area selection is required.");

            if ($request->has('name'))
                $parish->name = $request->input('name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('first_name'))
                $user->first_name = $request->input('first_name');
            else
                throw new HttpBadRequestException("Fist name is required.");

            if ($request->has('last_name'))
                $user->last_name = $request->input('last_name');
            else
                throw new HttpBadRequestException("Last name is required.");
            
            $length = 8;

            $this->randomUsername = $this->generateNumber();

            $this->randomPassword = $this->generateNumber();

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

            $user->user_type = 3;

            $user->save();

            $insertedId = $user->id;

            $parish->user_id = $insertedId;

            $parish->created_by = $request->input('user_id');

            $parish->save();

            $response = [
            'status' => true,
            'password' => $this->randomPassword,
            'message' => "Parish created successfully."
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
     * Generate Random username and password
     *
     * @param Request $request
     * @return \Illuminate\Http     d\JsonResponse
     */

    public function generateNumber() {

        $length = 8;

        $randomNumber = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

        return $randomNumber;
    }

    /**
     * Update Parish with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateParish(Request $request, $user_id, $created_by, $parish_id)
    {
        try {
            DB::beginTransaction();

            $parish = Parish::find($parish_id);

            $user = User::find($user_id);

            /*
             * Validate mandatory fields
             */
            if ($request->has('name'))
                $parish->name = $request->input('name');
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
            
            $user->first_name = $request->input('first_name');

            $user->last_name = $request->input('last_name');
            
            $user->save();

            if ($request->has('area_id'))
                $parish->area_id = $request->input('area_id');

            $parish->save();

            $response = [
            'status' => true,
            'message' => "Parish updated successfully."
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
     * Delete an existing Parish
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteParish($parish_id){

        try {
            DB::beginTransaction();

            $parish = Parish::findOrFail($parish_id)->delete();

           if($parish)
           {

                $response = [
                'status' => true,
                'message' => "Parish deleted successfully."
                ];
                $responseCode = 200;
            }
            else
            {

               $response = [
                'status' => true,
                'message' => "No province has been found."
                ];
                $responseCode = 404;  
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