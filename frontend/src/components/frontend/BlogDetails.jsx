import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiUrl, fileUrl } from "../common/Http";
import Header from "../common/header";
import Footer from "../common/footer";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${apiUrl}single-blog/${id}`);
        const json = await res.json();
        setBlog(json.data);
      } catch (error) {
        console.error("Error fetching single blog:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAllBlogs = async () => {
      try {
        const res = await fetch(`${apiUrl}get-blog`);
        const json = await res.json();
        setBlogs(json.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlog();
    fetchAllBlogs();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-300"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Blog Details */}
          <section className="lg:col-span-2">
            {blog && (
              <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 mb-10 border border-cyan-100 transition-all duration-300">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4 leading-tight tracking-tight">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center text-gray-500 text-base mb-6">
                  <span>By <span className="font-semibold text-cyan-700 ml-1 mr-2">{blog.auther}</span></span>
                  &bull;
                  <span className="text-indigo-500 ml-2">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </div>
                <img
                  src={`${fileUrl}uplodes/blogs/large/${blog.image}`}
                  alt={blog.title}
                  className="w-full max-h-96 object-cover rounded-xl shadow mb-8 border border-cyan-200"
                  loading="lazy"
                />
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </p>
              </article>
            )}
          </section>
          {/* Sidebar */}
          <aside className="space-y-7 lg:sticky lg:top-24 h-fit">
            <h2 className="text-2xl font-semibold text-indigo-800 border-b pb-2">
              Related Blogs
            </h2>
            <div className="space-y-5">
              {blogs
                .filter((item) => item.id !== blog?.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.id}`}
                    className="flex items-center gap-4 bg-white rounded-xl shadow hover:shadow-cyan-200 hover:-translate-y-1 p-4 border border-cyan-100 transition-all duration-200"
                  >
                    <img
                      src={`${fileUrl}uplodes/blogs/small/${item.image}`}
                      alt={item.title}
                      className="w-24 h-20 object-cover rounded-md ring-1 ring-cyan-100"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-indigo-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-cyan-700 mt-2">
                        {item.auther}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetails;
