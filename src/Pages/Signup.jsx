import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import {useNavigate} from "react-router-dom"
import { userAtom } from '../state/userAtom';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();
  
  function handleClick(){
     if(!firstName || !lastName || !email || !password){
        toast.error("please fill in all fields");
        return;
     }
     setUser({firstName,lastName,email});
     navigate("/");    
  }
  
  return (
    <div className='max-h-screen'>
      <Navbar />
    <div className='h-screen flex items-center px-100 bg-cover bg-center'
         style={{backgroundImage:"url('./signup.png')"}}>
         <div className='grid grid-cols-1 gap-8 pl-80'>
            <div className='w-[320px]'>
              <h1 className='text-3xl font-bold '>Sign up</h1> 
              <p>Be part of our community — sign up to discover the latest features and deals.</p>
            </div>
            <div className='grid gap-5 items-center'>
              <input required onChange={(e)=> setFirstName(e.target.value)} type="text" placeholder='First Name' className='py-2 px-2 border rounded'/>
              <input required onChange={(e)=> setLastName(e.target.value)} type="text" placeholder='Last Name' className='py-2 px-2 border rounded'/>
              <input required onChange={(e)=> setEmail(e.target.value)} type="text" placeholder='Email Address' className='py-2 px-2 border rounded'/>
              <input required onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' className='py-2 px-2 border rounded'/>
              <p>Already have an account? Log in</p>
              <button onClick={handleClick} className='border rounded py-2 px-2 bg-black text-white'>Signup</button>
            </div>
         </div>
    </div>
    </div>
  )
}

export default Signup;
