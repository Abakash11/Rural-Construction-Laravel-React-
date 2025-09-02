<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $services=Service::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'data'=>$services,
            'message'=>'All Data Fetched'

        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate 
        $validate=Validator::make($request->all(),[
            'title'=>'required',
            'slug'=>'required|unique:services,slug',
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validate->errors(),
                'message'=>'Your Services Not save in Database,Please 
                            Enter Valid Slug and title'

            ]);
        }
        $model=new Service();
        $model->title = $request->title;
        $model->slug = Str::slug($request->slug);
        $model->short_des = $request->short_des;
        $model->content = $request->content;
        $model->status = $request->status;
        $model->save();
         //save temp image here
        if($request->imageId > 0){
            
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$model->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/services/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/services/large/'.$imgName);
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
            'message'=>'Your Services Now save in Database'

        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show( $serviceId)
    {
        $service=Service::find($serviceId);
        if($service == null){
            return response()->json([
                'status'=>false,
                'message'=>'service not found'
            ]);
        }
        return response()->json([
            'status'=>true,
            'data'=>$service,
            'message'=>'Here Your Service data '
        ]);
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $serviceId)
    {
        $service=Service::find($serviceId);
        if($service == null){
            return response()->json([
                'status'=>false,
                'message'=>'service not found'
            ]);
        }
        //validate 
        $validate=Validator::make($request->all(),[
            'title'=>'required',
            'slug'=>'required' ,
            'status' => 'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validate->errors(),
                'message'=>'Your Services Not save in Database,Please Enter Valid Slug and title'

            ]);
        }
       
        $service->title = $request->title;
        $service->slug = Str::slug($request->slug);
        $service->short_des = $request->short_des;
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();

        //save temp image here
        if($request->imageId > 0){
            $oldImage=$service->image;
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$service->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/services/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/services/large/'.$imgName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $service->image = $imgName;
                $service->save();
                if($oldImage != ''){
                    File::delete(public_path('uplodes/services/small/'.$oldImage));
                    File::delete(public_path('uplodes/services/large/'.$oldImage));
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
            'message'=>'Your Services Now Updated in Database'

        ]);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($serviceId)
    {
        //
        $service=Service::find($serviceId);
        if($service == null){
            return response()->json([
                'status'=>false,
                'message'=>'service not found'
            ]);
        }
        $service->delete();
        return response()->json([
            'status'=>true,
            'message'=>' Your Service Deleted Successfully '
        ]);
    }
}
