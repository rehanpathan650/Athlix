import React from 'react'
import FImage from "../assets/404.png";
import Navbar from '../Components/Navbar';

function FourOFour() {
  return (
    <div className='grid grid-cols-1'>
    <Navbar />
    <div className='flex justify-center items-center'>
    <img className="h-200 w-200" src={FImage} alt="404 image"></img>
    </div>
    </div>
  )
}

export default FourOFour
