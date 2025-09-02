<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\TestimonialModel;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function letest(Request $req){
        $testimonials= TestimonialModel::where('status',true)->orderBy('id','desc')->
        take($req->get('limit'))->get();
        return response()->json([
            'status'=>true,
            'message'=>'Testimonials fetched successfully',
            'data'=>$testimonials
        ]);
    }
}
