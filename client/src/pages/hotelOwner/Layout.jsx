import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/HotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner,navigate}=useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='h-screen'>
      <Navbar />

      <div className='flex pt-20 h-[calc(100vh-80px)]'>
        <Sidebar />

        <div className='flex-1 p-6 md:px-10 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout