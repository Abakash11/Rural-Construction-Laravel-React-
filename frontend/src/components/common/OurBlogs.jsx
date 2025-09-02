import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl } from './Http'
import { Link } from 'react-router-dom'

const OurBlogs = () => {
    const [blogs,setBlog]=useState([])
    const fetchLetestBlogs=async()=>{
        try {
            const response=await fetch(apiUrl + 'letest-blog?take=3',{
                method:'GET',
                headers:{
                    'Accept':'application/json'
                }
            })
            const data=await response.json();
            setBlog(data.data)

        } catch (error) {
            console.error('letest blog not fetched')
        }
    }
    useEffect(()=>{
        fetchLetestBlogs()
    },[])
    console.log(blogs);
    


  return (
    <div>
        <section className="py-16 px-4 bg-white text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-pink-600 font-semibold text-sm uppercase">Blog & News</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            <span className=" px-2 ">
              Articles & blog posts
            </span>
          </h2>
          <p className="text-gray-600 mt-4">
            We specialize in a wide range of construction services, including residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        

          {/*Blogs Card  */}
         {blogs.map((blog)=>(
         <div key={blog.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
            <img
              src={`${fileUrl}uplodes/blogs/small/${blog.image}`}
              alt="Commercial blogs"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow text-left">
              <h3 className="text-md font-semibold mb-4">
                {blog.title}
              </h3>
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block text-center no-underline bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-pink-600"
              >
                Read More
              </Link>
            </div>
          </div>))}
          
        </div>

        {/* View All Blogs Button */}
        <div className="mt-12">
          <Link to={'/blogs'} className="bg-black no-underline text-white px-6 py-3 rounded font-semibold hover:bg-pink-600">
            View All Blogs
          </Link>
        </div>
       </section>
      
    </div>
  )
}

export default OurBlogs
