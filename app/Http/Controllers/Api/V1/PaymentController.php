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
use App\Models\Parish;
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

            /** Logged in user is Parish */
            if($user_type == 3) {
                $request_month  =   $request->input('request_month');
                $request_year   =   $request->input('request_year');

                $payments = Payment::whereNull('deleted_at');
                $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                $payments = $payments->where('created_by',$userId);
                $payments = $payments->get(); 
            }
            /** Logged in user is WEM */
            else if($user_type == 1) {
                if($request->has('province_id') || $request->has('zone_id') || $request->has('area_id') || $request->has('parish_id') || $request->has('request_month') || $request->has('request_year') ){

                    $province_id    =   $request->input('province_id');
                    $zone_id        =   $request->input('zone_id');
                    $area_id        =   $request->input('area_id');
                    $request_month  =   $request->input('request_month');
                    $request_year   =   $request->input('request_year');

                    if($request->has('parish_id')){ 
                        $parishInfo = Parish::find($request->input('parish_id'));
                        $parish_id  = $parishInfo->user_id;

                        $payments = Payment::whereNull('deleted_at');
                        $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                        $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                        $payments = $payments->where('created_by',$parish_id);
                        $payments = $payments->get();
                    } else if($request->has('province_id') || $request->has('zone_id') || $request->has('area_id')) {

                        $province_id    =   $request->input('province_id');
                        $zone_id        =   $request->input('zone_id');
                        $area_id        =   $request->input('area_id');
                        
                        if($request->has('area_id')) {

                            $parishes = Area::find($area_id)->parishes;
                        } else {

                           if($request->has('zone_id')) {
                                if(Zone::find($zone_id)){
                                  $parishes = Zone::find($zone_id)->parishes;  
                                } else {
                                  $parishes = [];  
                                }
                            } else {
                                if(Provience::find($province_id)) {
                                    $areas = Provience::find($province_id)->areas;
                                    $area_array =[];
                                    if($areas) {
                                        foreach ($areas as  $area) {
                                            array_push($area_array,$area->id);
                                        }
                                        $parishes = Parish::whereIn('area_id',$area_array)->get();
                                    }
                                } else {
                                   $parishes = []; 
                                }
                            }
                        }

                        $parishArray = array();
                        if($parishes) {
                            foreach($parishes as $parish) {
                                array_push($parishArray, $parish->user_id);
                            }
                            $payments = Payment::whereNull('deleted_at');
                            $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                            $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                            $payments = ($parishes) ? $payments->whereIn('created_by',$parishArray) : $payments;
                            $payments = $payments->get();
                        } else {
                            $payments = [];
                        }
                        
                    } else {
                        $payments = Payment::whereNull('deleted_at');
                        $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                        $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                        $payments = $payments->where('wem_id',$userId);
                        $payments = $payments->get();
                    }
                } else {
                    $payments = Payment::whereNull('deleted_at')
                                       ->where('wem_id',$userId)
                                       ->get();
                }
            } else {
                /** Logged in user is Paster */
                $province_id    =   $request->input('province_id');
                $zone_id        =   $request->input('zone_id');
                $area_id        =   $request->input('area_id');
                $request_month  =   $request->input('request_month');
                $request_year   =   $request->input('request_year');

                $userDetails =User::find($userId);
                if($userDetails->pastor_type == 1) {
                    if($request->has('parish_id')) {
                        $parishInfo = Parish::find($request->input('parish_id'));
                        $parish_id  = $parishInfo->user_id;

                        $payments = Payment::whereNull('deleted_at');
                        $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                        $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                        $payments = $payments->where('created_by',$parish_id);
                        $payments = $payments->where('payment_status',1);
                        $payments = $payments->get();
                    } else {
                        if ($request->has('area_id')) {
                            $parishList = Parish::where('area_id',$request->input('area_id'))->get();
                         } else if ($request->has('zone_id')) {
                            $areaList = Area::where('zone_id',$request->input('zone_id'))->get();
                            $areaArray = array();
                                if($areaList) {
                                    foreach($areaList as $area){
                                        array_push($areaArray,$area->id);
                                    }
                                $parishList = Parish::whereIn('area_id',$areaArray)->get();
                                } else {
                                 $parishList = [];   
                                }
                            
                        } else {
                            $provinceInfo = Provience::where('user_id',$userDetails->id)->first();
                            $zoneInfo = zone::where('provience_id',$provinceInfo->id)->get();
                            $zoneArray = array();
                            foreach($zoneInfo as $zone){
                                array_push($zoneArray,$zone->id);
                            }
                            $areaList = Area::whereIn('zone_id',$zoneArray)->get();
                            $areaArray = array();
                            foreach($areaList as $area){
                                array_push($areaArray,$area->id);
                            }
                            $parishList = Parish::whereIn('area_id',$areaArray)->get();
                        }
                        $parishArray = array();
                        if($parishList) {
                            foreach($parishList as $parish){
                                array_push($parishArray,$parish->user_id);
                            }
                            $payments = Payment::whereNull('deleted_at');
                            $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                            $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                            $payments = $payments->whereIn('created_by',$parishArray);
                            $payments = $payments->where('payment_status',1);
                            $payments = $payments->get();
                        } else {
                            $payments = [];
                        }
                    }
                } else if($userDetails->pastor_type == 2) {
                    if($request->has('parish_id')) {
                        $parishInfo = Parish::find($request->input('parish_id'));
                        $parish_id  = $parishInfo->user_id;

                        $payments = Payment::whereNull('deleted_at');
                        $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                        $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                        $payments = $payments->where('created_by',$parish_id);
                        $payments = $payments->where('payment_status',1);
                        $payments = $payments->get();
                    } else {
                        if ($request->has('area_id')) {
                            $parishList = Parish::where('area_id',$request->input('area_id'))->get();
                         } else {
                            $zoneInfo = zone::where('user_id',$userDetails->id)->first();
                            $areaList = Area::where('zone_id',$zoneInfo->id)->get();
                            $areaArray = array();
                            foreach($areaList as $area){
                                array_push($areaArray,$area->id);
                            }
                            $parishList = Parish::whereIn('area_id',$areaArray)->get();
                        }
                        $parishArray = array();
                        if($parishList) {
                            foreach($parishList as $parish){
                                array_push($parishArray,$parish->user_id);
                            }
                            $payments = Payment::whereNull('deleted_at');
                            $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                            $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                            $payments = $payments->whereIn('created_by',$parishArray);
                            $payments = $payments->where('payment_status',1);
                            $payments = $payments->get();
                        } else {
                            $payments = [];
                        }
                    }
                } else {
                    if($request->has('parish_id')) {
                        $payments = Payment::whereNull('deleted_at');
                        $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                        $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                        $payments = $payments->where('created_by',$request->input('parish_id'));
                        $payments = $payments->where('payment_status',1);
                        $payments = $payments->get(); 
                    } else {
                        $areaInfo = Area::where('user_id',$userDetails->id)->first();
                        $parishList = Parish::where('area_id',$areaInfo->id)->get();
                        $parishArray = array();
                        if($parishList) {
                            foreach($parishList as $parish){
                                array_push($parishArray,$parish->user_id);
                            }
                            $payments = Payment::whereNull('deleted_at');
                            $payments = $request->has('request_month') ? $payments->where('upload_month', $request_month) : $payments;
                            $payments = $request->has('request_year') ? $payments->where('upload_year', $request_year) : $payments;
                            $payments = $payments->whereIn('created_by',$parishArray);
                            $payments = $payments->where('payment_status',1);
                            $payments = $payments->get();
                        } else {
                            $payments = [];
                        }
                    }
                }
            }

            $noOfPayment = count($payments);
            if($noOfPayment > 0){

                $paymentArray = [];
                foreach ($payments as $key => $payment) {
                        $parishDetails = Parish::where('user_id',$payment->created_by)->first();

                        $paymentArray[$key]['id']                     = $payment->id;
                        $paymentArray[$key]['wem_id']                 = $payment->wem_id;
                        $paymentArray[$key]['file_name']              = $payment->file_name;
                        $paymentArray[$key]['payment_description']    = $payment->payment_description;
                        $paymentArray[$key]['upload_month']           = $payment->upload_month;
                        $paymentArray[$key]['upload_year']            = $payment->upload_year;
                        $paymentArray[$key]['payment_status']         = $payment->payment_status;
                        $paymentArray[$key]['created_at']             = $payment->created_at;
                        $paymentArray[$key]['parish_id']              = $parishDetails->id;
                        $paymentArray[$key]['parish_name']            = $parishDetails->name;
                        $paymentArray[$key]['province_name']          = $parishDetails->areas->zones->proviences->name;
                        $paymentArray[$key]['zone_name']              = $parishDetails->areas->zones->name;
                        $paymentArray[$key]['area_name']              = $parishDetails->areas->name;
                        $paymentArray[$key]['province_id']            = $parishDetails->areas->zones->proviences->id;
                        $paymentArray[$key]['zone_id']                = $parishDetails->areas->zones->id;
                        $paymentArray[$key]['area_id']                = $parishDetails->areas->id;
                        $paymentArray[$key]['first_name']             = $parishDetails->users->first_name;
                        $paymentArray[$key]['last_name']              = $parishDetails->users->last_name;
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
                    'message'     => "No payment has been found.",
                    'paymentDetail' => []
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
                else if($getUser->pastor_type == 3)
                {
                    $getWEMuser=Area::where('user_id', $request->input('user_id'))->first(); 
                } else{

                    $getWEMuser=Parish::where('user_id', $request->input('user_id'))->first(); 
                }

                $this->WEMUser= $getWEMuser->created_by;

            } else {
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
             $headers = array(
                'Content-Type: image/jpeg'
             );
            //return response()->download(public_path('paymentReceipt/'.$payment->file_name), $payment->file_name,$headers);
            return response()->download(public_path('paymentReceipt/'.$payment->file_name), $payment->file_name,$headers);
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

            $currentYear =Date('Y');

            $paymentArray =[];

            for($i = 1 ; $i <= 12 ; $i++) {

                  $allPayments = Payment::where('created_by',$userId)->where('upload_month', $i)->where('upload_year', $currentYear)->get();

                  $noOfAllpayments= count($allPayments);

                  $rejectPayments = Payment::where('created_by',$userId)->where('upload_month', $i)->where('upload_year', $currentYear)->where('payment_status', 1)->get();

                  $noOfRejectpayments = count($rejectPayments);

                  if($noOfAllpayments == $noOfRejectpayments && $noOfAllpayments != 0 && $noOfRejectpayments != 0)
                  {
                    
                        foreach ($allPayments as $key => $payment) {

                            $paymentArray[$i][$key]['id']                     = $payment->id;
                            $paymentArray[$i][$key]['wem_id']                 = $payment->wem_id;
                            $paymentArray[$i][$key]['first_name']             = $payment->name;
                            $paymentArray[$i][$key]['payment_description']    = $payment->payment_description;
                            $paymentArray[$i][$key]['upload_month']           = $payment->upload_month;
                            $paymentArray[$i][$key]['upload_year']            = $payment->upload_year;
                            $paymentArray[$i][$key]['payment_status']         = $payment->payment_status;
                            $paymentArray[$i][$key]['created_at']             = $payment->created_at;
                    }
                }

            }

            $response = [
                'status'        => true,
                'message'       => 'get rejected payment list',
                'paymentDetail' => $paymentArray
            ];

            $responseCode = 200;

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