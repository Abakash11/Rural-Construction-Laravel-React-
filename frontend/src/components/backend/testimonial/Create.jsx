import React, { useState } from 'react'
import Header from '../../common/header'
import Footer from '../../common/footer'
import SideBar from '../../common/SideBar'
import Lodder from '../../common/Lodder'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl, token } from '../../common/Http'
import { toast } from 'react-toastify'


const Create = () => {
    const [formData, setFormData] = useState({
    
    creation: '',
    imageId: '',
    testimonial: '',
    desingnation:'',
    status: 1,
  });
  
  const [disable,setdisable]=useState(false)
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelFile=async (e)=>{
    const imagedata= new FormData();
    imagedata.append('image',e.target.files[0]);
    
     try { 
      setdisable(true)
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
      setdisable(false);
      
    }
    catch (error) {
      console.error('Error fetching services:', error);
      }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch(apiUrl + 'testimonial', {
        method: 'POST',
        headers: {    
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token()}`
          },
        body: JSON.stringify(formData),     
      });
      const data = await response.json();
      console.log(formData); 
      if(data.status==true){
        toast.success(data.message)
        navigate('/admin/testimonial')
      }
      else{
        toast.error(data.message)
      }
      
    }
    catch (error) {
      console.error('Error fetching testimonial:', error);
      }
    
    // You can now send this data to an API or backend
  };


    
  return (
    
    <>
    <Header/>
    <main className='flex h-full'>
        <SideBar/>
        {/* panel  */}
        <div className="w-[80%]  p-6 bg-gray-100">
        
        <h1 className="text-center mb-4 font-mono text-4xl">Testimonial Dashboard</h1>
        <div className="p-4">
        <div className="bg-white rounded shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Create Testimonial</h2>
            <Link to="/admin/testimonial">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-4 rounded">
                Back
            </button>
            </Link>
            </div>
            <hr />
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md space-y-4">
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Slug *</label>
                <input
                type="text"
                name="slug"
                required  
                value={formData.slug}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Auther</label>
                <input
                name="auther"
                type='text'
                value={formData.auther}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div> */}

            <div>
                <label className="block text-sm font-medium text-gray-700">Testimonial</label>
                <textarea
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Auther</label>
                <input
                name="creation"
                type='text'
                value={formData.creation}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Desingnation</label>
                <input
                name="desingnation"
                type='text'
                value={formData.desingnation}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
               <input type="file" name="" onChange={handelFile} id="" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                name="status"
                
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                <option value='1' >Active</option>
                <option value="0">Inactive</option>
                </select>
            </div>

            <div >
                <button
                type="submit"

                disabled={disable}
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
                >
                {disable?'Uploading.....':'Create'}
                </button>
            </div>
            </form>

        </div>
        </div>
        </div>
        
    </main>
    <Footer/>
    </>
  )
}

export default Create

