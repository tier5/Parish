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
}