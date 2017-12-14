<?php
    /**
    * CsvuploadController to manage csv upload , persing data from csv, insert data .
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
use App\Models\Payment;
use App\Helpers;
use Crypt;
use DB;
use Excel;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;
use Log;
use SoftDeletes;
use \Stripe;

class UploadController extends Controller {
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
     * Upload Csv For 
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function uploadCsv(Request $request, $userId) {
        $getUserInfo=User::where('id',$userId)->first();
        $parishCount=0;
        $areaCount=0;
        $zoneCount=0;
        $provinceCount=0;
        if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){                                                            // If the user is WEM 
                if ($request->hasFile('file')) {                                                //If Any File Exists
                    $allowedExts        = array('csv','CSV','xls','XLS','xlsx','XLSX');                                   //Store Allowable extentions for upload in array
                    $getFileExtension   = $request->file('file')->getClientOriginalExtension(); //Get extention for uploaded file
                    if(in_array($getFileExtension, $allowedExts)) {                             //If extention is allowed
                        $getFileSize    = $request->file('file')->getClientSize();              //Get size for uploaded file in bytes
                        if($getFileSize > 200000000) {                                           //If file size cross the allowable size limit
                            $response = [
                                'status' => false,
                                'error'        => "Bad Request",
                                'error_info' => 'File size should be less than or equal 2000MB !',
                            ];
                            $responseCode = 400;
                        } else {                                                             //If file size cross the allowable size limit
                            $newFilename=time();                   
                            $newFilenameWithExtention=$newFilename.".".$getFileExtension;
                            $request->file('file')->move(base_path().'/public/files/',$newFilenameWithExtention); //Uploading The File.
                            
                            $headerValues  = array(); //@var array|null
                            $counter = 0;  //@var string|default 0
                            if (($handle = fopen(base_path().'/public/files/'.$newFilenameWithExtention, "r")) !== FALSE) { //read the file
                                while(($data = fgetcsv($handle, 1000, ",")) !== false){  // To grab the header values on first iteration
                                    if ($counter == 0) {
                                       $headerValues = $data;                            // store them in an array
                                       $counter++;                                       // increment counter
                                    }                
                                }
                            }

                            if ((in_array("Firstname",  $headerValues)) && (in_array("Lastname",  $headerValues)) &&(in_array("Province",  $headerValues)) ){ //If Header are present properly
                                $data = Excel::load(public_path() . "/files/".$newFilenameWithExtention)->get();  //Store All Data From The CSV File
                                $data_array = $data->toArray(); //Convert to array
                                
                                for($i=0; $i<count($data_array); $i++){ //Start Inserting Data into "export_addresses" table
                                    if((isset($data_array[$i]['firstname']) && (!empty($data_array[$i]['firstname']))) && (isset($data_array[$i]['lastname'])) && (!empty($data_array[$i]['lastname']))&& (isset($data_array[$i]['province'])) && (!empty($data_array[$i]['province']))){ // Check If First Name Last Name Password Province Exist Or not
                                       
                                        if((isset($data_array[$i]['parish']) && (!empty($data_array[$i]['parish'])))){
                                            if((isset($data_array[$i]['area']) && (!empty($data_array[$i]['area'])))){
                                                if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])) && ($data_array[$i]['startdate']))){
                                                   $parishCount=$parishCount+1;
                                                }
                                            }
                                        }else{
                                            if((isset($data_array[$i]['area']) && (!empty($data_array[$i]['area'])))){
                                                if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])))){
                                                   $areaCount=$areaCount+1;
                                                }
                                            }else{
                                                if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])))){
                                                   $zoneCount=$zoneCount+1;
                                                }else{
                                                    $provinceCount=$provinceCount+1;
                                                }

                                            }
                                        }
                                    }
                                }

                               /* if($parishCount!=0){
                                    $response = [
                                        'status'       => true,
                                        'parishCount'   => $parishCount,
                                        'allData'       => $data_array,
                                        'message'       => '$'.$parishCount." will deduct for parish creation. Do you want to proceed ?"
                                    ];
                                    $responseCode = 200;
                                }else{*/
                                    $response=$this->parseData($userId,$data_array,$parishCount);
                                    $responseCode = 200;
                                /*}*/
                            }else{
                                 $response = [
                                    'status'       => false,
                                    'error'        => "Bad Request",
                                    'error_info'   => 'Mandatory Headers Are Missing'
                                ];
                                $responseCode = 400;
                            }
                        }
                    } else {
                        $response = [
                            'status'       => false,
                            'error'        => "Bad Request",
                            'error_info'   => 'File Not Allowed'
                        ];
                        $responseCode = 400;
                    }
                }else{
                    $response = [
                            'status'       => false,
                            'error'        => "Bad Request",
                            'error_info'   => 'File Not Found'
                    ];
                    $responseCode = 400;                                                                      // If the user is not WEM 
                    $response = [
                        'status'       => false,
                        'error'        => "Bad Request",
                        'error_info'   => 'No File Uploaded'
                    ];
                    $responseCode = 400;
                }
        }else{                                                                               // If the user is not WEM 
            $response = [
                'status'       => false,
                'error'        => "Bad Request",
                'error_info'   => 'Permission Denied'
            ];
            $responseCode = 400;
        }
        return response()->json($response, $responseCode);
    }

    public function parseData($userId,$data,$parishCount){
        $getUserInfo=User::where('id',$userId)->first();
        if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){
            $data =$data; //$request->data(); 
         
            for($i=0; $i<count($data); $i++){ //Start Inserting Data into "export_addresses" table

                if((isset($data[$i]['firstname']) && (!empty($data[$i]['firstname']))) && (isset($data[$i]['lastname'])) && (!empty($data[$i]['lastname']))&& (isset($data[$i]['province'])) && (!empty($data[$i]['province']))){ // Check If First Name Last Name Province Exist Or not
                    
                    $getProvinceInfo=Provience::where('name',$data[$i]['province'])->where('created_by',$userId)->first();
                                
                    if(count($getProvinceInfo) >0){                             //If Province is already present in DB
                        $provinceId=$getProvinceInfo->id;                       //@Store "provinceId" 
                    }else{
                        $this->randomUsername = Helpers::generateNumber();
                        $this->randomPassword = Helpers::generateNumber();

                        if((isset($data[$i]['zone'])) && (!empty($data[$i]['zone']))){
                            $provFirstname=null;
                            $provLastname=null;
                        }else{
                            $provFirstname=$data[$i]['firstname'];
                            $provLastname=$data[$i]['lastname'];
                        }
                        $createNewUser = new User();   
                        $createNewUser->parish_id = $this->randomUsername;
                        $createNewUser->first_name =$provFirstname;
                        $createNewUser->last_name =$provLastname;
                        $createNewUser->user_type =2;
                        $createNewUser->pastor_type=1;
                        $createNewUser->user_status=1;
                        $createNewUser->email=null;
                        $createNewUser->password=$this->randomPassword;
                        $createNewUser->uniqueKey=$this->randomPassword;
                        $createNewUser->save();

                        $NewProvinceId=$createNewUser->id;

                        $Province=new Provience();
                        $Province->name=$data[$i]['province'];
                        $Province->user_id=$NewProvinceId;
                        $Province->created_by=$userId;
                        $Province->save();

                        $provinceId=$Province->id;
                    }

                    if((isset($data[$i]['zone']) && (!empty($data[$i]['zone'])) && $provinceId)){  //Check Zone Name Empty or not
                        $getZonesInfo=Zone::where('name',$data[$i]['zone'])->where('provience_id',$provinceId)->where('created_by',$userId)->first();
                        if(count($getZonesInfo) >0){
                            $zoneId=$getZonesInfo->id;
                        }else{
                            $this->randomUsername = Helpers::generateNumber();
                            $this->randomPassword = Helpers::generateNumber();

                            if((isset($data[$i]['area'])) && (!empty($data[$i]['area']))){
                                $zoneFirstname=null;
                                $zoneLastname=null;
                            }else{
                                $zoneFirstname=$data[$i]['firstname'];
                                $zoneLastname=$data[$i]['lastname'];
                            }

                            $createNewUser = new User();   
                            $createNewUser->parish_id = $this->randomUsername;
                            $createNewUser->first_name =$zoneFirstname;
                            $createNewUser->last_name =$zoneLastname;
                            $createNewUser->user_type =2;
                            $createNewUser->pastor_type=2;
                            $createNewUser->user_status=1;
                            $createNewUser->email=null;
                            $createNewUser->password=$this->randomPassword;
                            $createNewUser->uniqueKey=$this->randomPassword;
                            $createNewUser->save();

                            $NewZoneId=$createNewUser->id;

                            $Zone=new Zone();
                            $Zone->name=$data[$i]['zone'];
                            $Zone->user_id=$NewZoneId;
                            $Zone->provience_id=$provinceId;
                            $Zone->created_by=$userId;
                            $Zone->save();

                            $zoneId=$Zone->id;
                        }
                    }

                    if((isset($data[$i]['area']) && (!empty($data[$i]['area']))) && $provinceId && $zoneId){      //Check Area Name Empty or not
                        $getAreaInfo=Area::where('name',$data[$i]['area'])->where('zone_id',$zoneId)->where('created_by',$userId)->first();
                        if(count($getAreaInfo) >0){
                            $areaId=$getAreaInfo->id;
                        }else{
                            $this->randomUsername = Helpers::generateNumber();
                            $this->randomPassword = Helpers::generateNumber();

                            if((isset($data[$i]['parish'])) && (!empty($data[$i]['parish']))){
                                $areaFirstname=null;
                                $areaLastname=null;
                            }else{
                                $areaFirstname=$data[$i]['firstname'];
                                $areaLastname=$data[$i]['lastname'];
                            }

                            $createNewUser = new User();   
                            $createNewUser->parish_id = $this->randomUsername;
                            $createNewUser->first_name =$areaFirstname;
                            $createNewUser->last_name =$areaLastname;
                            $createNewUser->user_type =2;
                            $createNewUser->pastor_type=3;
                            $createNewUser->user_status=1;
                            $createNewUser->email=null;
                            $createNewUser->password=$this->randomPassword;
                            $createNewUser->uniqueKey=$this->randomPassword;
                            $createNewUser->save();

                            $newAreaId=$createNewUser->id;

                            $Area = new Area();
                            $Area->name = $data[$i]['area'];
                            $Area->user_id = $newAreaId;
                            $Area->zone_id = $zoneId;
                            $Area->created_by = $userId;
                            $Area->save();

                            $areaId=$Area->id;

                        }
                    }

                    if((isset($data[$i]['parish']) && (!empty($data[$i]['parish']))) && $provinceId && $zoneId && $areaId){ 
                        
                        $getParishInfo=Parish::where('name',$data[$i]['parish'])->where('area_id',$areaId)->where('created_by',$userId)->first();
                        if(count($getParishInfo)==0){

                            $this->randomUsername = Helpers::generateNumber();
                            $this->randomPassword = Helpers::generateNumber();

                            $createNewUser = new User();   
                            $createNewUser->parish_id = $this->randomUsername;
                            $createNewUser->first_name =$data[$i]['firstname'];
                            $createNewUser->last_name =$data[$i]['lastname'];
                            $createNewUser->user_type =3;
                            $createNewUser->pastor_type=0;
                            $createNewUser->user_status=1;
                            $createNewUser->email=null;
                            $createNewUser->password=$this->randomPassword;
                            $createNewUser->uniqueKey=$this->randomPassword;
                            $createNewUser->save();

                            $newParisId=$createNewUser->id;

                            $parish = new Parish();
                            $parish->name = $data[$i]['parish'];
                            $parish->user_id    = $newParisId;
                            $parish->area_id= $areaId;
                            $parish->start_date=$data[$i]['startdate'];
                            $parish->created_by = $userId;
                            $parish->save();


                            $key  = \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                            $stripe_token = $request->input('token');
                            $creditCardToken = $stripe_token['id'];

                            $plan_id = env('PARISH_PLAN');

                            $plan = \Stripe\Plan::retrieve($plan_id);
                            $amount = $plan->amount;
                            $currency = $plan->currency;
                                
                            $wem = User::find($userId);

                            $subscription =\Stripe\Subscription::create(array(
                                "customer" => $wem->stripe_id,
                                "items" => array(
                                    array(
                                         "plan" => $plan_id,
                                   ),
                                )
                            )); 

                            if($subscription->id) {
                                $wem_payment = new WemPayment();
                                $wem_payment->wem_id = $userId;
                                $wem_payment->parish_user_id = $parish->id;
                                $wem_payment->name = $plan->interval;
                                $wem_payment->stripe_id = $subscription->id;
                                $wem_payment->card_brand = $stripe_token['card']['brand'];
                                $wem_payment->card_last_four = $stripe_token['card']['last4'];
                                $wem_payment->save();
                            }
                        }
                    }            
                }
            }
            $response = [
                'status'       => true,
                'message'      =>'Successfully Uploaded'
            ];
            $responseCode = 200;
        }else{                                                                               // If the user is not WEM 
            $response = [
                'status'       => false,
                'error'        => "Bad Request",
                'error_info'   => 'Permission Denied'
            ];
            $responseCode = 400;
        }
        return response()->json($response, $responseCode);
    }

   
}