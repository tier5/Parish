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
     * Upload Csv For 
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function uploadCsv(Request $request, $userId) {
        $getUserInfo=User::where('id',$userId)->first(); 
        if((isset($getUserInfo)) && ($getUserInfo->user_type==1)){                                                            // If the user is WEM 
                if ($request->hasFile('file')) {                                                //If Any File Exists
                    $allowedExts        = array('csv','CSV');                                   //Store Allowable extentions for upload in array
                    $getFileExtension   = $request->file('file')->getClientOriginalExtension(); //Get extention for uploaded file
                    if(in_array($getFileExtension, $allowedExts)) {                             //If extention is allowed
                        $getFileSize    = $request->file('file')->getClientSize();              //Get size for uploaded file
                        if($getFileSize > 2000000000000) {                                           //If file size cross the allowable size limit
                            $response = [
                                'status' => false,
                                'error'        => "Bad Request",
                                'error_info' => 'File size should be less than or equal 200MB !',
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

                            if ((in_array("Firstname",  $headerValues)) || (in_array("Lastname",  $headerValues)) || (in_array("Password",  $headerValues)) || (in_array("Province",  $headerValues)) ){ //If Header are present properly
                                $data = Excel::load(public_path() . "/files/".$newFilenameWithExtention)->get();  //Store All Data From The CSV File
                                $data_array = $data->toArray(); //Convert to array
                                
                                $response = [
                                    'status' => true,
                                    'password' => $data_array,
                                    'message' => "All Data."
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

   
}