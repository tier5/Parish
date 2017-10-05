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

            /** Logged in user is Parish */
            if($user_type == 3) {
                $request_month  =   $request->input('report_month');
                $request_year   =   $request->input('report_year');
                $parishInfo = Parish::where('user_id',$user_id)->first();
                $report = Report::whereNull('deleted_at');
                $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                $report = $report->where('parish_id',$parishInfo->id);
                $report = $report->get();
            }
            /** Logged in user is WEM */
            else if($user_type == 1) {
                if($request->has('province_id') || $request->has('zone_id') || $request->has('area_id') || $request->has('parish_id') || $request->has('report_month') || $request->has('report_year') ){

                    $province_id    =   $request->input('province_id');
                    $zone_id        =   $request->input('zone_id');
                    $area_id        =   $request->input('area_id');
                    $request_month  =   $request->input('report_month');
                    $request_year   =   $request->input('report_year');

                    if($request->has('parish_id')){
                        $report = Report::whereNull('deleted_at');
                        $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                        $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                        $report = $report->where('parish_id',$request->input('parish_id'));
                        $report = $report->get();
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
                                    foreach ($areas as  $area) {

                                        array_push($area_array,$area->id);
                                    }
                                    $parishes = Parish::whereIn('area_id',$area_array)->get();
                                } else {
                                   $parishes = []; 
                                }
                            }
                        }

                        $parishArray = array();
                        if($parishes) {
                            foreach($parishes as $parish) {
                                array_push($parishArray, $parish->id);
                            }
                            $report = Report::whereNull('deleted_at');
                            $report = $request->has('request_month') ? $report->where('upload_month', $request_month) : $report;
                            $report = $request->has('request_year') ? $report->where('upload_year', $request_year) : $report;
                            $report = ($parishes) ? $report->whereIn('parish_id',$parishArray) : $report;
                            $report = $report->get();
                        } else {
                            $report = [];
                        }
                    } else {
                        $parishArray = array();
                        $parishes = Parish::where('created_by',$user_id)->get();
                        if($parishes) {
                            foreach($parishes as $parish) {
                                array_push($parishArray, $parish->id);
                            }
                            $report = Report::whereNull('deleted_at');
                            $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                            $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                            $report = ($parishes) ? $report->whereIn('parish_id',$parishArray) : $report;
                            $report = $report->get();
                        } else {
                            $report = [];
                        }
                    }
                } else {
                    $request_month  =   $request->input('report_month');
                    $request_year   =   $request->input('report_year');
                    $parishArray = array();
                        $parishes = Parish::where('created_by',$user_id)->get();
                        if($parishes) {
                            foreach($parishes as $parish) {
                                array_push($parishArray, $parish->id);
                            }
                            $report = Report::whereNull('deleted_at');
                            $report = $request->has('request_month') ? $report->where('upload_month', $request_month) : $report;
                            $report = $request->has('request_year') ? $report->where('upload_year', $request_year) : $report;
                            $report = ($parishes) ? $report->whereIn('parish_id',$parishArray) : $report;
                            $report = $report->get();
                        } else {
                            $report = [];
                        }
                }
            } else {
                /** Logged in user is Paster */
                $province_id    =   $request->input('province_id');
                $zone_id        =   $request->input('zone_id');
                $area_id        =   $request->input('area_id');
                $request_month  =   $request->input('report_month');
                $request_year   =   $request->input('report_year');

                $userDetails =User::find($user_id);
                if($userDetails->pastor_type == 1) {

                   if($request->has('parish_id')) {
                        $report = Report::whereNull('deleted_at');
                        $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                        $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                        $report = $report->where('parish_id',$request->input('parish_id'));
                        $report = $report->get();

                    } else {
                        if ($request->has('area_id')) {
                            $parishList = Parish::where('area_id',$request->input('area_id'))->get();
                            $parishArray = array();
                            foreach($parishList as $parish){
                                array_push($parishArray,$parish->id);
                            }
                        } else if ($request->has('zone_id')) {
                            $areaList = Area::where('zone_id',$request->input('zone_id'))->get();
                            $areaArray = array();
                            $parishArray = array();
                            if($areaList) {
                                foreach($areaList as $area){
                                array_push($areaArray,$area->id);
                                }
                                $parishList = Parish::whereIn('area_id',$areaArray)->get();
                                if($parishList) {
                                    foreach($parishList as $parish){
                                        array_push($parishArray,$parish->id);
                                    }   
                                }
                            }
                        } else {
                            $provinceInfo = Provience::where('user_id',$userDetails->id)->first();
                            $zoneInfo = zone::where('provience_id',$provinceInfo->id)->get();
                            $zoneArray = array();
                            $areaArray = array();
                            $parishArray = array();
                            if($zoneInfo) {
                                foreach($zoneInfo as $zone){
                                    array_push($zoneArray,$zone->id);
                                }
                                if($zoneArray) {
                                    $areaList = Area::whereIn('zone_id',$zoneArray)->get();
                                    if($areaList) {
                                        foreach($areaList as $area){
                                            array_push($areaArray,$area->id);
                                        }
                                        $parishList = Parish::whereIn('area_id',$areaArray)->get();
                                        if($parishList) {
                                            foreach($parishList as $parish){
                                             array_push($parishArray,$parish->id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if($parishArray) {
                            $report = Report::whereNull('deleted_at');
                            $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                            $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                            $report = $report->whereIn('parish_id',$parishArray);
                            $report = $report->get();
                        } else {
                            $report = [];
                        }
                    }
                } else if($userDetails->pastor_type == 2) {
                    if($request->has('parish_id')) {
                        $parishInfo = Parish::find($request->input('parish_id'));
                        $parish_id  = $parishInfo->user_id;

                        $report = Report::whereNull('deleted_at');
                        $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                        $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                        $report = $report->where('parish_id',$request->input('parish_id'));
                        $report = $report->get();
                    } else {
                        $parishArray = array();
                        if($request->has('area_id')){
                            $parishList = Parish::where('area_id',$request->input('area_id'))->get();
                        } else {
                            $zoneInfo = zone::where('user_id',$userDetails->id)->first();
                            $areaList = Area::where('zone_id',$zoneInfo->id)->get();
                            $areaArray = array();
                            $parishArray = array();
                            if($areaList) {
                               foreach($areaList as $area){
                                    array_push($areaArray,$area->id);
                                }
                                $parishList = Parish::whereIn('area_id',$areaArray)->get(); 
                            }
                        }
                        if($parishList) {
                            foreach($parishList as $parish){
                                array_push($parishArray,$parish->id);
                            }
                            $report = Report::whereNull('deleted_at');
                            $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                            $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                            $report = $report->whereIn('parish_id',$parishArray);
                            $report = $report->get();
                        } else {
                            $report = []; 
                        }
                    }
                } else {
                    $areaInfo = Area::where('user_id',$userDetails->id)->first();
                    $parishList = Parish::where('area_id',$areaInfo->id)->get();
                    $parishArray = array();
                    if($parishList) {
                        foreach($parishList as $parish){
                            array_push($parishArray,$parish->id);
                        }
                        $report = Report::whereNull('deleted_at');
                        $report = $request->has('report_month') ? $report->where('report_month', $request_month) : $report;
                        $report = $request->has('report_year') ? $report->where('report_year', $request_year) : $report;
                        $report = $report->whereIn('parish_id',$parishArray);
                        $report = $report->get();
                    } else {
                        $report = [];
                    }
                }
            }
            $noOfReport = count($report);
            if($noOfReport > 0){
                $reportArray = [];
                foreach ($report as $key => $reportKey) {
                        $parishDetails = Parish::find($reportKey->parish_id);
                        $reportArray[$key]['id']                     = $reportKey->id;
                        $reportArray[$key]['progress_report']        = $reportKey->progress_report;
                        $reportArray[$key]['report_month']           = $reportKey->report_month;
                        $reportArray[$key]['report_year']            = $reportKey->report_year;
                        $reportArray[$key]['created_at']             = $reportKey->created_at;
                        $reportArray[$key]['parish_id']              = $parishDetails->id;
                        $reportArray[$key]['parish_name']            = $parishDetails->name;
                        $reportArray[$key]['province_name']          = $parishDetails->areas->zones->proviences->name;
                        $reportArray[$key]['zone_name']              = $parishDetails->areas->zones->name;
                        $reportArray[$key]['area_name']              = $parishDetails->areas->name;
                        $reportArray[$key]['province_id']            = $parishDetails->areas->zones->proviences->id;
                        $reportArray[$key]['zone_id']                = $parishDetails->areas->zones->id;
                        $reportArray[$key]['area_id']                = $parishDetails->areas->id;
                        $reportArray[$key]['first_name']             = $parishDetails->users->first_name;
                        $reportArray[$key]['last_name']              = $parishDetails->users->last_name;
                }
                $response = [
                    'status'        => true,
                    'message'       => "Report fetched successfully.",
                    'report'        => $reportArray
                ];
            } else {
                $response = [
                    'status'        => true,
                    'message'       => "No Report Found.",
                    'report'        => $report
                ];
            }
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