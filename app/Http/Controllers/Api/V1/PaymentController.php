<?php
/**
* PaymentController to get list of payment, submit payment, reject payment.
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

class PaymentController extends Controller {

    /**
     * @var null|string
     */

    private $userId = null;

    /**
     * @var null|string
     */
    
    private $WEMUser = null;
  
    /**
     * Get Payment List for Pastor
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPastorPaymentList(Request $request, $userId, $user_type) {

        try {
            DB::beginTransaction();

            if($user_type == 2) {

                $payments=Payment::where('created_by',$userId)->get();
            }
            else if($user_type == 1) {

                $payments=Payment::where('wem_id',$userId)->get();
            }

            $noOfPayment = count($payments);

            if($noOfPayment > 0){

                $paymentArray = [];
                foreach ($payments as $key => $payment) {
                        $paymentArray[$key]['id']                     = $payment->id;
                        $paymentArray[$key]['wem_id']                 = $payment->wem_id;
                        $paymentArray[$key]['first_name']             = $payment->name;
                        $paymentArray[$key]['payment_description']    = $payment->payment_description;
                        $paymentArray[$key]['upload_month']           = $payment->upload_month;
                        $paymentArray[$key]['upload_year']            = $payment->upload_year;
                        $paymentArray[$key]['payment_status']         = $payment->payment_status;
                        $paymentArray[$key]['created_at']             = $payment->created_at;
                }
                
                $response = [
                    'status'        => true,
                    'message'       => 'get payment list',
                    'paymentDetail' => $paymentArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'    => false,
                    'error'     => "No payment has been found."
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
     * Create a Payment by Pastor
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createPayment(Request $request){
        
        try {
            DB::beginTransaction();

            $user       = new User();
            $payment    = new Payment();
            $getUser    = User::find($request->input('user_id'));

            $noOfUser = count($getUser);            

            if($noOfUser > 0 ) {

                if($getUser->pastor_type == 1) {

                    $getWEMuser=Provience::where('user_id', $request->input('user_id'))->first();

                }
                else if($getUser->pastor_type == 2) {

                    $getWEMuser=Zone::where('user_id', $request->input('user_id'))->first(); 
                }
                else
                {
                    $getWEMuser=Area::where('user_id', $request->input('user_id'))->first(); 
                }

                $this->WEMUser= $getWEMuser->created_by;

            }
            else
            {
                $response = [
                    'status'        => false,
                    'error'         => "pastor not found.",
                ];

                $responseCode = 200;

                return response()->json($response, $responseCode); 
            }


            /*
             * Validate mandatory fields
             */

            if ($request->file('name')) {

                $getFileExtension=$request->name->getClientOriginalExtension();

                $allowedExts = array("jpg","pdf","jpeg", "doc","docx");

                    if(in_array($getFileExtension, $allowedExts)) {

                        $getFileSize=$request->name->getClientSize();

                            if($getFileSize > 2097152) {

                                throw new HttpBadRequestException("File size should be less than 1MB !");

                            } else {

                                $payment->file_name=time().'.'.$request->name->getClientOriginalExtension();

                            }

                    } else {

                        throw new HttpBadRequestException("pdf/doc/image files are only allowed!.");
                    }

            } 
            else {
                throw new HttpBadRequestException("Please upload your payment receipt.");
            }

            if ($request->has('upload_month')) {

                $user->first_name = $request->input('upload_month');
            }
            else {

                throw new HttpBadRequestException("Please select month.");
            }

            if ($request->has('upload_year')) {

                $user->last_name = $request->input('upload_year');
            }
            else{

                throw new HttpBadRequestException("Please select year.");
            }

            /*
             * Save Payment Data
             */

            $payment->wem_id                = $this->WEMUser;

            $payment->file_name             = $payment->file_name;

            $payment->payment_description   = $request->input('payment_description');

            $payment->upload_month          = $request->input('upload_month');

            $payment->upload_year           = $request->input('upload_year');

            $payment->created_by            = $request->input('user_id');

            $payment->save();

            $response = [
                'status'    => true,
                'message'   => "Payment receipt submitted successfully."
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

            $request->name->move(public_path('paymentReceipt'), $payment->file_name);

            unset($payment);
        }
        return response()->json($response, $responseCode);
    }

    /**
     * Update Payment Status
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePaymentStatus(Request $request, $payment_id) {

        try {

            DB::beginTransaction();

            $payment = Payment::find($payment_id);

            /**
             * Save Payment Status
             */

            $payment->payment_status = $request->input('payment_status');

            $payment->save();

            $response = [
                'status'    => true,
                'message'   => "Payment status changed successfully."
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

            unset($payment);
        }
        return response()->json($response, $responseCode);
    }

    /**
     * Download File
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function downloadFile(Request $request, $payment_id) {

        $payment = Payment::find($payment_id);

        /**
         * Download File
         */

        if($payment->file_name)
        {
            // $headers = array(
            // 'Content-Type: ' . mime_content_type( $payment->file_name )
            // );
            return response()->download(public_path('paymentReceipt'), $payment->file_name);
        }
        else
        {
            Log::error($exception->getMessage());

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;

            return response()->json($response, $responseCode);
        }

    }

    /**
     * Get Rejected payment list
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPastorRejectdPaymentList(Request $request, $userId, $user_type) {

        try {
            DB::beginTransaction();

            if($user_type == 2) {

                $payments=Payment::where('created_by',$userId)->where('payment_status', 1)->get();
            }
            else if($user_type == 1) {

                $payments=Payment::where('wem_id',$userId)->get();
            }

            $noOfPayment = count($payments);

            if($noOfPayment > 0){

                $paymentArray = [];
                foreach ($payments as $key => $payment) {
                        $paymentArray[$key]['id']                     = $payment->id;
                        $paymentArray[$key]['wem_id']                 = $payment->wem_id;
                        $paymentArray[$key]['first_name']             = $payment->name;
                        $paymentArray[$key]['payment_description']    = $payment->payment_description;
                        $paymentArray[$key]['upload_month']           = $payment->upload_month;
                        $paymentArray[$key]['upload_year']            = $payment->upload_year;
                        $paymentArray[$key]['payment_status']         = $payment->payment_status;
                        $paymentArray[$key]['created_at']             = $payment->created_at;
                }

                $response = [
                    'status'        => true,
                    'message'       => 'get payment list',
                    'paymentDetail' => $paymentArray
                ];
                $responseCode = 200;

            } else {
                $response = [
                    'status'    => false,
                    'error'     => "No reject list has been found."
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