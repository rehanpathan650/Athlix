import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import {useNavigate} from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleClick(){
     localStorage.setItem("isLoggedin",JSON.stringify(true));
     navigate("/");    
  }
  
  return (
    <div className='min-h-screen gap-2'>
      <Navbar />
    <div className='h-screen flex items-center px-100 bg-cover bg-center'
         style={{backgroundImage:"url('./login.png')"}}>
         <div className='grid grid-cols-1 gap-8'>
            <div className='w-[320px]'>
              <h1 className='text-3xl font-bold'>Welcome Back</h1> 
              <p>Log in now to explore all the features and benefits of our platform and see what's new</p>
            </div>
            <div className='grid gap-5 items-center'>
              <input required onChange={(e)=> setEmail(e.target.value)} type="text" placeholder='Email Address' className='py-2 px-2 border rounded'/>
              <input required onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' className='py-2 px-2 border rounded'/>
              <p>Forget Password?</p>
              <button onClick={handleClick} className='border rounded py-2 px-2 bg-black text-white'>Login</button>
            </div>
         </div>
    </div>
    </div>
  )
}

export default Login;
