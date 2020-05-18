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

Route:: get ( '/' , function () {
    $lists = DB::table( 'shopping_lists' )->get();
    return $lists ;
//return view('welcome',compact('books'));
});
