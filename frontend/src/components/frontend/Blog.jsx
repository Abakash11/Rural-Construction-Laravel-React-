import React, { useEffect, useState } from 'react'
import Header from '../common/header';
import Footer from '../common/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {apiUrl, fileUrl} from '../common/Http'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const allblogs = async () => {
    try {    
      const response = await fetch(apiUrl + 'get-blog', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    allblogs();
  }, []);

  return (
    <>
      <Header/>
      <main className="min-h-screen">
       

        {/* Blog section with horizontal cards */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-pink-500 font-semibold uppercase tracking-wider text-sm mb-2">
                Blog & News
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Articles & Blog Posts
              </h2>
              <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We offer a diverse array of construction services, spanning
                residential, commercial, and industrial projects.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col md:flex-row h-auto md:h-72"
                    >
                      <div className="md:w-2/5 h-[25rem] overflow-hidden">
                        <img
                          src={`${fileUrl}uplodes/blogs/small/${blog.image}`}
                          alt={blog.title}
                          
                          className="w-full h-full md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.content || "Discover more about this exciting project and our approach to delivering world-class infrastructure solutions that connect communities and drive economic growth."}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-500">
                            {blog.date || "May 15, 2023"}
                          </span>
                          <Link
                            to={`/blog/${blog.id}`}
                            className="inline-flex items-center no-underline text-pink-600 font-medium hover:text-pink-700 transition-colors group/btn px-4 py-2 bg-pink-50 rounded-lg hover:bg-pink-100"
                          >
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            )}
            
            {!loading && blogs.length === 0 && (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700">No blog posts available</h3>
                <p className="text-gray-500 mt-2">Check back later for new content.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer/>
      
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}

export default Blog