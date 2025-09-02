<?php

namespace App\Http\Controllers\front;
use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Mail\ReplayMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactMailController extends Controller
{
    //
    function sendEmail(Request $req){
        $validator=Validator::make($req->all(),[
            'name'=>'required',
            'email'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'massage'=>'Name and Email Required'
            ]); 
        }

        $to=env('MAIL_USERNAME');
        $msg=[
            'name'=>$req->name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'message'=>$req->msg
        ];
        $sub="Clint Subject:{$req->sub}";
        Mail::to($to)->send(new ContactMail($msg,$sub));
    }
    function sendReplyMAil(Request $req){
        $validator=Validator::make($req->all(),[
            'name'=>'required',
            'email'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'massage'=>'Name and Email Required'
            ]); 
        }
        $msg=[
            'name'=>$req->name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'message'=>$req->msg
        ];
        $sub="no replay ~ Rural Construction";
        Mail::to($req->email)->send(new ReplayMail($msg,$sub));
    }
}
