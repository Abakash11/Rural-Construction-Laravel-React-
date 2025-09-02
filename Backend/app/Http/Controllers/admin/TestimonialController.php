<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\TestimonialModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TestimonialController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
       $testimonial=TestimonialModel::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'data'=>$testimonial,
            'message'=>'All Data Fetched'

        ]);

    }
    //for store data
    public function store(Request $request)
    {
        //validate 
        $validate=Validator::make($request->all(),[
            'testimonial'=>'required',
            'creation'=>'required',
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validate->errors(),
                'message'=>'Your Services Not save in Database,Please 
                            Enter Valid testimonial and creation'

            ]);
        }
        $model=new TestimonialModel();
        $model->testimonial = $request->testimonial;
        $model->creation = $request->creation;
        $model->desingnation = $request->desingnation;
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
                $destinationPath=public_path('uplodes/testimonial/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(50, 50);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/testimonial/large/'.$imgName);
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
    // show one data 
    public function show( $id)
    {
        $testimonial=TestimonialModel::find($id);
        if($testimonial == null){
            return response()->json([
                'status'=>false,
                'message'=>'testimonial not found'
            ]);
        }
        return response()->json([
            'status'=>true,
            'data'=>$testimonial,
            'message'=>'Here Your testimonial data '
        ]);
        //

    }
    // for update data 
    public function update(Request $request,$id)
    {
        $model=TestimonialModel::find($id);
        //validate 
        $validate=Validator::make($request->all(),[
            'testimonial'=>'required',
            'creation'=>'required|unique:testimonial_models,creation',
        ]);
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validate->errors(),
                'message'=>'Your testimonial Not save in Database,Please 
                            Enter Valid Slug and title'

            ]);
        }
        
        $model->testimonial = $request->testimonial;
        $model->creation = $request->creation;
        $model->desingnation = $request->desingnation;
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
                $destinationPath=public_path('uplodes/testimonial/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(50, 50);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/testimonial/large/'.$imgName);
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
            'message'=>'Your Testimonial Now updated in Database'

        ]);


    }

    public function destroy($id)
    {
        //
        $testimonial=TestimonialModel::find($id);
        if($testimonial == null){
            return response()->json([
                'status'=>false,
                'message'=>'testimonial not found'
            ]);
        }
        $testimonial->delete();
        return response()->json([
            'status'=>true,
            'message'=>' Your testimonial Deleted Successfully '
        ]);
    }


}