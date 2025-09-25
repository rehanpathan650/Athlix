import React,{useState} from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { IoCartOutline } from "react-icons/io5";

function Navbar() {
    const [isLoggedin, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedin")) || false);
    const navigate = useNavigate();
  
    return (
         <nav className='flex justify-between items-center border-b border-gray-200 shadow-sm px-4 py-0 my-0'>
                 <div>
                    <button onClick={()=> {navigate("/")}}>
                    <img src="./athlix2.png" alt="" sizes='20' className='h-20 pl-2'/>
                    </button>
                 </div>
                 <div className='flex gap-10 text-gray-500'>
                    <div>
                     <button onClick={()=> {navigate("/about")}}>About</button>
                    </div>
                    <div>
                     <button onClick={()=> {navigate("/product")}}>Product</button>
                    </div>
                    <div className='relative w-72'>
                     <input type="text" className='w-full pl-3 pr-10 py-1 rounded bg-gray-100 text-black' placeholder='Search'/>
                     <IoIosSearch className='absolute right-2 top-2' />
                    </div>
                 </div>
                 <div className='text-gray-500'>
                      {isLoggedin ? ( 
                        <div className='flex gap-5'>
                            <FaRegUser size={20}/>
                            <IoCartOutline size={24}/>
                            <button onClick={()=> {
                                localStorage.setItem("isLoggedin", JSON.stringify(false));
                                setIsLoggedIn(false)
                                navigate("/");
                            }} className=''>Logout</button>
                        </div> 
                    ) : ( 
                     <div className='flex gap-2'>
                        <button className='px-3 py-1' onClick={()=> {navigate("/login")}}>Login</button>
                        <button className='px-3 py-1'onClick={()=> {navigate("/signup")}}>Signup</button>
                     </div>
                    )}
            </div>
        </nav>
    )
}

export default Navbar