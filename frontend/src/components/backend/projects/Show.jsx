import { useEffect, useState } from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import SideBar from '../../common/SideBar';
import { apiUrl, token } from '../../common/Http';
import { Link } from 'react-router-dom';
import Lodder from '../../common/Lodder';
import { toast } from 'react-toastify';

function Show() {
  const [isLodding, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + 'project', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token()}`
        }
      });
      const data = await response.json();
      setProjects(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setIsLoading(false);
    }
  };

  const deleteProjects = async (Id) => {
    try {
      if(confirm("Are you sure you want to delete this service?")) {
        const response = await fetch(apiUrl + 'project/'+ Id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token()}`
        }
      });
      const res = await response.json();
      if(res.status == true) {
        toast.success(res.message);
        const newProjects = projects.filter(project => project.id !== Id);
        setProjects(newProjects);
      }else{
        toast.error(res.message);
      }
      
      console.log(res);
      
      } 
      
    } catch (error) {
      console.error('Error Deleting project:', error);
      
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Header />

      <main className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full  lg:w-[20%]">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="w-full lg:w-[80%] p-4 bg-gray-100">
          <h1 className="text-center mb-4 font-mono text-2xl md:text-4xl">Project Dashboard</h1>

          <div className="bg-white rounded shadow-md p-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-lg font-semibold">Projects</h2>
              <Link to="/admin/projects/create">
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
                  CREATE
                </button>
              </Link>
            </div>

            <hr className="mb-4" />

            {isLodding ? (
              <div className='flex justify-center items-center h-80'>
                    <Lodder/>
                </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-left border-t border-gray-200 text-sm md:text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 font-medium text-gray-600">ID</th>
                        <th className="px-4 py-2 font-medium text-gray-600">Name</th>
                        <th className="px-4 py-2 font-medium text-gray-600">Slug</th>
                        <th className="px-4 py-2 font-medium text-gray-600">Status</th>
                        <th className="px-4 py-2 font-medium text-center text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">{project.id}</td>
                          <td className="px-4 py-2">{project.title}</td>
                          <td className="px-4 py-2">{project.slug}</td>
                          <td className="px-4 py-2">{project.status ? 'Active' : 'Block'}</td>
                          <td className="px-4 py-2 flex flex-wrap gap-2 justify-center">
                            <Link to = {`/admin/projects/edit/${project.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                              Edit
                            </Link>
                            <button onClick={()=>deleteProjects(project.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                      <p><span className="font-semibold">ID:</span> {project.id}</p>
                      <p><span className="font-semibold">Name:</span> {project.title}</p>
                      <p><span className="font-semibold">Slug:</span> {project.slug}</p>
                      <p>
                        <span className="font-semibold">Status:</span>{' '}
                        {project.status ? 'Active' : 'Block'}
                      </p>
                      <div className="flex gap-2 mt-3">
                        
                        <Link to = {`/admin/projects/edit/${project.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Edit
                        </Link>
                        <button onClick={()=>deleteProjects(project.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};



export default Show
