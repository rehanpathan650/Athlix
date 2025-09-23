import React,{useState} from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom"

function Navbar() {
    const [isLoggedin, setIsLoggedIn] = useState(localStorage.getItem("isLoggedin")==="true");
    const navigate = useNavigate();
  
    return (
         <nav className='flex justify-between items-center '>
                 <div>
                    <button onClick={()=> {navigate("/")}}>
                    <img src="./athlix2.png" alt=""  className='h-24 pl-2'/>
                    </button>
                 </div>
                 <div className='flex gap-10'>
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
                 <div className=''>
                      {isLoggedin ? ( 
                        <div className='flex gap-3'>
                            <FaRegUser size={20}/>
                            <button className=''>Logout</button>
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