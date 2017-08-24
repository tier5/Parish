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

        Route::group(['prefix' => 'provinces'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\ProvienceController@createProvience',
                'as' => 'api.v1.createProvience.post'
            ]);

            Route::get('/{user_id}', [
                'uses' => 'Api\V1\ProvienceController@getProvinceList',
                'as' => 'api.v1.getProvinceList.post'
            ]);

            Route::get('/showDetail/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@getProvinceDetail',
                'as' => 'api.v1.getProvinceDetail.post'
            ]);            
            Route::put('/{user_id}/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@updateProvience',
                'as' => 'api.v1.updateProvience.put'
            ]);
            Route::patch('/{user_id}/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@updateProvience',
                'as' => 'api.v1.updateProvience.patch'
            ]);

            Route::delete('/delete/{user_id}/{province_id}', [
                'uses' => 'Api\V1\ProvienceController@deleteProvience',
                'as' => 'api.v1.deleteProvience.delete'
            ]);


        });

        Route::group(['prefix' => 'zones'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\ZoneController@createZone',
                'as' => 'api.v1.createZone.post'
            ]);
            Route::get('/{created_by}/{province_id}', [
                'uses' => 'Api\V1\ZoneController@getZoneList',
                'as' => 'api.v1.getZoneList.post'
            ]);

            Route::get('/showDetail/zone/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@getZoneDetail',
                'as' => 'api.v1.ZoneController.post'
            ]); 
            Route::get('/{created_by}', [
                'uses' => 'Api\V1\ZoneController@getAllZone',
                'as' => 'api.v1.getAllZone.post'
            ]);

            Route::put('/{user_id}/{created_by}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@updateZone',
                'as' => 'api.v1.updateZone.put'
            ]);
            Route::patch('/{user_id}/{created_by}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@updateZone',
                'as' => 'api.v1.updateZone.patch'
            ]);

            Route::delete('/delete/{user_id}/{zone_id}', [
                'uses' => 'Api\V1\ZoneController@deleteZone',
                'as' => 'api.v1.deleteZone.delete'
            ]);

            Route::post('/filterZone', [
                'uses' => 'Api\V1\ZoneController@filterZone',
                'as' => 'api.v1.filterZone.post'
            ]);

        });

        Route::group(['prefix' => 'areas'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\AreaController@createArea',
                'as' => 'api.v1.createArea.post'
            ]);
            Route::get('/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@getAreaList',
                'as' => 'api.v1.getAreaList.post'
            ]);
            Route::get('/showDetail/area/{area_id}', [
                'uses' => 'Api\V1\AreaController@getAreaDetail',
                'as' => 'api.v1.getAreaDetail.post'
            ]);
            Route::get('/{created_by}', [
                'uses' => 'Api\V1\AreaController@getAllArea',
                'as' => 'api.v1.getAllArea.post'
            ]);
            Route::put('/{user_id}/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@updateArea',
                'as' => 'api.v1.updateArea.put'
            ]);
            Route::patch('/{user_id}/{created_by}/{area_id}', [
                'uses' => 'Api\V1\AreaController@updateArea',
                'as' => 'api.v1.updateArea.patch'
            ]);

            Route::delete('/delete/{user_id}/{area_id}', [
                'uses' => 'Api\V1\AreaController@deleteArea',
                'as' => 'api.v1.deleteArea.delete'
            ]);
            
            Route::post('/filterArea', [
                'uses' => 'Api\V1\AreaController@filterArea',
                'as' => 'api.v1.filterArea.post'
            ]);
        });
        
        Route::group(['prefix' => 'parishs'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\ParishController@createParish',
                'as' => 'api.v1.createParish.post'
            ]);

            Route::put('/{user_id}/{created_by}/{parish_id}', [
                'uses' => 'Api\V1\ParishController@updateParish',
                'as' => 'api.v1.updateParish.put'
            ]);

            Route::patch('/{user_id}/{created_by}/{parish_id}', [
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
        });

    });
});
