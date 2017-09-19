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
            
            $parish         = Parish::where('user_id',$parish_id)->first();
            
            $fetchAllreport = Report::where('parish_id', $parish->id)
                                    ->where('report_month', $report_month)
                                    ->where('report_year', $report_year)
                                    ->first();

            if($fetchAllreport){

                $report = $fetchAllreport->progress_report;

            } else {
                
                $no_week = $this->weeks_in_month($report_month,$report_year);

                $attendance['men'] = null;
                $attendance['women'] = null;
                $attendance['children'] = null;
                $attendance['total'] = null;

                $monetary['offering'] =null;
                $monetary['title'] =['pastor'=>null,"general"=> null];
                $monetary['f_fruit'] =null;
                $monetary['t_giving'] =null;
                $monetary['total'] =null;

                $monthly_total['attendance'] =$attendance;
                $monthly_total['monetary'] =$monetary;

                $days = [];
                for($i= 1; $i<=7; $i++){

                   $day['date'] = null;
                   $day['day'] = null;
                   $day['programmes'] = null;
                   $day['attendance'] = $attendance;
                   $day['monetary'] = $monetary;

                   array_push($days,$day);
                }

                $week = [];
                for($k =1; $k<$no_week; $k++) {

                    $week_total['attendance'] = $attendance;
                    $week_total['monetary'] = $monetary;
                    $setday['days'] = $days;
                    array_push($week,$week_total);
                    array_push($week,$setday);
                }
                
               /* $res = $this->getWeekDays($report_month,$report_year);
                
                $o = '<table border="1">';
                $o.= '<tr><th>Week</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr>';
                foreach ($res as $week => $dates) {
                    $firstD = $dates[0];
                    $lastD = $dates[count($dates)-1];

                    $o.= "<tr>";
                    $o.= "<td>" . $firstD->format('M d') . ' - ' . $lastD->format('M d') . "</td>";
                    $N = $firstD->format('N');
                    for ($i = 1; $i < $N; $i++) {
                        $o.= "<td>-</td>";
                    }
                    foreach ($dates as $d) {
                        $o.= "<td>" . $d->format('d.') . " / 0.00</td>";
                            # for selected date do you magic
                    }
                    $N = $lastD->format('N');
                    for ($i = $N; $i < 7; $i++) {
                        $o.= "<td>-</td>";
                    }
                    $o.= "</tr>";
                }
                $o.= '</table>';
                echo $o;
                
                dd('test');*/
                $report["account_name"] =$parish->name;
                $report["parish_id"] = $parish_id;
                $report["parish_pastor"] = $parish->users->first_name." ".$parish->users->last_name;
                $report["area_pastor"] = $parish->areas->users->first_name." ".$parish->areas->users->last_name;
                $report["zonal_pastor"] =$parish->areas->zones->users->first_name." ".$parish->areas->zones->users->last_name;
                $report["province_pastor"] =$parish->areas->zones->proviences->users->first_name." ".$parish->areas->zones->proviences->users->last_name;
                $report["month"] =$report_month;
                $report["year"] =$report_year;
                $report["crucial_date"] =null;
                $report['monthly_total'] = $monthly_total;
                $report['weekly'] = $week;
            }


            /*$signupdate='2017-09-01';
            $signupweek=date("W",strtotime($signupdate));
            $year=date("Y",strtotime($signupdate));
            $currentweek = date("W");

            for($i=$signupweek;$i<=$currentweek;$i++) {
                $result=$this->getWeek($i,$year);
                echo "Week:".$i." Start date:".$result['start']." End date:".$result['end']."<br>";
            }

            dd($no_week);*/

            $response = [
            'status'        => true,
            'progress_report' => $report,
            'message'       => "Report fetched successfully."
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

    /** Function to get no of week within a week for specified month and year **/
    function weeks_in_month($month, $year) {

         // Start of month
         $start = mktime(0, 0, 0, $month, 1, $year);
         // End of month
         $end = mktime(0, 0, 0, $month, date('t', $start), $year);
         // Start week
         $start_week = date('W', $start);
         // End week
         $end_week = date('W', $end);
 
         if ($end_week < $start_week) { // Month wraps
           return ((52 + $end_week) - $start_week) + 1;
         }
        return ($end_week - $start_week) + 1;
    }

    function getWeek($week, $year) {
      $dto = new DateTime();
      $result['start'] = $dto->setISODate($year, $week, 0)->format('Y-m-d');
      $result['end'] = $dto->setISODate($year, $week, 6)->format('Y-m-d');
      return $result;
    }

    function getWeekDays($month, $year)
    {
        $p = new DatePeriod(
            DateTime::createFromFormat('!Y-n-d', "$year-$month-01"),
            new DateInterval('P1D'),
            DateTime::createFromFormat('!Y-n-d', "$year-$month-01")->add(new DateInterval('P1M'))
        );

        $datesByWeek = array();
        //dd($p);
        foreach ($p as $d) {
            
            $dateByWeek[ $d->format('W') ][] = $d;
        }
        return $dateByWeek;
    }

 }