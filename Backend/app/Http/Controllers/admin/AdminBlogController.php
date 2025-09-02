<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\str;
// intervetion image for resize image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class AdminBlogController extends Controller
{

     public function index()
    {
       $blogs=Blog::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'data'=>$blogs,
            'message'=>'All Blog Data Fetched'

        ]);

    }

    //to store
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
        $model=new Blog();
        $model->title = $request->title;
        $model->slug = Str::slug($request->slug);
        $model->auther = $request->auther;
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
                $destinationPath=public_path('uplodes/blogs/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/blogs/large/'.$imgName);
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
            "fields"=>$model,
            'message'=>'Your Services Now save in Database'

        ]);


    }

    //fetch single Blog
      public function show( $blogId)
    {
        $blog=Blog::find($blogId);
        if($blog != null){
            return response()->json([
            'status'=>true,
            'data'=>$blog,
            'message'=>'Here Your blog data '
        ]);
           
        }
         return response()->json([
                'status'=>false,
                'id'=>$blogId,
                'message'=>'blog not found'
            ]);
        //

    }

    // update blog
     public function update(Request $request, $Id)
    {
        $blog=Blog::find($Id);
        if($blog == null){
            return response()->json([
                'status'=>false,
                'message'=>'blog not found'
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
                'message'=>'Your blogs Not save in Database,Please Enter Valid Slug and title'

            ]);
        }
       
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->slug);
        $blog->auther = $request->auther;
        $blog->content = $request->content;
        $blog->status = $request->status;
        $blog->save();

        //save temp image here
        if($request->imageId > 0){
            $oldImage=$blog->image;
            $tempImage=TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray=explode('.',$tempImage->name);
                $ext=last($extArray);

                $imgName=strtotime('now').$blog->Id.'.'.$ext;
                $sourcePath=public_path('uplodes/temp/'.$tempImage->name);
                $destinationPath=public_path('uplodes/blogs/small/'.$imgName);

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destinationPath);

                $destinationPath=public_path('uplodes/blogs/large/'.$imgName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $blog->image = $imgName;
                $blog->save();
                if($oldImage != ''){
                    File::delete(public_path('uplodes/blogs/small/'.$oldImage));
                    File::delete(public_path('uplodes/blogs/large/'.$oldImage));
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
            'message'=>'Your blogs Now Updated in Database'

        ]);


    }

    //delete blog
    public function destroy($id){
        $blog=Blog::find($id);
        if($blog){
            $blog->delete();
            return response()->json([
                'status'=>true,
                'message'=>'your blog Deleted successfully'

            ]);
        }
        return response()->json([
            'status'=>false,
            'message'=>'your Blog not deleted for some technical issue'
        ]);
    }


}
