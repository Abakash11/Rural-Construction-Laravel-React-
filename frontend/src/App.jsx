
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom'
import Home from './components/frontend/home';
import About from './components/frontend/About';
import Login from './components/backend/Login';
import Dashbord from './components/backend/Dashbord';
import RequireAuth from './components/common/RequireAuth';
import Services from './components/frontend/Services';

import Projects from './components/frontend/Projects';
import Blog from './components/frontend/Blog';
import ContactUs from './components/frontend/ContactUs';
// service import 
import {default as Showservices} from './components/backend/services/Show';
import {default as Createservices} from './components/backend/services/Create';
import {default as Editservices} from './components/backend/services/Edit';
// project import 
import {default as ShowProjects} from './components/backend/projects/Show';
import {default as CreateProjects} from './components/backend/projects/Create';
import {default as EditProjects} from './components/backend/projects/Edit';
// blog impore 
import {default as ShowBlog } from './components/backend/blogs/Show';
import {default as CreateBlog } from './components/backend/blogs/Create';
import {default as EditBlog } from './components/backend/blogs/Edit';
// testimonial import 
import {default as ShowTestimonial } from './components/backend/testimonial/Show';
import {default as CreateTestimonial } from './components/backend/testimonial/Create';
import {default as EditTestimonial } from './components/backend/testimonial/Edit';
// testimonial import 
import {default as ShowMembers } from './components/backend/members/Show';
import {default as CreateMembers } from './components/backend/members/Create';
import {default as EditMembers } from './components/backend/members/Edit';
import ServiceDetails from './components/frontend/ServiceDetails';
import ProjectDetails from './components/frontend/ProjectDetails';
import BlogDetails from './components/frontend/BlogDetails';

function App() {


  return (
    <>
      <Routes>
        {/* clint panel  */}
        <Route path='/' element={<Home/>}/>  
        <Route path='/about' element={<About/>}/> 
        <Route path='/services' element={<Services/>}/> 
        <Route path='/service/:id' element={<ServiceDetails/>}/> 
        <Route path='/projects' element={<Projects/>}/> 
        <Route path='/project/:id' element={<ProjectDetails/>}/> 
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/blog/:id' element={<BlogDetails/>}/>
        <Route path='/contact' element={<ContactUs/>}/>

        {/* admin side  */}
        <Route path='/admin/login' element={<Login/>}/>
        <Route path='/admin/dashboard' element={<RequireAuth><Dashbord/></RequireAuth>}/>
        {/* services form  */}
        <Route path='/admin/services' element={<RequireAuth><Showservices/></RequireAuth>}/>
        <Route path='/admin/services/create' element={<RequireAuth><Createservices/></RequireAuth>}/>
        <Route path="/admin/services/edit/:serviceId" element={<RequireAuth><Editservices/></RequireAuth>}/>
        {/* projects form  */}
        <Route path='/admin/projects' element={<RequireAuth><ShowProjects/></RequireAuth>}/>
        <Route path='/admin/projects/create' element={<RequireAuth><CreateProjects/></RequireAuth>}/>
        <Route path='/admin/projects/edit/:id' element={<RequireAuth><EditProjects/></RequireAuth>}/>
        {/* blogs form  */}
        <Route path='/admin/blogs' element={<RequireAuth><ShowBlog/></RequireAuth>}/>
        <Route path='/admin/blogs/create' element={<RequireAuth><CreateBlog/></RequireAuth>}/>
        <Route path='/admin/blogs/edit/:id' element={<RequireAuth><EditBlog/></RequireAuth>}/>
        {/* testimonial  */}
        <Route path='/admin/testimonial' element={<RequireAuth><ShowTestimonial/></RequireAuth>}/>
        <Route path='/admin/testimonial/create' element={<RequireAuth><CreateTestimonial/></RequireAuth>}/>
        <Route path='/admin/testimonial/edit/:id' element={<RequireAuth><EditTestimonial/></RequireAuth>}/>
        {/* members  */}
        <Route path='/admin/members' element={<RequireAuth><ShowMembers/></RequireAuth>}/>
        <Route path='/admin/members/create' element={<RequireAuth><CreateMembers/></RequireAuth>}/>
        <Route path='/admin/members/edit/:id' element={<RequireAuth><EditMembers/></RequireAuth>}/>
      </Routes>
      

    </>
  )
}

export default App
