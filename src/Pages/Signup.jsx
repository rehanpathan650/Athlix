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
  const [loading, setLoading] = useState(false);

  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  async function handleClick() {
  if (!firstName || !lastName || !email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  setLoading(true); // optional loading state

  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    // Save user in Recoil
    setUser(data);

    // Persist login
    localStorage.setItem("user", JSON.stringify(data));

    toast.success(`Welcome, ${data.name}!`);
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
        style={{backgroundImage:"url('./signup.png')"}}
      >
        <div className='bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md max-w-sm w-full space-y-6'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold'>Sign Up</h1> 
            <p className='text-sm sm:text-base text-gray-700'>
              Be part of our community — sign up to discover the latest features and deals.
            </p>
          </div>
          <div className='grid gap-4'>
            <input 
              required 
              onChange={(e)=> setFirstName(e.target.value)} 
              type="text" 
              placeholder='First Name' 
              className='py-2 px-3 border rounded w-full'
            />
            <input 
              required 
              onChange={(e)=> setLastName(e.target.value)} 
              type="text" 
              placeholder='Last Name' 
              className='py-2 px-3 border rounded w-full'
            />
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
            <p className='text-sm'>
              Already have an account?{" "}
              <span 
                onClick={()=>navigate("/login")} 
                className='text-blue-600 cursor-pointer'
              >
                Log in
              </span>
            </p>
            <button 
              onClick={handleClick} 
              className='w-full border rounded py-2 px-3 bg-black text-white font-semibold'
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
