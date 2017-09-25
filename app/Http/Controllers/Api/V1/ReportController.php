<?php
/**
* Report Controller to get list of payment, submit payment, reject payment.
* @param Request $request
*/
namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Models\Parish;
use App\Models\Provience;
use App\Models\Zone;
use App\Models\Area;
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
use DateTime;
use DateInterval;
use DatePeriod;
use SoftDeletes;

class ReportController extends Controller {

    /**
     * @var null|string
     */

    private $userId = null;

    /**
     * @var null|string
     */
    
    
    /**
     * Create a new Report with Parish
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createReport(Request $request) {
        try {

            DB::beginTransaction();

            $report = new Report();

            $user   = new User();

            /*
             * Validate mandatory fields
             */

            if ($request->has('user_id'))

                $parish_id = $request->input('user_id');
            else
                throw new HttpBadRequestException("User Id is required.");

            if ($request->has('progress_report'))

                //$report->progress_report = $request->input('progress_report');
                $report->progress_report = json_encode($request->input('progress_report'));
            else
                throw new HttpBadRequestException("Progress report is required.");

            if ($request->has('report_month'))

                $report->report_month = $request->input('report_month');
            else
                throw new HttpBadRequestException("Month is required.");

            if ($request->has('report_year'))

                $report->report_year = $request->input('report_year');
            else
                throw new HttpBadRequestException("Year is required.");
            
            $parish                 = Parish::where('user_id',$parish_id)->whereNull('deleted_at')->first();

            if($parish) {
                /*$checkIfexists      = Report:: where('parish_id',$parish->id)
                                            -> where('report_month', $request->input('report_month'))
                                            -> where('report_year', $request->input('report_year'))
                                            -> count();*/
                /*if($checkIfexists > 0) {
                    throw new HttpBadRequestException("Report already exists.");
                } else {
                    $report->parish_id  = $parish->id;
                    $report->save(); 
                }        */               
                
                $report->parish_id  = $parish->id;
                $report->save(); 
            } else {
                throw new HttpBadRequestException("Parish not found.");
            }
            
            $response = [
                'status'        => true,
                'message'       => "Report created successfully."
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

            unset($user);
            unset($provience);
        }

        return response()->json($response, $responseCode);
    }

    public function getReport( Request $request) {

        try {

            DB::beginTransaction();
            
            /*
             * Validate mandatory fields
             */
            
            if ($request->has('user_id'))
                $parish_id = $request->input('user_id');
            else
                throw new HttpBadRequestException("User Id is required.");

            if ($request->has('report_month'))
                $report_month = $request->input('report_month');
            else
                throw new HttpBadRequestException("Month is required.");

            if ($request->has('report_year'))
                $report_year = $request->input('report_year');
            else
                throw new HttpBadRequestException("Year is required.");
            
            $parish = Parish::where('user_id',$parish_id)->whereNull('deleted_at')->first();

            if($parish) {
                $fetchAllreport = Report::where('parish_id', $parish->id)
                    ->where('report_month', $report_month)
                    ->where('report_year', $report_year)
                    ->whereNull('deleted_at')
                    ->get();
                $report = [];
                if(count($fetchAllreport) > 0) {
                    foreach($fetchAllreport as $key=>$reports){
                        $progress_report['id']              = $reports->id;
                        $progress_report['parish_id']       = $reports->parish_id;
                        $progress_report['report_month']    = $reports->report_month;
                        $progress_report['report_year']     = $reports->report_year;
                        $progress_report['progress_report'] =json_decode($reports->progress_report);
                        array_push($report,$progress_report);
                    }
                    
                    $attendance['men']              = null;
                    $attendance['women']            = null;
                    $attendance['children']         = null;
                    $attendance['total']            = null;

                    $monetary['offering']           = null;
                    $monetary['tithe']              = ['pastor'=>null,"general"=> null];
                    $monetary['f_fruit']            = null;
                    $monetary['t_giving']           = null;
                    $monetary['total']              = null;

                    $monthly_total['attendance']    = $attendance;
                    $monthly_total['monetary']      = $monetary;
                    
                    $start_date     = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-01'));
                    $lastday        = date('t',strtotime($start_date));
                    $end_date       = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-'.$lastday));
                    $end_date1      = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-'.$lastday.' + 6 days'));
                    
                    $week = [];

                    for($date = $start_date; $date < $end_date1; $date = date('Y-m-d', strtotime($date. ' + 7 days'))) {
                        
                        $days                           =   $this->getWeekDates($date, $start_date, $end_date,$attendance,$monetary);
                        $week_total ['attendance']      =   $attendance;
                        $week_total ['monetary']        =   $monetary;
                        $set_week   ['days']            =   $days;
                        $set_week   ['weekly_total']    =   $week_total;
                        if($days) {
                            array_push($week,$set_week);
                        }
                        
                    }
                    $report_set['wem_percentage']   = 10;
                    $report_set["parish_id"]        = $parish->id;
                    $report_set["parish_pastor"]    = $parish->users->first_name." ".$parish->users->last_name;
                    $report_set["area_pastor"]      = $parish->areas->users->first_name." ".$parish->areas->users->last_name;
                    $report_set["zonal_pastor"]     = $parish->areas->zones->users->first_name." ".$parish->areas->zones->users->last_name;
                    $report_set["province_pastor"]  = $parish->areas->zones->proviences->users->first_name." ".$parish->areas->zones->proviences->users->last_name;
                    $report_set["month"]            =date('F', strtotime($report_year.'-'.$report_month.'-01'));
                    $report_set["year"]             = $report_year;
                    $report_set["crucial_date"]     = "";
                    $report_set['report']           = ['monthly_total'=>$monthly_total,'weekly'=>$week];
                    
                    $progress_report['id']              = null;
                    $progress_report['parish_id']       = $parish_id;
                    $progress_report['report_month']    = $report_month;
                    $progress_report['report_year']     = $report_year;
                    $progress_report['progress_report'] = $report_set;

                    array_push($report,$progress_report);
                    $response = [
                        'status'            => true,
                        'progress_report'   => $report,
                        'message'           => "Report fetched successfully."
                    ];
                    $responseCode = 201;
                } else {
                    $attendance['men']              = null;
                    $attendance['women']            = null;
                    $attendance['children']         = null;
                    $attendance['total']            = null;

                    $monetary['offering']           = null;
                    $monetary['tithe']              = ['pastor'=>null,"general"=> null];
                    $monetary['f_fruit']            = null;
                    $monetary['t_giving']           = null;
                    $monetary['total']              = null;

                    $monthly_total['attendance']    = $attendance;
                    $monthly_total['monetary']      = $monetary;
                    
                    $start_date     = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-01'));
                    $lastday        = date('t',strtotime($start_date));
                    $end_date       = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-'.$lastday));
                    $end_date1      = date('Y-m-d', strtotime($report_year.'-'.$report_month.'-'.$lastday.' + 6 days'));
                    
                    $week = [];

                    for($date = $start_date; $date < $end_date1; $date = date('Y-m-d', strtotime($date. ' + 7 days'))) {
                        
                        $days                           =   $this->getWeekDates($date, $start_date, $end_date,$attendance,$monetary);
                        $week_total ['attendance']      =   $attendance;
                        $week_total ['monetary']        =   $monetary;
                        $set_week   ['days']            =   $days;
                        $set_week   ['weekly_total']    =   $week_total;
                        if($days) {
                            array_push($week,$set_week);
                        }
                        
                    }
                    $report_set['wem_percentage']   = 10;
                    $report_set["parish_id"]        = $parish->id;
                    $report_set["parish_pastor"]    = $parish->users->first_name." ".$parish->users->last_name;
                    $report_set["area_pastor"]      = $parish->areas->users->first_name." ".$parish->areas->users->last_name;
                    $report_set["zonal_pastor"]     = $parish->areas->zones->users->first_name." ".$parish->areas->zones->users->last_name;
                    $report_set["province_pastor"]  = $parish->areas->zones->proviences->users->first_name." ".$parish->areas->zones->proviences->users->last_name;
                    $report_set["month"]            = date('F', strtotime($report_year.'-'.$report_month.'-01'));
                    $report_set["year"]             = $report_year;
                    $report_set["crucial_date"]     = "";
                    $report_set['report']           = ['monthly_total'=>$monthly_total,'weekly'=>$week];
                    
                    $progress_report['id']              = null;
                    $progress_report['parish_id']       = $parish_id;
                    $progress_report['report_month']    = $report_month;
                    $progress_report['report_year']     = $report_year;
                    $progress_report['progress_report'] = $report_set;

                    array_push($report,$progress_report);
                    $response = [
                        'status'            => true,
                        'progress_report'   => $report,
                        'message'           => "Report fetched successfully."
                    ];
                    $responseCode = 201;
                }
            } else {
               throw new HttpBadRequestException("Parish not found.");
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

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($provience);
        }
        return response()->json($response, $responseCode);
    }

    /** Function to get no of week within a week for specified month and year **/

    function getWeekDates($date, $start_date, $end_date,$attendance,$monetary){

        $week   =  date('W', strtotime($date));
        $year   =  date('Y', strtotime($date));
        $from   = date("Y-m-d", strtotime("{$year}-W{$week}+1")); //Returns the date of monday in week
        if($from < $start_date) 

            $from = $start_date;
            $to = date("Y-m-d", strtotime("{$year}-W{$week}-6"));   //Returns the date of sunday in week
        
        if($to > $end_date) 
            $to     = $end_date;
            $period = new DatePeriod(new DateTime($from), new DateInterval('P1D'), new DateTime($to .'  +1 day'));
            $days   = [];

        foreach ($period as $date) {

            $day['date']        = $date->format("d-m-Y");
            $day['day']         = date('l', strtotime($date->format("d-m-Y")));
            $day['programmes']  = null;
            $day['attendance']  = $attendance;
            $day['monetary']    = $monetary;
            array_push($days,$day);
        }
        return $days;
    } 

    /**
     * Delete an existing Report
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteReport($report_id) {

        try {
            DB::beginTransaction();

            $report = Report::findOrFail($report_id)->delete();

            if($report)
            {

            $response = [
                'status'    => true,
                'message'   => "Report deleted successfully."
                ];
                $responseCode = 200;
            }
            else
            {

               $response = [
                'status'    => true,
                'message'   => "No Report has been found."
                ];
                $responseCode = 404;  
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

            $response = [
                'status'        => false,
                'error'         => "Internal server error.",
                'error_info'    => $exception->getMessage()
            ];

            $responseCode = 500;
        } finally {
            DB::commit();

            unset($user);
            unset($area);
        }

        return response()->json($response, $responseCode);
    }

    /**
     * Update Report depend on report id, month , year, and parish id
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateReport(Request $request, $report_id) {
        try {

            DB::beginTransaction();
            
             /*
             * Validate mandatory fields
             */
            if ($report_id)

                $report = Report::find($report_id);
            else
                throw new HttpBadRequestException("Report Id is required."); 

            if ($request->has('progress_report'))

                $progress_report = json_encode($request->input('progress_report'));
            else
                throw new HttpBadRequestException("Progress report is required.");

                if($report) {
                    $report->progress_report    = $progress_report;
                    $report->save();
                } else {
                   throw new HttpBadRequestException("Report not found."); 
                }

            
            $response = [
                'status'        => true,
                'message'       => "Report updated successfully."
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

            unset($user);
            unset($provience);
        }

        return response()->json($response, $responseCode);
    } 

    /**
     * Filter Report depend on report id, month , year, and parish id
     *
     * @param Request $request
     * @param $listId
     * @return \Illuminate\Http\JsonResponse
     */

    public function filteReport(Request $request,$user_id,$user_type) {
        try {

            DB::beginTransaction();
            if($user_type == 1){
                $request_month  = $request->input('report_month');
                $request_year   = $request->input('report_year');
                $parish_id      = $request->input('parish_id');
                if($request_month && $request_year && $parish_id) {
                    $report = Report::where('parish_id',$parish_id)
                                    ->where('report_month',$request_month)
                                    ->where('report_year',$request_year)
                                    ->get();
                } else if($request_month && $request_year && !$parish_id) {
                    $report = Report::where('parish_id',$parish_id)
                                    ->where('report_month',$request_month)
                                    ->where('report_year',$request_year)
                                    ->get();
                } else if($request_month && $parish_id && !$request_year) {
                    $report = Report::where('parish_id',$parish_id)
                                    ->where('report_month',$request_month)
                                    ->get();
                }else if($request_year && $parish_id && !$request_month) {
                    $report = Report::where('parish_id',$parish_id)
                                    ->where('report_year',$request_year)
                                    ->get();
                } else if(!$request_month && !$request_year && $parish_id){
                    $report = Report::where('parish_id',$parish_id)->get();
                } else {
                    $parish_all = Parish::where('created_by',$user_id)->get();
                    $parishArray = array();
                        foreach($parish_all as $parish) {
                            array_push($parishArray,$parish->id);
                        }
                    $report = Report::whereIn('parish_id',$parishArray)->get();
                }
            } else if($user_type == 2){
                $user = User::find($user_id);
                if($user->pastor_type == 1){
                    $provinceInfo   = provience::where('user_id',$user_id)->first();
                    $zoneInfo       = zone::where('provience_id',$provinceInfo->id)->get();
                    $zoneArray      = array();
                    foreach($zoneInfo as $zone){
                        array_push($zoneArray,$zone->id);
                    }
                    $areaList   = Area::whereIn('zone_id',$zoneArray)->get();
                    $areaArray  = array();
                    foreach($areaList as $area){
                        array_push($areaArray,$area->id);
                    }
                    $parishList     = Parish::whereIn('area_id',$areaArray)->get();
                    $parishArray    = array();
                    foreach($parishList as $parish){
                        array_push($parishArray,$parish->id);
                    }
                    $report = Report::whereIn('parish_id',$parishArray)->get();
                } else if($user->pastor_type == 2){
                    $zoneInfo   = zone::where('user_id',$user->id)->first();
                    $areaList   = Area::where('zone_id',$zoneInfo->id)->get();
                    $areaArray  = array();
                    foreach($areaList as $area){
                        array_push($areaArray,$area->id);
                    }
                    $parishList     = Parish::whereIn('area_id',$areaArray)->get();
                    $parishArray    = array();
                    foreach($parishList as $parish){
                        array_push($parishArray,$parish->id);
                    }
                    $report         = Report::whereIn('parish_id',$parishArray)->get();
                } else {
                    $areaInfo       = Area::where('user_id',$user->id)->first();
                    $parishList     = Parish::where('area_id',$areaInfo->id)->get();
                    $parishArray    = array();
                    foreach($parishList as $parish){
                        array_push($parishArray,$parish->id);
                    }
                    $report = Report::whereIn('created_by',$parishArray)->get();
                }
            } else {
                $parish_id      = Parish::where('user_id',$user_id)->first();
                $request_month  = $request->input('report_month');
                $request_year   = $request->input('report_year');
                
                if($request_month && $request_year) {
                    $report     = Report::where('parish_id',$parish_id->id)
                                        ->where('report_year',$request_year)
                                        ->where('report_month',$request_month)
                                        ->get(); 
                } else if (!$request_month && $request_year) {
                   $report     = Report::where('parish_id',$parish_id->id)
                                        ->where('report_year',$request_year)
                                        ->get(); 
                } else if ($request_month && !$request_year) {
                     $report     = Report::where('parish_id',$parish_id->id)
                                        ->where('report_month',$request_month)
                                        ->get(); 
                } else {
                    $report     = Report::where('parish_id',$parish_id->id)->get();   
                }
            }
            $response = [
                'status'        => true,
                'message'       => "Report fetched successfully.",
                'report'        => $report
            ];
            $responseCode = 201;
        }catch (HttpBadRequestException $httpBadRequestException) {
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
        }
        return response()->json($response, $responseCode);
    }

    /**
     * information of specific report
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function viewReport(Request $request,$report_id) {
        try {

            DB::beginTransaction();
            $report = Report::find($report_id);

            if($report){
                $progress_report = array();
                $progress_report['id']              = $report->id;
                $progress_report['parish_id']       = $report->parish_id;
                $progress_report['report_month']    = $report->report_month;
                $progress_report['report_year']     = $report->report_year;
                $progress_report['progress_report'] =json_decode($report->progress_report);
                $response = [
                    'status'        => true,
                    'message'       => "Report fetched successfully.",
                    'report'        => $progress_report
                ];
                $responseCode = 201; 
            } else {

                $response = [
                    'status'        => false,
                    'error'       => "Report not found.",
                ];
                $responseCode = 400;  
            }
            
        }catch (HttpBadRequestException $httpBadRequestException) {
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
        }
        return response()->json($response, $responseCode);
    }
 }