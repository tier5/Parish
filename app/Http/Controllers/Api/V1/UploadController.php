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
    use App\Models\WemPayment;
    use Log;
    use File;
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
                            $path=base_path().'/storage/files';
                             
                            
                            if (!file_exists($path)) {
                                $result = File::makeDirectory($path, 0775);
                            }

                            $request->file('file')->move(base_path().'/storage/files/',$newFilenameWithExtention); //Uploading The File.
                            
                            $headerValues  = array(); //@var array|null
                            $counter = 0;  //@var string|default 0
                            if (($handle = fopen(base_path().'/storage/files/'.$newFilenameWithExtention, "r")) !== FALSE) { //read the file
                                while(($data = fgetcsv($handle, 1000, ",")) !== false){  // To grab the header values on first iteration
                                    if ($counter == 0) {
                                       $headerValues = $data;                            // store them in an array
                                       $counter++;                                       // increment counter
                                    }                
                                }
                            }

                            if ((in_array("Firstname",  $headerValues)) && (in_array("Lastname",  $headerValues)) &&(in_array("Province",  $headerValues)) ){ //If Header are present properly
                                $data = Excel::load(base_path().'/storage/files/'.$newFilenameWithExtention)->get();  //Store All Data From The CSV File
                                $data_array = $data->toArray(); //Convert to array
                                
                                for($i=0; $i<count($data_array); $i++){ //Start Inserting Data into "export_addresses" table
                                    if((isset($data_array[$i]['firstname']) && (!empty($data_array[$i]['firstname']))) && (isset($data_array[$i]['lastname'])) && (!empty($data_array[$i]['lastname']))&& (isset($data_array[$i]['province'])) && (!empty($data_array[$i]['province']))){ // Check If First Name Last Name Password Province Exist Or not
                                        $provinceId="";
                                        $zoneId="";
                                        $areaId="";
                                        $parishId="";
                                        $getProvinceInfo=Provience::where('name',$data[$i]['province'])->where('created_by',$userId)->first();
                                        if(count($getProvinceInfo) ==0){                             //If Province is already present in DB
                                            $provinceCount=$provinceCount+1;
                                            if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])))){
                                                $zoneCount=$zoneCount+1;
                                                if((isset($data_array[$i]['area']) && (!empty($data_array[$i]['area'])))){
                                                   $areaCount=$areaCount+1;
                                                    if((isset($data_array[$i]['parish']) && (!empty($data_array[$i]['parish']))) && (isset($data[$i]['startdate']) && (!empty($data[$i]['startdate'])))){
                                                        $parishCount=$parishCount+1;
                                                    }
                                                }
                                            }                    
                                        }else{
                                            $provinceId=$getProvinceInfo->id;
                                            if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])))){
                                                $getZonesInfo=Zone::where('name',$data[$i]['zone'])->where('provience_id',$provinceId)->where('created_by',$userId)->first();  
                                                if(count($getZonesInfo)==0){
                                                    if((isset($data_array[$i]['area']) && (!empty($data_array[$i]['area'])))){
                                                        if((isset($data_array[$i]['parish']) && (!empty($data_array[$i]['parish']))) && (isset($data[$i]['startdate']) && (!empty($data[$i]['startdate'])))){
                                                            $parishCount=$parishCount+1;
                                                        }else{
                                                            $areaCount=$areaCount+1; 
                                                        }
                                                    }else{
                                                        $zoneCount=$zoneCount+1; 
                                                    }
                                                }else{
                                                    $zoneId=$getZonesInfo->id;
                                                    if((isset($data[$i]['area']) && (!empty($data[$i]['area']))) && $provinceId && $zoneId){      //Check Area Name Empty or not
                                                        $getAreaInfo=Area::where('name',$data[$i]['area'])->where('zone_id',$zoneId)->where('created_by',$userId)->first();
                                                        if(count($getAreaInfo)==0){
                                                            if((isset($data_array[$i]['parish']) && (!empty($data_array[$i]['parish']))) && (isset($data[$i]['startdate']) && (!empty($data[$i]['startdate'])))){
                                                                $parishCount=$parishCount+1;
                                                            }else{
                                                                $areaCount=$areaCount+1;
                                                            }
                                                        }else{
                                                            $areaId=$getAreaInfo->id;
                                                            if((isset($data[$i]['parish']) && (!empty($data[$i]['parish']))) && $provinceId && $zoneId && $areaId){ 
                                                                $getParishInfo=Parish::where('name',$data[$i]['parish'])->where('area_id',$areaId)->where('created_by',$userId)->first();
                                                                if(count($getParishInfo)==0){
                                                                    $parishCount=$parishCount+1;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }   
                                        }
                                    }
                                }

                                if($parishCount!=0){
                                    $response = [
                                        'status'       => true,
                                        'parishCount'   => $parishCount,
                                        'allData'       => $data_array,
                                        'message'       => '$'.$parishCount." will deduct for parish creation. Do you want to proceed ?"
                                    ];
                                    $responseCode = 200;
                                }else{
                                    if(($zoneCount==0) && ($areaCount==0) && ($provinceCount==0)){
                                        $response = [
                                            'status'       => true,
                                            'message'      =>'Successfully Uploaded csv but no new data to import',
                                        ];
                                        $responseCode = 200;
                                    }else{
                                        $result=$this->parseDataNoCharge($userId,$data_array,$parishCount);
                                        return $result;
                                    }
                                }
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

    public function parseData(Request $request,$userId){
            $getParishcount=0;
        try {
            $getUserInfo=User::where('id',$userId)->first();
            if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){
                $data = $request->data; 
             
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

                                /** charge stripe 1$ for ech parish  **/

                                $key  = \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                                $charge = \Stripe\Charge::create(array(
                                      "amount" => 100,
                                      "currency" => "usd",
                                      "customer" => $getUserInfo->stripe_id,
                                ));
                                
                                if($charge->id){
                                    
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
                                    $parish->start_date=date('Y-m-d',strtotime($data[$i]['startdate']));
                                    $parish->created_by = $userId;
                                    $parish->save();
                                    $getParishcount=$getParishcount+1;
                                    if(isset($parish->id) && (!empty($parish->id )) && $charge->id){
                                        $wem_payment = new WemPayment();
                                        $wem_payment->wem_id = $userId;
                                        $wem_payment->parish_user_id = $parish->id;
                                        $wem_payment->name = 'parish creation';
                                        $wem_payment->stripe_id = $charge->id;
                                        $wem_payment->card_brand = $getUserInfo['card_brand'];
                                        $wem_payment->card_last_four = $getUserInfo['card_last_four'];
                                        $wem_payment->save();
                                    }
                                }else{
                                    $response = [
                                        'status'       => false,
                                        'error'        => "Bad Request",
                                        'error_info'   => 'Permission Denied'
                                    ];
                                    $responseCode = 400;
                                }
                            }
                        }            
                    }
                }
                $response = [
                    'status'       => true,
                    'message'      =>'Successfully Uploaded',
                   
                ];
                $responseCode = 200;
            }else{                                                                               // If the user is not 
                $response = [
                    'status'       => false,
                    'error'        => "Bad Request",
                    'error_info'   => 'Permission Denied'
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
            $error_message = ($exception->getMessage()=='Your card has expired.')?'Your card has expired, Please change your card.':(($exception->getMessage()=='Your card was declined.')?'We processed '.$getParishcount.' records from your file. but you donot have enough balance to upload all record. please recharge your card and upload the same file again.':'Internal server error.');
            $response = [
                'status'        => false,
                'error'         => $error_message,
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } return response()->json($response, $responseCode);

    }

    public function parseDataNoCharge($userId,$data_array,$count){
        $getUserInfo=User::where('id',$userId)->first();
        if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){
            $data =$data_array; 
         
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
                }
            }
            $response = [
                'status'       => true,
                'parishCount'   => $count,
                'message'      =>'Successfully Uploaded.'
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