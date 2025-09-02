import Header from '../common/header'
import Footer from '../common/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';
import {apiUrl, fileUrl} from '../common/Http'



const About = () => {
  const backgroundStyle = {
    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1721856199545-47030b3094a2?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  };

  const [members,setMembers]=useState([]);
  const fetchMembers=async()=>{
    try {
      const response = await fetch(apiUrl+'get-members',{
        method:'GET',
        headers: {
          "Content-Type": "application/json",    
          'Accept': 'application/json'
          },
      })
      const res=await response.json();
      const data=res.data;
      setMembers(data);
      
    } catch (error) {
      console.log('Error in fetching Members',error);
      
    }
  }
  useEffect(()=>fetchMembers,[])
  return (
    <div>
      <Header/>
      <main>
        {/* hero section  */}
        <section style={backgroundStyle} className="relative text-center flex justify-center items-center" >
            <div className="hero-tag absolute left-10">
                <p className='text-fuchsia-700 text-2xl font-bold' >Quality . Integrity . Value</p>
                <h2 className='text-6xl text-pink-600 font-mono ' >About Us</h2>
                <p className='text-2xl font-serif'>We offer a diverse array of construction services, <br/>spanning residential, commercial, and industrial projects.</p>
                
            </div>
            

        </section>
        {/* Founder of Rural Construction  */}
        <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">
            Founder of <span className="font-bold">Rural Construction</span>
          </h2>
          <p className="mb-6 text-gray-800 leading-relaxed">
            Shri. Xyz Trump started out as a small contractor undertaking and
            supervising the construction of irrigation systems. An early entrant
            in the field of construction, he observed the challenges and pitfalls
            faced by a nation building a new future.
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            He established Rural Construction in the mid 50s and led from the front,
            quickly establishing the company’s and leadership’s reputation as fair,
            effective, and community-oriented. A philanthropist, he worked
            tirelessly toward community development and social empowerment. He was
            responsible for many noteworthy achievements in the Erode region, such
            as the KVIT Trust that today runs many schools and colleges.
          </p>
          <p className="text-gray-800 leading-relaxed">
            Nearly 70 years later, the company is today a symbol of his ideals, his
            values and the integrity he brought to the business of construction.
            His legacy has been carried forward, and Rural Construction continues to
            make a mark and strengthen development in India.
          </p>
        </div>

        {/* Image and Name */}
        <div className="md:w-1/2 flex flex-col items-center text-center">
          <img
            src="https://unsplash.com/photos/person-holding-foundr-book-Etxsv8WiFjM"
            alt="Shri U.R. Chinnusamy"
            className="rounded-lg shadow-lg max-w-xs w-full mb-4"
          />
          <h3 className="font-semibold text-lg">Shri. Xyz Trump</h3>
          <p className="text-gray-700">Founder, Rural Construction</p>
        </div>
        </section>
        {/* our team  */}
        {/* Our Team Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-100 via-pink-100 to-yellow-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Heading */}
            <h3 className="text-sm font-semibold text-pink-600 uppercase tracking-wider">
              Meet the Experts
            </h3>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Our Team</h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              Passionate professionals delivering quality construction services — residential, commercial, and industrial.
            </p>

            {/* Swiper Carousel */}
            <div className="mt-12">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {members.map((member, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white/70 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <img
                        src={`${fileUrl}uplodes/members/small/${member.image}`}
                        alt={member.name}
                        className="w-full h-72 object-cover"
                      />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.job_title}</p>
                        <a href={member.linkedIn} className="mt-3 inline-block text-gray-500 hover:text-blue-600">
                          <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                          <svg class="rounded-md transition-all duration-300 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6975 11C12.6561 11 11 12.6057 11 14.5838V57.4474C11 59.4257 12.6563 61.03 14.6975 61.03H57.3325C59.3747 61.03 61.03 59.4255 61.03 57.4468V14.5838C61.03 12.6057 59.3747 11 57.3325 11H14.6975ZM26.2032 30.345V52.8686H18.7167V30.345H26.2032ZM26.6967 23.3793C26.6967 25.5407 25.0717 27.2703 22.4615 27.2703L22.4609 27.2701H22.4124C19.8998 27.2701 18.2754 25.5405 18.2754 23.3791C18.2754 21.1686 19.9489 19.4873 22.5111 19.4873C25.0717 19.4873 26.6478 21.1686 26.6967 23.3793ZM37.833 52.8686H30.3471L30.3469 52.8694C30.3469 52.8694 30.4452 32.4588 30.3475 30.3458H37.8336V33.5339C38.8288 31.9995 40.6098 29.8169 44.5808 29.8169C49.5062 29.8169 53.1991 33.0363 53.1991 39.9543V52.8686H45.7133V40.8204C45.7133 37.7922 44.6293 35.7269 41.921 35.7269C39.8524 35.7269 38.6206 37.1198 38.0796 38.4653C37.8819 38.9455 37.833 39.6195 37.833 40.2918V52.8686Z" fill="#006699"/>
                          </svg>
                          
                          </button>
                        {member.name}
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>


      </main>
      <Footer/>
    </div>
  )
}

export default About
