import React, { useContext } from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
import SideBar from '../common/SideBar'




function Dashbord() {
  
  return (
    <div>
      <Header/>
      
      <main className='flex h-screen'>
        <div className="w-full  lg:w-[20%]">
          <SideBar />
        </div>
          
          <div className="w-[80%] h-screen p-6 bg-gray-100">
          <div className='w-screen'></div>
          <h1 className="text-center mb-4 font-mono text-4xl">Admin Dashboard</h1>
          
          </div>

      </main>
      <Footer/>
    </div>
  )
}

export default Dashbord
