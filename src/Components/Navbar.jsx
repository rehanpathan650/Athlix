import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { userAtom } from "../state/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom } from "../state/cartAtom";
import athlix from "../assets/athlix2.png";

function Navbar() {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cart = useRecoilValue(cartAtom);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center border-b border-gray-200 shadow-sm px-6 py-1 relative">
      {/* Logo */}
      <button onClick={() => navigate("/")}>
        <img src={athlix} alt="logo" className="h-14 sm:h-16" />
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-gray-500 items-center">
        <button
          onClick={() => navigate("/about")}
          className={
            isActive("/about")
              ? "text-gray-700 border-b-2 border-gray-400"
              : "hover:text-gray-900"
          }
        >
          About
        </button>
        <button 
          onClick={() => navigate("/product")}
          className={
            isActive("/product")
              ? "text-gray-700 border-b-2 border-gray-400"
              : "hover:text-gray-900"
          }
        >
          Products
        </button>
        <div className="relative w-56 lg:w-72">
          <input
            type="text"
            className="w-full pl-3 pr-10 py-1 rounded bg-gray-100 text-black"
            placeholder="Search"
          />
          <IoIosSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Desktop User Section */}
      <div className=" hidden md:flex text-gray-500 items-center gap-5">
        <button className="relative" onClick={() => navigate("/cart")}>
              <IoCartOutline size={24} />
               {cart.length > 0 && (
      <span className="absolute -right-2 -top-2 bg-green-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </span>
    )}
        </button>
        {user ? (
          <>
            <button
              onClick={() => navigate("/my-orders")}
              className={
                isActive("/my-orders")
                  ? "text-gray-700 border-b-2 border-gray-400 px-2 py-1"
                  : "hover:text-gray-900 px-2 py-1"
              }
            >
              My Orders
            </button>
            <FaRegUser size={20} />
            <button
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
              className="text-gray-700 px-3 py-1 hover:text-gray-900"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className={
                isActive("/login")
                  ? "text-gray-700 border-b-2 border-gray-400 px-3 py-1"
                  : "px-3 py-1 hover:text-gray-900"
              }
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={
                isActive("/signup")
                  ? "text-gray-700 border-b-2 border-gray-400 px-3 py-1"
                  : "px-3 py-1 hover:text-gray-900"
              }
            >
              Signup
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-3 md:hidden z-50">
          <button
            onClick={() => {
              navigate("/about");
              setMenuOpen(false);
            }}
            className="py-2 w-full text-left hover:text-gray-900"
          >
            About
          </button>
          <button
            onClick={() => {
              navigate("/product");
              setMenuOpen(false);
            }}
            className="py-2 w-full text-left hover:text-gray-900"
          >
            Products
          </button>
          <div className="w-full py-2">
            <input
              type="text"
              className="w-full pl-3 pr-10 py-1 rounded bg-gray-100 text-black"
              placeholder="Search"
            />
          </div>
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/my-orders");
                  setMenuOpen(false);
                }}
                className="py-2 w-full text-left hover:text-gray-900"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                  setMenuOpen(false);
                }}
                className="py-2 w-full text-left hover:text-gray-900"
              >
                Cart
              </button>
              <button
                onClick={() => {
                  setUser(null);
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="py-2 w-full text-left hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="py-2 w-full text-left hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="py-2 w-full text-left hover:text-gray-900"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
