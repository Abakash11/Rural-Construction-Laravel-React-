<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\MemberModel;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    //
    public function index(){
        $member=MemberModel::where('status',true)->get();
        if($member){
            return response()->json([
            'status'=>true,
            'data'=>$member
        ]);
        }
        return response()->json([
            'status'=>false,
            'message'=>'somthing Went wrong in Fatching member'
        ]);
        
    }
}
