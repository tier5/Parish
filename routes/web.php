<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response()->file( public_path() . '/index.html' );
});

Route::get('/{angular_route}', function () {
    return response()->file( public_path() . '/index.html' );
});
Route::get('/{angular_route}/{angular_sub_route}', function () {
    return response()->file( public_path() . '/index.html' );
});
Route::get('/{angular_route}/{angular_sub_route}/{angular_sub_sub_route}', function () {
    return response()->file( public_path() . '/index.html' );
});
Route::get('/{angular_route}/{angular_sub_route}/{angular_sub_sub_route}/{angular_sub_sub_sub_route}', function () {
   return response()->file( public_path() . '/index.html' );
});
Route::get('/{angular_route}/{angular_sub_route}/{angular_sub_sub_route}/{angular_sub_sub_sub_route}/{angular_sub_sub_sub_sub_route}', function () {
    return response()->file( public_path() . '/index.html' );
});
