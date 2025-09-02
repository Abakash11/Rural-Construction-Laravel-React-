<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //this function returns the all services 
    public function index()
    {
        $services= Service::where('status', true)->orderBy('id', 'desc')->get();
         return response()->json([
            'status' => true,
            'message' => ' services fetched successfully',
            'data' => $services
        ]);
    }
    //this method returns letest service
    public function latest(Request $req){
        $services = Service::where('status', true)->orderBy('id', 'desc')
        ->take($req->get('limit'))->get();
        return response()->json([
            'status' => true,
            'message' => 'Latest services fetched successfully',
            'data' => $services
        ]);

    }

    // this method return single services 
    public function serviceDetail($id){
        $service=Service::find($id);
        if($service){
            return response()->json([
                'status'=>true,
                'data'=>$service
            ]);
        }
        return response()->json([
            'status'=>false,
            'message'=>'Your service not found'
        ]);
    }
}
