<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\MemberModel;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class MemberModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $members=MemberModel::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'data'=>$members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate
        $validate=Validator::make($request->all(),[
            'name'=>'required',
            'job_title'=>'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'message'=>'Name and Job Title Required'
            ]);
        }
        $model=new MemberModel();
        $model->name=$request->name;
        $model->job_title=$request->job_title;
        $model->image=$request->image;
        $model->status=$request->status;
        $model->linkedIn=$request->linkedIn;
        $model->save();

           //save temp image here
        if($request->imageId > 0){
            
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$model->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/members/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/members/large/'.$imgName);
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
            'status'=>true,
            'Member'=>$model,
            'message'=>'Your Member Successfully store in database'
        ]);



    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $member=MemberModel::find($id);
        if($member){
            return response()->json([
                'status'=>true,
                'data'=>$member
            ]);
        }else{
            return response()->json([
                'status'=>false,
                'message'=>'Your Member not Found'
            ]);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MemberModel $memberModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //validate
        $validate=Validator::make($request->all(),[
            'name'=>'required',
            'job_title'=>'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'message'=>'Name and Job Title Required'
            ]);
        }
        $model=MemberModel::find($id);
        $model->name=$request->name;
        $model->job_title=$request->job_title;
        $model->image=$request->image;
        $model->status=$request->status;
        $model->linkedIn=$request->linkedIn;
        $model->save();

           //save temp image here
        if($request->imageId > 0){
            
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $oldImage = $model->image;
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$model->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/members/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/members/large/'.$imgName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $model->image = $imgName;
                $model->save();
                if($oldImage != ''){
                File::delete(public_path('uplodes/members/small/'.$oldImage));
                File::delete(public_path('uplodes/members/large/'.$oldImage));
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
            'status'=>true,
            'message'=>'Your Member Successfully updated in database'
        ]);



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $model=MemberModel::find($id);
        if($model){
            $oldImage = $model->image;
            $model->delete();
            if($oldImage != ''){
            File::delete(public_path('uplodes/members/small/'.$oldImage));
            File::delete(public_path('uplodes/members/large/'.$oldImage));
            }
            return response()->json([
            'status'=>true,
            'message'=>'Your Member  delete'
        ]);
        }
        return response()->json([
            'status'=>false,
            'message'=>'Your Member not delete'
        ]);

        }
    }

