<?php

use Illuminate\Http\Request;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Routes group for API Version 1
 */
Route::group(['prefix' => 'v1'], function() {
    /**
     * Routes for unauthenticated user
     */
    Route::post('sign-up', [
        'uses' => 'Api\V1\AuthController@signUp',
        'as' => 'api.v1.signUp.post'
    ]);
    Route::post('sign-in', [
        'uses' => 'Api\V1\AuthController@signIn',
        'as' => 'api.v1.signIn.post'
    ]);
    Route::post('sign-out', [
       'uses' => 'Api\V1\AuthController@signOut',
        'as' => 'api.v1.signOut.post'
    ]);
    Route::post('forgot-password', [
       'uses' => 'Api\V1\AuthController@forgetPassword',
        'as' => 'api.v1.forgetPassword.post'
    ]);

    Route::post('reset-password', [
        'uses' => 'Api\V1\AuthController@resetPassword',
        'as' => 'api.v1.resetPassword.post'
    ]);

    Route::get('list-plan', [
        'uses' => 'Api\V1\AuthController@listPlan',
        'as' => 'api.v1.listPlan.get'
    ]);
    
    Route::post('validate-email',[
        'uses' => 'Api\V1\AuthController@validationEmail',
        'as'   => 'api.v1.validationEmail.post'
    ]);


    /**
     * Route for Authenticated user
     */
    Route::group(['middleware' => ['jwt.auth']], function() {
        // TODO: every logged in user route will be here & remove this comments
    });

    /*
     * Routes group for authenticate user
     */

    Route::group(['middleware' => ['jwt.auth']], function () {

    /*
     * Province Group Operation
     */

        Route::group(['prefix' => 'province'], function () {

            Route::post('/create', [
                'uses' => 'Api\V1\ProvienceController@createProvience',
                'as' => 'api.v1.createProvience.post'
            ]);

            Route::get('/{user_id}', [
                'uses' => 'Api\V1\ProvienceController@getProvinceList',
                'as' => 'api.v1.getProvinceList.get'
            ]);

            Route::get('/show-detail/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@getProvinceDetail',
                'as' => 'api.v1.getProvinceDetail.get'
            ]);            
            Route::put('/edit/{user_id}/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@updateProvience',
                'as' => 'api.v1.updateProvience.put'
            ]);
            Route::patch('/edit/{user_id}/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@updateProvience',
                'as' => 'api.v1.updateProvience.patch'
            ]);

            Route::delete('/delete/{user_id}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@deleteProvience',
                'as' => 'api.v1.deleteProvience.delete'
            ]);

        });

    /*
     * Zone Group Operation
     */
        Route::group(['prefix' => 'zone'], function () {

            Route::post('/create', [
                'uses' => 'Api\V1\ZoneController@createZone',
                'as' => 'api.v1.createZone.post'
            ]);

            Route::get('/show-detail/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@getZoneDetail',
                'as' => 'api.v1.ZoneController.get'
            ]);

            Route::get('/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ZoneController@getZoneList',
                'as' => 'api.v1.getZoneList.get'
            ]);
            
            Route::get('/{created_by}', [
                'uses' => 'Api\V1\ZoneController@getAllZone',
                'as' => 'api.v1.getAllZone.get'
            ]);

            Route::put('/edit/{user_id}/{created_by}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@updateZone',
                'as' => 'api.v1.updateZone.put'
            ]);
            Route::patch('/edit/{user_id}/{created_by}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@updateZone',
                'as' => 'api.v1.updateZone.patch'
            ]);

            Route::delete('/delete/{user_id}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@deleteZone',
                'as' => 'api.v1.deleteZone.delete'
            ]);

            Route::post('/filter-zone', [
                'uses' => 'Api\V1\ZoneController@filterZone',
                'as' => 'api.v1.filterZone.post'
            ]);

        });

    /*
     * Province Area Operation
     */
        Route::group(['prefix' => 'area'], function () {

            Route::post('/create', [
                'uses' => 'Api\V1\AreaController@createArea',
                'as' => 'api.v1.createArea.post'
            ]);

            Route::get('/show-detail/{area_id}', [
                'uses' => 'Api\V1\AreaController@getAreaDetail',
                'as' => 'api.v1.getAreaDetail.get'
            ]);

            Route::get('/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@getAreaList',
                'as' => 'api.v1.getAreaList.get'
            ]);

            Route::get('/{created_by}', [
                'uses' => 'Api\V1\AreaController@getAllArea',
                'as' => 'api.v1.getAllArea.get'
            ]);
            
            Route::put('/edit/{user_id}/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@updateArea',
                'as' => 'api.v1.updateArea.put'
            ]);
            Route::patch('/edit/{user_id}/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@updateArea',
                'as' => 'api.v1.updateArea.patch'
            ]);

            Route::delete('/delete/{user_id}/{area_id}', [
                'uses' => 'Api\V1\AreaController@deleteArea',
                'as' => 'api.v1.deleteArea.delete'
            ]);
            
            Route::post('/filter-area', [
                'uses' => 'Api\V1\AreaController@filterArea',
                'as' => 'api.v1.filterArea.post'
            ]);
        });

    /*
     * Parish Group Operation
     */        
        Route::group(['prefix' => 'parish'], function () {

            Route::post('/create', [
                'uses' => 'Api\V1\ParishController@createParish',
                'as' => 'api.v1.createParish.post'
            ]);

            Route::put('/edit/{user_id}/{created_by}/{parish_id}', [
                'uses' => 'Api\V1\ParishController@updateParish',
                'as' => 'api.v1.updateParish.put'
            ]);

            Route::patch('/edit/{user_id}/{created_by}/{parish_id}', [
                'uses' => 'Api\V1\ParishController@updateParish',
                'as' => 'api.v1.updateParish.patch'
            ]);
            
            Route::delete('/delete/{parish_id}', [
                'uses' => 'Api\V1\ParishController@deleteParish',
                'as' => 'api.v1.deleteParish.delete'
            ]);

            Route::get('/{user_id}', [
                'uses' => 'Api\V1\ParishController@getParishList',
                'as' => 'api.v1.getParishList.post'
            ]);

            Route::post('/filter-parish', [
                'uses' => 'Api\V1\ParishController@filteParish',
                'as' => 'api.v1.filteParish.post'
            ]);

            Route::get('/show-detail/{parish_id}', [
                'uses' => 'Api\V1\ParishController@getParishDetail',
                'as' => 'api.v1.getParishDetail.get'
            ]);
        });
    /*
     * User Group Operation
     */    
        Route::group(['prefix' => 'user'], function () {

            Route::get('/password-reset/{user_id}', [
                'uses' => 'Api\V1\UserController@resetPassword',
                'as' => 'api.v1.resetPassword.get'
            ]);
            
            Route::get('/show-detail/{user_id}', [
                'uses' => 'Api\V1\UserController@getDetail',
                'as' => 'api.v1.getDetail.get'
            ]);

            Route::put('/edit/{user_id}', [
                'uses' => 'Api\V1\UserController@updateUserDetail',
                'as' => 'api.v1.updateUserDetail.put'
            ]);

            Route::patch('/edit/{user_id}', [
                'uses' => 'Api\V1\UserController@updateUserDetail',
                'as' => 'api.v1.updateUserDetail.patch'
            ]);
            
            Route::post('/username-reset/{user_id}',[
                'uses'  => 'Api\V1\UserController@resetUsername',
                'as'    => 'api.v1.resetUsername.post'
            ]);

            Route::get('/wem-list/{user_id}',[
                'uses'  => 'Api\V1\UserController@getWemList',
                'as'    => 'api.v1.getWemList.post'
            ]);

            Route::post('/change-status/{user_id}',[
                'uses'  => 'Api\V1\UserController@changeWemStatus',
                'as'    => 'api.v1.changeWemStatus.post'
            ]);
        });

    /*
     * Payment Group Operation
     */
        Route::group(['prefix' => 'payment'], function () {

            Route::post('/upload-payment', [
                'uses' => 'Api\V1\PaymentController@createPayment',
                'as' => 'api.v1.createPayment.post'
            ]);
            
            Route::post('/{user_id}/{user_type}', [
                'uses' => 'Api\V1\PaymentController@getPastorPaymentList',
                'as' => 'api.v1.getPastorPaymentList.post'
            ]);

            Route::get('/rejectedList/{user_id}/{user_type}', [
                'uses' => 'Api\V1\PaymentController@getPastorRejectdPaymentList',
                'as' => 'api.v1.getPastorRejectdPaymentList.get'
            ]);

            Route::put('/update-payment-status/{payment_id}', [
                'uses' => 'Api\V1\PaymentController@updatePaymentStatus',
                'as' => 'api.v1.updatePaymentStatus.put'
            ]);

            Route::patch('/update-payment-status/{payment_id}', [
                'uses' => 'Api\V1\PaymentController@updatePaymentStatus',
                'as' => 'api.v1.updatePaymentStatus.patch'
            ]);

            Route::post('/downloadFile/{payment_id}', [
                'uses' => 'Api\V1\PaymentController@downloadFile',
                'as' => 'api.v1.downloadFile.post'
            ]);

            Route::post('/filter-payment', [
                'uses' => 'Api\V1\PaymentController@filterPayment',
                'as' => 'api.v1.filterPayment.post'
            ]);            

            Route::delete('/delete/{payment_id}', [
                'uses' => 'Api\V1\PaymentController@deletePayment',
                'as' => 'api.v1.deletePayment.delete'
            ]);
        });

    /*
     * Report Group Operation
     */

        Route::group(['prefix' => 'report'], function () {

            Route::post('/create', [
                'uses'  => 'Api\V1\ReportController@createReport',
                'as'    => 'api.v1.createReport.post'
            ]);

            Route::post('/all-report', [
                'uses'  => 'Api\V1\ReportController@getReport',
                'as'    => 'api.v1.getReport.post'
            ]);

            Route::delete('/delete/{report_id}', [
                'uses'  => 'Api\V1\ReportController@deleteReport',
                'as'    => 'api.v1.deleteReport.delete'
            ]);

            Route::post('/filter-report/{user_id}/{user_type}', [
                'uses' => 'Api\V1\ReportController@filteReport',
                'as' => 'api.v1.filteReport.post'
            ]);

            Route::put('/update-report/{report_id}', [
                'uses' => 'Api\V1\ReportController@updateReport',
                'as' => 'api.v1.updateReport.put'
            ]);

            Route::patch('/update-report/{report_id}', [
                'uses' => 'Api\V1\ReportController@updateReport',
                'as' => 'api.v1.updateReport.patch'
            ]);

            Route::get('/view-report/{report_id}', [
                'uses' => 'Api\V1\ReportController@viewReport',
                'as' => 'api.v1.viewReport.get'
            ]);

            Route::post('/fetch-report', [
                'uses' => 'Api\V1\ReportController@fetchParishBasedReport',
                'as' => 'api.v1.fetchParishBasedReport.post'
            ]);

        });

    });
});