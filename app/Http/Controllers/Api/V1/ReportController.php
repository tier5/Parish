<?php
/**
* PaymentController to get list of payment, submit payment, reject payment.
* @param Request $request
*/
namespace App\Http\Controllers\Api\V1;

use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Models\Parish;
use App\Models\provience;
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

class ReportController extends Controller {

    /**
     * @var null|string
     */

    private $userId = null;

    /**
     * @var null|string
     */
    
    
    /**
     * Create a new Parish with Poster
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

                $report->parish_id = $request->input('user_id');
            else
                throw new HttpBadRequestException("User Id is required.");

            if ($request->has('progress_report'))

                $report->progress_report = $request->input('progress_report');
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
            

            $report->save();

            
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

                $parish_id      = $request->input('user_id');
            else
                throw new HttpBadRequestException("User Id is required.");

            if ($request->has('report_month'))

                $report_month   = $request->input('report_month');
            else
                throw new HttpBadRequestException("Month is required.");

            if ($request->has('report_year'))

                $report_year    = $request->input('report_year');
            else
                throw new HttpBadRequestException("Year is required.");
            
            $parish             = Parish::where('user_id',$parish_id)->first();

            if($parish) {
                $fetchAllreport     = Report::where('parish_id', $parish->id)
                                    ->where('report_month', $report_month)
                                    ->where('report_year', $report_year)
                                    ->first();

                if($fetchAllreport) {
                    $report         = $fetchAllreport->progress_report;
                } else {
                    
                    $attendance['men']              = null;
                    $attendance['women']            = null;
                    $attendance['children']         = null;
                    $attendance['total']            = null;

                    $monetary['offering']           = null;
                    $monetary['title']              = ['pastor'=>null,"general"=> null];
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
                        
                        $days                       =   $this->getWeekDates($date, $start_date, $end_date,$attendance,$monetary);
                        $week_total['attendance']   =   $attendance;
                        $week_total['monetary']     =   $monetary;
                        $setday['days']             =   $days;

                        array_push($week,$week_total);
                        array_push($week,$setday);
                    }

                    $report["parish_id"]        = $parish_id;
                    $report["parish_pastor"]    = $parish->users->first_name." ".$parish->users->last_name;
                    $report["area_pastor"]      = $parish->areas->users->first_name." ".$parish->areas->users->last_name;
                    $report["zonal_pastor"]     = $parish->areas->zones->users->first_name." ".$parish->areas->zones->users->last_name;
                    $report["province_pastor"]  = $parish->areas->zones->proviences->users->first_name." ".$parish->areas->zones->proviences->users->last_name;
                    $report["month"]            = $report_month;
                    $report["year"]             = $report_year;
                    $report["crucial_date"]     = null;
                    $report['report']           = ['monthly_total'=>$monthly_total,'weekly'=>$week];
                }

                $response = [
                    'status'        => true,
                    'progress_report' => $report,
                    'message'       => "Report fetched successfully."
                ];
                $responseCode = 201;
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

 }