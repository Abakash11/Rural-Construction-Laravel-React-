import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Http';
import { Link } from 'react-router-dom';

const OurProject = () => {
  const [projects, setProjects] = useState([]);

  const latestproject = async () => {
    try {
      const response = await fetch(apiUrl + 'letest-project?take=4', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    latestproject();
  }, []);

  return (
    <div>
      <section className="our-services my-16 px-4 md:px-8 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-rose-600 font-semibold text-lg uppercase tracking-wider">
            Our Projects
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Our Construction Projects
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide top-tier construction solutions tailored to your needs.
            From planning to execution, our services ensure quality and
            reliability every step of the way.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <Link key={project.id} to={`project/${project.id}`} className="no-underline">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
                {/* Image Section */}
                <div className="relative group">
                  <img
                    src={`${fileUrl}uplodes/projects/small/${project.image}`}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                      Read More
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {project.sort_desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link
          to="projects"
          className="btn bg-dark text-white min-w-[10%] mx-[45%] text-center block py-2 rounded-lg"
        >
          View All Projects
        </Link>
      </section>
    </div>
  );
};

export default OurProject;
