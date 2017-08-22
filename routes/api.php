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
Route::group(['prefix' => 'v1'], function () {
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
});