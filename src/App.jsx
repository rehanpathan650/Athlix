import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Product from "./Pages/Product"
import CartPage from "./Pages/CartPage";

function App() {

  return (
    <BrowserRouter>
        <Routes>
           <Route element={<Home />} path='/'/>
           <Route element={<About />} path='/about'/>
           <Route element={<Login />} path='/login'/>
           <Route element={<Signup />} path='/signup'/>
           <Route element={<Product />} path='/product'/>
           <Route element={<CartPage />} path='/cart'/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
