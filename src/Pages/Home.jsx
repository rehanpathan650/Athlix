import React,{useState} from 'react'
import HeroSection from '../Components/HeroSection';
import Navbar from '../Components/Navbar';
import FeaturedProducts from '../Components/FeaturedProducts';
import Footer from "../Components/Footer";

function Home() {

  return (
    <div className='min-h-screen'>
        <div className='grid grid-cols-1 gap-1'>
            <Navbar /> 
            <HeroSection />
            <FeaturedProducts />
            <Footer />
        </div>
    </div>
  )
}

export default Home