import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import {useNavigate} from "react-router-dom"
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../state/userAtom';
import {toast} from "react-toastify"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom)

  const navigate = useNavigate();

  async function handleClick() {
  if (!email || !password) {
    toast.error("Please fill in both email and password");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // ✅ Must stringify
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save user in Recoil
    setUser(data);

    // Persist login
    localStorage.setItem("user", JSON.stringify(data));

    toast.success(`Welcome back, ${data.name}!`);
    navigate("/"); // Redirect to home
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
}

  
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div 
        className='flex-1 flex items-center justify-center bg-cover bg-center px-4 sm:px-6'
        style={{backgroundImage:"url('./login.png')"}}
      >
        <div className='bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md max-w-sm w-full space-y-6'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold'>Welcome Back</h1> 
            <p className='text-sm sm:text-base text-gray-700'>
              Log in now to explore all the features and benefits of our platform.
            </p>
          </div>
          <div className='grid gap-4'>
            <input 
              required 
              onChange={(e)=> setEmail(e.target.value)} 
              type="text" 
              placeholder='Email Address' 
              className='py-2 px-3 border rounded w-full'
            />
            <input 
              required 
              onChange={(e)=> setPassword(e.target.value)} 
              type="password" 
              placeholder='Password' 
              className='py-2 px-3 border rounded w-full'
            />
            <p className='text-sm text-right text-blue-600 cursor-pointer'>
              Forgot Password?
            </p>
            <button 
              onClick={handleClick} 
              className='w-full border rounded py-2 px-3 bg-black text-white font-semibold'
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
