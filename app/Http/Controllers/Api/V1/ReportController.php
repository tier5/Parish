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
            
            $parish         = Parish::find($parish_id);
            
            $fetchAllreport = Report::where('parish_id', $parish_id)
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

                for($i= 1; $i<7; $i++)
                {
                    $days[$i]['date'] ='';
                    $days[$i]['day'] ='';
                    $days[$i]['programmes'] ='';
                    $days[$i]['attendance'] =$attendance;
                    $days[$i]['monetary'] =$monetary;
                }
                

                $report["account_name"] =$parish->name;
                $report["parish_id"] = $parish_id;
                $report["parish_pastor"] = $parish->users->first_name." ".$parish->users->last_name;
                $report["area_pastor"] = $parish->areas->users->first_name." ".$parish->areas->users->last_name;
                $report["zonal_pastor"] =$parish->areas->zones->users->first_name." ".$parish->areas->zones->users->last_name;
                $report["province_pastor"] =$parish->areas->zones->proviences->users->first_name." ".$parish->areas->zones->proviences->users->last_name;
                $report["month"] =$report_month;
                $report["year"] =$report_year;
                $report['monthly_total'] = $monthly_total;


            }

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

 }