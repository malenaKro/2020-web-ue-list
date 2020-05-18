<?php

use Illuminate\Http\Request;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

/* auth */

/*
 * open public routes
 */
Route::group(['middleware' => ['api', 'cors']], function (){
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});

/*
 * private routes
 */
Route::group(['middleware' => ['api', 'cors', 'auth.jwt']], function() {
    Route::get('lists', 'ListController@index' );
    Route::get('list/{id}', 'ListController@findById');
    Route::get('list/checkId/{id}', 'ListController@checkId');
    Route::get('lists/search/{searchTerm}', 'ListController@findBySearchTerm');
    Route::post('list', 'ListController@save');
    Route::post('list/comment/{id}', 'ListController@saveFeedback');
    Route::put('list/volunteer/{id}', 'ListController@volunteer');
    Route::put('list/dropVolunteer/{id}', 'ListController@dropVolunteer');
    Route::put('list/{id}', 'ListController@update');
    Route::delete('list/{id}', 'ListController@delete');
    Route::put('list/putFinalSum/{id}', 'ListController@putFinalSum');
    Route::post('lists/usersLists', 'ListController@usersLists');
    Route::post('auth/logout', 'Auth\ApiAuthController@logout');
});