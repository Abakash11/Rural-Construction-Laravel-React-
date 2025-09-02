
import Footer from '../common/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/Http';
import { Link } from 'react-router-dom';
import Header from '../common/header';
import Lodder from '../common/Lodder'
function Projects() {
  const [isLodding,setLodding]=useState(false)
  const [projects, setProjects] = useState([]);
  const latestproject=async()=>{
        try {  
          setLodding(true)  
        const response = await fetch(apiUrl + 'get-project', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        setLodding(false)
        setProjects(data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        
      }
    }
  useEffect(() => {
          latestproject();
      }, []);
  console.log(projects);
          
  return (
    <>
    <Header/>
    <main>
        {/* Hero section  */}
        <section className="w-full h-[100vh] ">
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
        >
            {/* Slide 1 */}
            <SwiperSlide>
            <div className="relative w-full h-full">
                <img
                src="https://images.unsplash.com/photo-1699229097229-ecd2a075c055?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="KMP Expressway"
                className="w-full h-full object-cover"
                />
                {/* Overlay text */}
                <div className="absolute bottom-10 right-10 text-right text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                    KMP EXPRESSWAY, HARYANA
                </h2>
                <p className="text-lg md:text-2xl">
                    KUNDLI-MANESAR-PALWAL EXPRESSWAY
                </p>
                </div>
            </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
            <div className="relative w-full h-full">
                <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Villa"
                className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 right-10 text-right text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                    DELHI FORT VILLA
                </h2>
                <p className="text-lg md:text-2xl">World-Class Road Infrastructure</p>
                </div>
            </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
            <div className="relative w-full h-full">
                <img
                src="https://images.unsplash.com/photo-1677475718184-efaac3b08a6e?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Highway"
                className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 right-10 text-right text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                    NATIONAL HIGHWAY PROJECTS
                </h2>
                <p className="text-lg md:text-2xl">Transforming Connectivity</p>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>
        </section>
        {/* our project  */}
        {isLodding?(<div className='h-[100vh] w-[100vw] flex justify-center items-center'><Lodder/></div>):(<section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-pink-500 font-semibold uppercase tracking-wide">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Our construction services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We specialize in a wide range of construction services: residential, commercial, and industrial.
          </p>

          {/* Cards (static) */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            {projects.map((project)=>(
              <div
              
              key={project.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 focus:outline-none"
            >
              {/* image */}
              <img
                src={`${fileUrl}uplodes/projects/small/${project.image}`}
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
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-200">
                 {project.sort_desc}
                </p>
                <Link to={`/project/${project.id}`} className="mt-4 inline-flex no-underline text-white items-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold hover:bg-pink-600">
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

export default Projects
