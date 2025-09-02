<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticateController extends Controller
{
    public function authenticate(Request $req){
        // apply validation

        $validator=Validator::make($req->all(),[
            "email"=>"required|email",
            "password"=>"required"
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'errors'=>$validator->errors()
            ]);
        }else{
            $credentials=[
                'email'=>$req->email,
                'password'=>$req->password
            ];
            if(Auth::attempt($credentials)){
                $user=User::find(Auth::user()->id);
                $user->tokens()->delete();
                $token=$user->createToken('token')->plainTextToken;
                return response()->json([
                    'status'=>true,
                    'message'=>'Login Successful',
                    'id'=>Auth::user()->id,
                    'token'=>$token
                ]);
            }else{
                return response()->json([
                    'status'=>false,
                    'message'=>'either email or password is invalid'
                ]);
            }
        }


    }
    
    public function logout(){
        $user=User::find(Auth::user()->id);
        $user->tokens()->delete();
        return response()->json([
                    'status'=>true,
                    'message'=>'Success logout'
                ]);
    }
}
