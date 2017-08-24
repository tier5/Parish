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

        Route::group(['prefix' => 'proviences'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\ProvienceController@createProvience',
                'as' => 'api.v1.createProvience.post'
            ]);
        });

        Route::group(['prefix' => 'zones'], function () {

            Route::post('/', [
                'uses' => 'Api\V1\ZoneController@createZone',
                'as' => 'api.v1.createZone.post'
            ]);
        });
    });
});
