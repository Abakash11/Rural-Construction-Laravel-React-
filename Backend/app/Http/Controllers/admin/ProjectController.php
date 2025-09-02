<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectModel;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{

public function index(){
    $projects = ProjectModel::orderBy('created_at', 'DESC')->get();
    return response()->json([
        'status' => true,
        'data' => $projects,
        'message' => 'All Projects Fetched'
    ]);    
}
//method for save projects in db
public function store(Request $request)
    {
        //validate 
        $validate = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:project_models,slug',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validate->errors(),
                'message' => 'Your Project Not saved in Database, Please Enter Valid Slug and Title'
            ]);
        }

        // Create a new project model instance
        $model=new ProjectModel();
        $model->title = $request->title;
        $model->slug = $request->slug;
        $model->sort_desc = $request->sort_desc;
        $model->content = $request->content;
        $model->construction_type = $request->construction_type;
        $model->sector = $request->sector;
        $model->location = $request->location;
        $model->image = $request->image; // Assuming image is a string path
        $model->status = $request->status ?? true; // Default to true if not provided
        $model->save();
        //save temp image here
        if($request->imageId > 0){
            
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$model->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/projects/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/projects/large/'.$imgName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $model->image = $imgName;
                $model->save();
               

            }
            else{
                return response()->json([
                    'status'=>false,
                    'message'=>'Image Not Found'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project saved successfully',
            'data' => $model
        ]);
}
//update project 
public function update(Request $req,$id){
    //validate 
    $validate = Validator::make($req->all(), [
        'title' => 'required',
        'slug' => 'required',
    ]);

    if ($validate->fails()) {
        return response()->json([
            'status' => false,
            'error' => $validate->errors(),
            'message' => 'Your Project Not saved in Database, Please Enter Valid Slug and Title'
        ]);
    }

    $model=ProjectModel::find($id);
    if($model != null){
        $model->title = $req->title;
        $model->slug = $req->slug;
        $model->sort_desc = $req->sort_desc;
        $model->content = $req->content;
        $model->construction_type = $req->construction_type;
        $model->sector = $req->sector;
        $model->location = $req->location;
        $model->status = $req->status ?? true; // Default to true if not provided
        $model->save();
        //save temp image here
        if($req->imageId > 0){ 
            $oldImage = $model->image;
            $tempImage=TempImage::find($req->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$model->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/projects/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/projects/large/'.$imgName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $model->image = $imgName;
                $model->save();
                if($oldImage != ''){
                File::delete(public_path('uplodes/projects/small/'.$oldImage));
                File::delete(public_path('uplodes/projects/large/'.$oldImage));
            }


            }
            else{
                return response()->json([
                    'status'=>false,
                    'message'=>'Image Not Found'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project Updated successfully',
            'data' => $model
        ]);
}
}
//fetch single project
public function show($id){
    $project = ProjectModel::find($id);
    if($project){
        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Project Fetched'
        ]);
    }else{
        return response()->json([
            'status' => false,
            'message' => 'Project Not Found'
        ]);
    }
}

// delete project
public function destroy($id){
    $project = ProjectModel::find($id);
    if($project){
        $oldImage = $project->image;
        $project->delete();
        if($oldImage != ''){
            File::delete(public_path('uplodes/projects/small/'.$oldImage));
            File::delete(public_path('uplodes/projects/large/'.$oldImage));
        }
        return response()->json([
            'status' => true,
            'message' => 'Project Deleted'
        ]);
    }else{
        return response()->json([
            'status' => false,
            'message' => 'Project Not Found'
        ]);
    }
}


}
