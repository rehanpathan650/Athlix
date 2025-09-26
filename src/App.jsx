import React from "react";
import { ToastContainer } from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Product from "./Pages/Product"
import CartPage from "./Pages/CartPage";
import ProductDetail from "./Pages/ProductDetail";
import FourOFour from "./Pages/FourOFour";
import MyOrders from "./Pages/MyOrders";

function App() {

  return (
    <BrowserRouter>
        <Routes>
           <Route element={<Home />} path='/'/>
           <Route element={<ProductDetail />} path='/product/:id'/>
           <Route element={<MyOrders />} path='/my-orders'/>
           <Route element={<About />} path='/about'/>
           <Route element={<Login />} path='/login'/>
           <Route element={<Signup />} path='/signup'/>
           <Route element={<Product />} path='/product'/>
           <Route element={<CartPage />} path='/cart'/>
           <Route element={<FourOFour />} path="*" />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000}/>
    </BrowserRouter>
  )
}

export default App
