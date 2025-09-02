import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiUrl, fileUrl } from './Http';

const OurTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  const latestTestimonial = async () => {
    try {
      const response = await fetch(apiUrl + 'letestTestimonial?limit=8', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setTestimonials(data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  useEffect(() => {
    latestTestimonial();
  }, []);

  return (
    <div>
      <section>
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-rose-500 uppercase text-md font-bold mb-2 tracking-wide">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What people are saying about us
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Swiper */}
        <div className="swiper-div max-w-[65%] mb-4 mx-auto">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 }, // Mobile: 1 card
              640: { slidesPerView: 1.2 }, // Small tablets: 1.2 cards
              768: { slidesPerView: 2 }, // Tablets: 2 cards
              1024: { slidesPerView: 3 }, // Laptops & up: 3 cards
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white shadow-md rounded-xl p-6 max-w-sm flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {testimonial.testimonial}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center mt-auto">
                    <img
                      src={`${fileUrl}uplodes/testimonial/small/${testimonial.image}`}
                      alt={testimonial.creation || 'Client'}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.auther || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.desingnation || 'Member'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default OurTestimonial;
