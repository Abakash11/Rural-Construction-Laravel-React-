<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request){
        $validate=Validator::make($request->all(),[
             'image'=>'required|mimes:png,jpg,jpeg,gif'
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validate->errors('image')
            ]);
        }

        $image=$request->image;
        $ext=$image->getClientOriginalExtension();
        $imageName= strtotime('now').'.'.$ext;
        // save data in model 
        $model=new TempImage();
        $model->name=$imageName;
        $model->save();
        $image->move(public_path('uplodes/temp'),$imageName);
        // create small thumbnail hare 
        $sourcePath=public_path('uplodes/temp/'.$imageName);
        $destinationPath=public_path('uplodes/temp/thumbnail/'.$imageName);

        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destinationPath);

        return response()->json([
            'status'=>true,
            'data'=>$model,
            'message'=>'Image Uplode successfully'
        ]);

    } 
}
