<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\ProjectModel;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //for fetch recent data
    public function index(Request $request){
        $projects = ProjectModel::orderBy('created_at', 'DESC')->take($request->take)->get();

        return response()->json([
            'status' => true,
            'data' => $projects,
            'message' => 'letest Projects Fetched'
        ]);    
    }
    //for fetch all data 
    public function allProject(){
        $projects = ProjectModel::all();

        return response()->json([
            'status' => true,
            'data' => $projects,
            'message' => 'All Projects Fetched'
        ]);    
    }

    public function projectDetails($id){
        $project=ProjectModel::find($id);
        if($project){
            return response()->json([
                'status'=>true,
                'data'=>$project
            ]);
        }
        return response()->json([
            'status'=>false,
            'message '=>'Your Project Not Fetched!!'
        ]);
    }
}
