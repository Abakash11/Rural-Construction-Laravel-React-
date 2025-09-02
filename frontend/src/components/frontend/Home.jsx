import aboutImg from '../../assets/images/about-us.jpg'
import Header from '../common/header';
import Footer from '../common/footer';
import 'swiper/css';
import 'swiper/css/pagination';
import OurProject from '../common/OurProject';
import OurServices from '../common/OurServices';
import OurBlogs from '../common/OurBlogs';
import OurTestimonial from '../common/OurTestimonial';


const Home = () => {
  
  return (
    <div>
      {/* header  */}
      <Header/>
    
      <main>
        {/* hero section  */}
        <section className="hero text-center flex justify-center items-center" >
            <div className="hero-tag ">
                <p className='text-fuchsia-700 text-2xl font-bold' >Welcome Amazing Construction</p>
                <h2 className='text-6xl text-pink-600 tag-head font-serif ' >Crafting dreams with <br /> precision and excellence</h2>
                <div className="btn-group gap-4">
                    <a className=' btn btn-dark mt-4' href="">Contact Now</a>
                    <a className=' btn btn-warning mt-4' href="">View Project</a>
                </div>
                
            </div>
            

        </section>
        
        {/* aboutus section  */}
        <section className="about-us mx-auto mt-14  w-[80%] ">
          <div className="row">
            <div className="col-md-6">
            <img src={aboutImg} className='w-[90%] ml-11 rounded-3xl' alt="" />
            </div>
            <div className="col-md-6  ">
              <h2 className='text-orange-500'>About</h2>
              <h4>Lorem ipsum dolor sit amet.</h4>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non saepe, ducimus soluta, dicta optio illo deleniti ut incidunt natus veritatis, tempora sed. Quod, quidem hic minus perspiciatis sequi impedit consectetur.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique alias consectetur explicabo in maxime vitae nostrum quas laudantium animi a atque minima, sequi ullam rem suscipit architecto harum cum ratione quis amet aspernatur. Ipsum minus libero, iste officia quam quae?</p>
            </div>
          </div>
        </section>

        {/* Our services  */}
        <OurServices/>
        
        {/* Why choose us  */}
        <section>
          <div className="why-choose-us px-4 md:px-8 lg:px-20 py-16 bg-white text-center">
              {/* Section Heading */}
              <div className="mb-12">
                <p className="text-rose-500 font-semibold tracking-widest uppercase mb-2">Why Choose Us</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover our wide variety of projects.</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Created in close partnership with our clients and collaborators, this approach merges industry expertise, decades of experience, innovation, and flexibility to consistently deliver excellence.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl transition duration-300">
                  <div className="text-yellow-400 text-4xl mb-4">
                    💡 {/* Replace with icon or SVG if desired */}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Cutting-Edge Solutions</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl transition duration-300">
                  <div className="text-yellow-400 text-4xl mb-4">
                    🛠️
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Superior Craftsmanship</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl transition duration-300">
                  <div className="text-yellow-400 text-4xl mb-4">
                    🧠
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Knowledge and Expertise</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.
                  </p>
                </div>
              </div>
            </div>

        </section>

        {/* our projects  */}     
        <OurProject/>

        {/* Testimonial Section  */}
        <OurTestimonial/>

        {/* Blog & News  */}
        <OurBlogs/>
       
      
      </main>

    {/* footer  */}
    <Footer/>


    </div>
  )
}

export default Home
