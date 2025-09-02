import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiUrl, fileUrl } from "../common/Http";
import Lodder from "../common/Lodder";
import Header from "../common/header";
import Footer from "../common/footer";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch single project
  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}single-project/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project details");
      const data = await res.json();
      setProject(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all projects for sidebar
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}get-project`);
      if (!res.ok) throw new Error("Failed to fetch projects list");
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProjects();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-3">Loading project details...</p>
        <Lodder />
      </div>
    );
  }
  
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!project) return <div className="p-6">No project found.</div>;

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 bg-indigo-600 text-white p-2 rounded-md shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <main className="flex">
        {/* Sidebar Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 lg:w-[18%] bg-gradient-to-b from-gray-800 to-gray-900 text-white py-6 px-4 shadow-xl border-r border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Our Projects
            </h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <ul className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
            {projects.map((proj) => (
              <li key={proj.id}>
                <Link
                  to={`/project/${proj.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-3 text-yellow-300 font-serif no-underline font-bold rounded-lg transition-all duration-200 ${
                    parseInt(id) === proj.id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-700 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  <svg 
                    className={`w-4 h-4 mr-3 transition-all duration-200 ${
                      parseInt(id) === proj.id ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="truncate">{proj.title}</span>
               
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <Link
              to="/projects"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-center text-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              View All Projects
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 min-h-screen py-8 px-4 lg:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <h1 className="text-3xl text-center md:text-4xl font-bold mb-2">
                {project.title}
              </h1>
              
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {/* Image */}
              <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                <img
                  src={`${fileUrl}uplodes/projects/large/${project.image}`}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              </div>

              {/* Content */}
              <div className="prose max-w-none mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Project Details
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.content}
                </p>
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Project ID:</span>
                  <span className="ml-1">{project.id}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                  >
                    Active
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Location:</span>
                  <span className="ml-1">{project.location || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m2 0h4m4 0h4"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Construction Type:</span>
                  <span className="ml-1">{project.construction_type || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m2 0h4m4 0h4"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Sector:</span>
                  <span className="ml-1">{project.sector || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Created:</span>
                  <span className="ml-1">
                    {project.created_at
                      ? formatDate(project.created_at)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span className="font-medium text-gray-900">Updated:</span>
                  <span className="ml-1">
                    {project.updated_at
                      ? formatDate(project.updated_at)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                  Interested in similar projects?
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;