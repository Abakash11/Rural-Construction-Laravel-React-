
import { useEffect, useState } from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import { apiUrl, fileUrl } from '../common/Http';
import { Link } from 'react-router-dom';
import Lodder from '../common/Lodder';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Services() {
  const [services, setServices] = useState([]);
  const [Lodding,setLodding]=useState(false)
  const fetchServices= async()=>{
        try {    
          setLodding(true)
        const response = await fetch(apiUrl + 'get-service', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        setServices(data.data);
        setLodding(false)

      } catch (error) {
        console.error('Error fetching services:', error);
        
      }
    }

  useEffect(() => {fetchServices()}, []);

  return (
    <>
    <Header/>
    <main>
      {/* Hero section */}
      <section className="w-full h-screen relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="background-color: #ec4899; width: 12px; height: 12px; margin: 0 6px;"></span>`;
            }
          }}
          navigation={true}
          loop={true}
          speed={1000}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1523834347582-1a5b9ef3419b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="architecture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  Full Architecture
                </h2>
                <p className="text-xl md:text-3xl max-w-2xl animate-fade-in-delay">
                  KUNDLI-MANESAR-PALWAL Villa
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src="https://plus.unsplash.com/premium_photo-1750890675827-d4e6ab2f8c20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Painting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  First Class Services
                </h2>
                <p className="text-xl md:text-3xl max-w-2xl">
                  World-Class Infrastructure
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1664728796715-465b06b19050?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Safety"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Safety is our top priority
                </h2>
                <p className="text-xl md:text-3xl max-w-2xl">
                  Strict adherence to safety standards
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Services section  */}
      {Lodding?(<div className='h-[100vh] w-[100vw] flex justify-center items-center'><Lodder/></div>)
      :(<section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-pink-500 font-semibold uppercase tracking-wide">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Our construction services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We specialize in a wide range of construction services: residential, commercial, and industrial.
          </p>

          {/* Cards (static) */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            {services.map((service, index) => (
              <div
              tabIndex={0}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 focus:outline-none"
            >
              {/* image */}
              <img
                src={`${fileUrl}uplodes/services/small/${service.image}`}
                alt="Specialty Construction"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* subtle inner glow */}
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-3xl pointer-events-none" />
              {/* dark fade (hidden by default on md+) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                              opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* content */}
              <div
                className="absolute inset-x-0 bottom-0 z-10 p-6
                          text-left text-white
                          translate-y-0 md:translate-y-8
                          md:opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-500"
              >
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-200">
                 {service.short_des}
                </p>
                <Link to={`/service/${service.id}`} className="mt-4 inline-flex no-underline text-white font-semibold items-center rounded-md bg-pink-500 px-4 py-2 text-sm hover:bg-pink-600">
                  Read More
                </Link>
              </div>
              {/* keep height */}
              <div className="invisible aspect-[4/3]" />
            </div>
            ))}
            

          </div>
        </div>
      </section>)}
      
    </main>
    <Footer/>
    </>
  )
}

export default Services
