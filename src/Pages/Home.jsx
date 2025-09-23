import React,{useState} from 'react'
import HeroSection from '../Components/HeroSection';
import Navbar from '../Components/Navbar';

function Home() {

  return (
    <div className='min-h-screen px-4'>
        <div className='grid grid-cols-1'>
            <Navbar /> 
            <HeroSection />
        </div>
    </div>
  )
}

export default Home