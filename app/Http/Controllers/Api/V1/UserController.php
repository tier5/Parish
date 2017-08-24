<?php
namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Admin;
use App\Models\User;
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

    /**
     * Reset Password poster Detail
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request, $userId){
         try {
            DB::beginTransaction();

            $user=User::findOrFail($userId);

			$this->randomPassword = $this->generateNumber();

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
	* Generate Random username and password
	*
	* @param Request $request
	* @return \Illuminate\Http\JsonResponse
	*/

	public function generateNumber() {

		$length = 8;

		$randomNumber = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

		return $randomNumber;

	}
}