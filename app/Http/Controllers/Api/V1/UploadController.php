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
                    $allowedExts        = array('csv','CSV');                                   //Store Allowable extentions for upload in array
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
                                                if((isset($data_array[$i]['zone']) && (!empty($data_array[$i]['zone'])))){
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
                                $response = [
                                    'provinceCount' => $provinceCount,
                                    'parishCount'   => $parishCount,
                                    'areaCount'     => $areaCount,
                                    'zoneCount'     => $zoneCount,
                                    'allData'       => $data_array,
                                ];
                                $responseCode = 200;
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

    public function parseData(Request $request, $userId){
       /* $getUserInfo=User::where('id',$userId)->first();
        if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){
            $data = $request->data(); //Convert to array
            for($i=0; $i<count($data); $i++){ //Start Inserting Data into "export_addresses" table
                if((isset($data[$i]['firstname']) && (!empty($data[$i]['firstname']))) && (isset($data[$i]['lastname'])) && (!empty($data[$i]['lastname']))&& (isset($data[$i]['province'])) && (!empty($data[$i]['province']))){ // Check If First Name Last Name Province Exist Or not
                    if((isset($data[$i]['parish']) && (!empty($data[$i]['parish'])))){      //Check Parish Name Empty or not
                        if((isset($data[$i]['area']) && (!empty($data[$i]['area'])))){      //Check Area Name Empty or not
                            if((isset($data[$i]['zone']) && (!empty($data[$i]['zone'])))){  //Check Zone Name Empty or not
                                $getProvinceInfo=Provience::where('name',$data[$i]['province'])->where('created_by',$userId)->first();
                                if(count($getProvinceInfo) >0){                             //If Province is already present in DB
                                    $provinceId=$getProvinceInfo->id;                       //@Store "provinceId" 
                                    $getZonesInfo=Zone::where('name',$data[$i]['zone'])->where('provience_id',$provinceId)->where('created_by',$userId)->first();
                                    if(count($getZonesInfo) >0){
                                        $zoneId=$getZonesInfo->id;
                                        $getAreaInfo=Area::where('name',$data[$i]['area'])->where('zone_id',$zoneId)->where('created_by',$userId)->first();
                                        if(count($getAreaInfo) >0){
                                            $areaId=$getAreaInfo->id;
                                        }else{
                                            $this->randomUsername = Helpers::generateNumber();
                                            $this->randomPassword = Helpers::generateNumber();

                                            $createNewUser = new User();   
                                            $createNewUser->parish_id = $this->randomUsername;
                                            $createNewUser->first_name ='';
                                            $createNewUser->last_name ='';
                                            $createNewUser->user_type =2;
                                            $createNewUser->pastor_type=3;
                                            $createNewUser->user_status=1;
                                            $createNewUser->email=null;
                                            $createNewUser->password=$this->randomPassword;
                                            $createNewUser->uniqueKey=$this->randomPassword;
                                            $createNewUser->save();

                                            $newAreaId=$createNewUser->id;
                                            
                                            $Area = new Area();
                                            $Area->name = $data[$i]['zone'];
                                            $Area->user_id = $newAreaId;
                                            $Area->zone_id = $zoneId;
                                            $Area->created_by = $userId;
                                            $Area->save();

                                            $areaId=$newAreaId;
                                        }
                                    }else{

                                    }
                                }else{
                                    $this->randomUsername = Helpers::generateNumber();
                                    $this->randomPassword = Helpers::generateNumber();

                                    $createNewUser = new User();   
                                    $createNewUser->parish_id = $this->randomUsername;
                                    $createNewUser->first_name ='';
                                    $createNewUser->last_name ='';
                                    $createNewUser->user_type =2;
                                    $createNewUser->pastor_type=1;
                                    $createNewUser->user_status=1;
                                    $createNewUser->email=null;
                                    $createNewUser->password=$this->randomPassword;
                                    $createNewUser->uniqueKey=$this->randomPassword;
                                    $createNewUser->save();

                                    $newProvinceId=$createNewUser->id;

                                }
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
                                $parish->area_id = $areaId;
                                $parish->name = $data[$i]['parish'];
                                
                                $parish->user_id    = $newParisId;
                                $parish->created_by = $userId;
                                $parish->save();
                            }
                        }
                    }else{
                        if((isset($data[$i]['area']) && (!empty($data[$i]['area'])))){
                            if((isset($data[$i]['zone']) && (!empty($data[$i]['zone'])))){
                                $areaCount=$areaCount+1;
                            }
                        }else{
                            if((isset($data[$i]['zone']) && (!empty($data[$i]['zone'])))){
                                $zoneCount=$zoneCount+1;
                            }else{
                                $provinceCount=$provinceCount+1;
                            }
                        }
                    }              
                }
            }
        }else{                                                                               // If the user is not WEM 
            $response = [
                'status'       => false,
                'error'        => "Bad Request",
                'error_info'   => 'Permission Denied'
            ];
            $responseCode = 400;
        }
        return response()->json($response, $responseCode);*/
    }

   
}