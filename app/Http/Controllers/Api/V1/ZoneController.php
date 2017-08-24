<?php
namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Provience;
use App\Models\Zone;
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
use SoftDeletes;

class ZoneController extends Controller {

    /**
     * @var null
     */
    private $authToken = null;

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
     * ZoneController constructor.
     * @param Request $request
     */
    function __construct(Request $request)
    {
    }

    /**
     * Create a new Zone with Poster
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createZone(Request $request)
    {
        try {
            DB::beginTransaction();

            $zone = new Zone();

            $user = new User();

            /*
             * Validate mandatory fields according to Stratics API
             */

            if ($request->has('provience_id'))
                $zone->name = $request->input('provience_id');
            else
                throw new HttpBadRequestException("Please select provience.");

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


            $length = 8;

			$this->randomUsername = $this->generateUsername();

			$this->randomPassword = $this->generateUsername();

            /**
             * Check unique user
             */
        
            $registerUser = User::where('parish_id', $this->randomUsername)->first();


            if(count($registerUser)) {

            	return $this->createZone();
            } 

            $user->parish_id = $this->randomUsername;

            $user->password = $this->randomPassword;

            $user->uniqueKey = Crypt::encrypt($request->input('password'));

            $user->user_type = 2;

            $user->save();

            $insertedId = $user->id;

            $zone->name =$zone->name;

            $zone->provience_id = 1;

            $zone->user_id = $insertedId;

            $zone->created_by = 1;

            $zone->save();

            $response = [
            'status' => true,
            'password' => $this->randomPassword,
            'message' => "Pastor created successfully."
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
	        }

        return response()->json($response, $responseCode);

	}

	 /**
     * Generate Random username and password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

	public function generateUsername() {

		$length = 8;

		$randomUserName = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

		return $randomUserName;

	}

	public function generatePassword() {

		$length = 8;

		$randomPassword = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

		return $randomPassword;

	}
}
?>