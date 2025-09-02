import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../common/footer';
import SideBar from '../../common/SideBar';
import Header from '../../common/header';
import { apiUrl, fileUrl, token } from '../../common/Http';
import Lodder from "../../common/lodder";
import { toast } from 'react-toastify';
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get :id from route
  const [isloading, setIsLoading] = useState(false);
  
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    auther: "",
    content: "",
    image: null,
    imageId: '',
    status: true,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value
    }));
  };

  const handelFile=async (e)=>{
      const imagedata= new FormData();
      imagedata.append('image',e.target.files[0]);
      
       try { 
        
        const response = await fetch(apiUrl + 'temp-image', {
          method: 'POST',
          headers: {    
            'Accept': 'application/json',
            'authorization': `Bearer ${token()}`
            },
          body: imagedata,     
        }).then(res=> res.json())
        .then((data) => {
        
          if(data.status==true){
            setFormData(prev => ({
              ...prev,
              imageId: data.data?.id, 
            }));
            toast.success(data.message);
          }else{
            toast.error(data.message);
          }
        })
        
        
      }
      catch (error) {
        console.error('Error fetching blogs:', error);
        }
      
    }

  const callDefaultData = async() => {
    
     try {
          setIsLoading(true);
          const response = await fetch(apiUrl + `blog/${id}`, {
            method: 'get',
            headers: {    
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'authorization': `Bearer ${token()}`
              },
              
          });

          const data = await response.json();
          console.log(data);
          
            setFormData({
            title: data.data.title || "",
            slug: data.data.slug || "",
            auther: data.data.auther || "",
            content: data.data.content || "",
            image: data.data.image || null,
            status: Boolean(data.data.status) ,
            });      
          setIsLoading(false);
        }
        catch (error) {
          console.error('Error fetching blogs:', error);
          }
    
  };

  

  useEffect(() => {callDefaultData()},[])

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const response = await fetch(apiUrl + `blog/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",    
            'Accept': 'application/json',
            'authorization': `Bearer ${token()}`
            },
          body: JSON.stringify(formData),     
        });
        const data = await response.json();
        console.log(data);
        
        if(data.status==true){
          toast.success(data.message)
          navigate('/admin/blogs')
        }
        else{
          toast.error(data.message)
        }
        
      }
      catch (error) {
        console.error('Error fetching blogs:', error);
        }
      
      // You can now send this data to an API or backend
    };


    console.log(formData.status);


  return (
    <>
    <Header/>
    <main className='flex h-full'>
        <SideBar/>
        {/* panel  */}
        <div className="w-[80%]  p-6 bg-gray-100">
        
        <h1 className="text-center mb-4 font-mono text-4xl">Blog Dashboard</h1>
        <div className="p-4">
        <div className="bg-white rounded shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Edit Blogs</h2>
            <Link to="/admin/blogs">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-4 rounded">
                Back
            </button>
            </Link>
            </div>
            <hr /> 
            { isloading ?(
                <div className='flex justify-center items-center h-80'>
                    <Lodder/>
                </div>
                ):(
            <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
            >
            

            {/* Name */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
            </div>

            {/* Slug */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Slug *
            </label>
            <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
            </div>

            {/* Short Description */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Short Description
            </label>
            <textarea
                name="auther"
                rows="3"
                value={formData.auther}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            ></textarea>
            </div>

            {/* Content */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Content
            </label>
            <textarea
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            ></textarea>
            </div>

            {/* Image */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <input
                type="file"
                name="image"
                onChange={handelFile}
                className="mt-1 block w-full text-sm text-gray-700"
                
            />

            {  formData.image  && (   
                <img src={fileUrl+'uplodes/blogs/small/'+formData.image} alt='Service Image'/>
            )}
            </div>

            {/* Status */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
                Update
            </button>
            </div>
            </form>)}                
            
        </div>
        </div>
        </div>
        
    </main>
    <Footer/>
    </>
  );
};

export default Edit;
