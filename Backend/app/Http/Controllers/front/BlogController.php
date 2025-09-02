<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    //for fetch all blogs
    public function index(){
        $blogs=Blog::all();
        return response()->json([
            'status'=>true,
            'data'=>$blogs,
            'message'=>'All Blogs fetched '
        ]);
    }
    //for fetch letest blogs
    public function letest(Request $req){
        $Blogs=Blog::orderBy('created_at','DESC')->take($req->take)->get();
        return response()->json([
            'status'=>true,
            'data'=>$Blogs,
            'message'=>'letest blog fetched'
        ]);
    }
    // for fetch single blog 
    public function blog($id){
        $blog=Blog::find($id);
        if($blog){
            return response()->json([
                'status'=>true,
                'data'=>$blog
            ]);
        }
        return response()->json([
            'status'=>false,
            'message'=>'blog not fetched'
        ]);
    }
}
