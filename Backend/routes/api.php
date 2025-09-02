<?php

use App\Http\Controllers\admin\AdminBlogController;
use App\Http\Controllers\admin\AdminDashbordController;
use App\Http\Controllers\admin\MemberModelController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\AuthenticateController;
use App\Http\Controllers\front\BlogController;
use App\Http\Controllers\front\ContactMailController;
use App\Http\Controllers\front\MemberController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;


Route::post('/auth',[AuthenticateController::class,'authenticate']);
// front end services
Route::get('/get-service',[FrontServiceController::class,'index']);
Route::get('/letest-service',[FrontServiceController::class,'latest']);
Route::get('/service/{id}',[FrontServiceController::class,'serviceDetail']);
//send email
Route::post('/send-email',[ContactMailController::class,'sendEmail']);
Route::post('/replay-email',[ContactMailController::class,'sendReplyMAil']);

//frontend projects
Route::get('/letest-project',[FrontProjectController::class,'index']);
Route::get('/get-project',[FrontProjectController::class,'allProject']);
Route::get('/single-project/{id}',[FrontProjectController::class,'projectDetails']);
//front blogs
Route::get('/get-blog',[BlogController::class,'index']);
Route::get('/letest-blog',[BlogController::class,'letest']);
Route::get('/single-blog/{id}',[BlogController::class,'blog']);
// front testimonial 
Route::get('/letestTestimonial',[FrontTestimonialController::class,'letest']);
// front member 
Route::get('/get-members',[MemberController::class,'index']);


Route::group(['middleware'=>['auth:sanctum']],function(){

    Route::get('/dashbord',[AdminDashbordController::class,'index']);
    Route::get('/logout',[AuthenticateController::class,'logout']);
    // service Route 
    Route::post('/service',[ServiceController::class,'store']);
    Route::get('/service',[ServiceController::class,'index']);
    Route::put('/service/{serviceId}',[ServiceController::class,'update']);
    Route::get('/service/{serviceId}',[ServiceController::class,'show']);
    Route::delete('/service/{serviceId}',[ServiceController::class,'destroy']);

    //project Route
    Route::post('/project',[ProjectController::class,'store']);
    Route::get('/project',[ProjectController::class,'index']);
    Route::put('/project/{id}',[ProjectController::class,'update']);
    Route::get('/project/{id}',[ProjectController::class,'show']);
    Route::delete('/project/{id}',[ProjectController::class,'destroy']);

    //blog route
    Route::post('/blog',[AdminBlogController::class,'store']);
    Route::get('/blog',[AdminBlogController::class,'index']);
    Route::put('/blog/{id}',[AdminBlogController::class,'update']);
    Route::get('/blog/{id}',[AdminBlogController::class,'show']);
    Route::delete('/blog/{id}',[AdminBlogController::class,'destroy']);

    //testimonial route
    Route::post('/testimonial',[TestimonialController::class,'store']);
    Route::get('/testimonial',[TestimonialController::class,'index']);
    Route::put('/testimonial/{id}',[TestimonialController::class,'update']);
    Route::get('/testimonial/{id}',[TestimonialController::class,'show']);
    Route::delete('/testimonial/{id}',[TestimonialController::class,'destroy']);
    //member route
    Route::post('/member',[MemberModelController::class,'store']);
    Route::get('/member',[MemberModelController::class,'index']);
    Route::put('/member/{id}',[MemberModelController::class,'update']);
    Route::get('/member/{id}',[MemberModelController::class,'show']);
    Route::delete('/member/{id}',[MemberModelController::class,'destroy']);

    // temp image 
    Route::post('/temp-image',[TempImageController::class,'store']);

});