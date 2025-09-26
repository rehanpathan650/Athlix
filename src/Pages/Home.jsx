import React,{useState} from 'react'
import HeroSection from '../Components/HeroSection';
import Navbar from '../Components/Navbar';
import FeaturedProducts from '../Components/FeaturedProducts';
import Footer from "../Components/Footer";
import RunnersChoice from '../Components/RunnersChoice';

function Home() {

  return (
    <div className='min-h-screen'>
        <div className='flex flex-col gap-1'>
            <Navbar /> 
            <HeroSection />
            <FeaturedProducts />
            <RunnersChoice />
            <Footer />
        </div>
    </div>
  )
}

export default Home