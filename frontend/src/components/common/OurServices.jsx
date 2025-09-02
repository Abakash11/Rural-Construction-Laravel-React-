import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Http';
import { Link } from 'react-router-dom';

const OurServices = () => {
  const [services, setServices] = useState([]);

  const latestService = async () => {
    try {
      const response = await fetch(apiUrl + 'letest-service?limit=4', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    latestService();
  }, []);

  return (
    <div className="our-services my-16 px-4 md:px-8 lg:px-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <span className="text-rose-600 font-semibold text-lg uppercase tracking-wider">
          Our Services
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Our Construction Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide top-tier construction solutions tailored to your needs.
          From planning to execution, our services ensure quality and reliability
          every step of the way.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link key={index} className="no-underline" to={`/service/${service.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
              {/* Image */}
              <div className="relative group">
                <img
                  src={`${fileUrl}uplodes/services/small/${service.image}`}
                  alt={service.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">
                  {service.short_des}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <Link
        to="services"
        className="btn bg-dark text-white min-w-[10%] mx-[45%] text-center block py-2 rounded-lg"
      >
        View All Services
      </Link>
    </div>
  );
};

export default OurServices;
