import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { userAtom } from "../state/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import athlix from "../assets/athlix2.png";

function Navbar() {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center border-b border-gray-200 shadow-sm px-4 py-0 my-0">
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={athlix} alt="" sizes="20" className="h-20 pl-2" />
        </button>
      </div>
      <div className="flex gap-10 text-gray-500">
        <div>
          <button
            onClick={() => {
              navigate("/about");
            }}
            className={
              isActive("/about")
                ? "text-gray-700 border-b-2 border-gray-400"
                : "hover:text-gray-900"
            }
          >
            About
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/product");
            }}
            className={
              isActive("/product")
                ? "text-gray-700 border-b-2 border-gray-400"
                : "hover:text-gray-900"
            }
          >
            Products
          </button>
        </div>
        <div className="relative w-72">
          <input
            type="text"
            className="w-full pl-3 pr-10 py-1 rounded bg-gray-100 text-black"
            placeholder="Search"
          />
          <IoIosSearch
            className="absolute right-2 top-1/2 -translate-y-1/2 aria-label"
            aria-label="Shopping Cart"
          />
        </div>
      </div>
      <div className="text-gray-500">
        {user ? (
          <div className="flex gap-5 justify-center items-center">
            <button
              onClick={() => navigate("/my-orders")}
              className="px-3 py-1 hover:text-gray-900"
            >
              My Orders
            </button>
            <FaRegUser size={20} />
            <button onClick={() => navigate("/cart")}>
              <IoCartOutline size={24} />
            </button>
            <button
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
              className="text-gray-700 px-3 py-1 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className={
                isActive("/login")
                  ? "text-gray-700 border-b-2 border-gray-400 px-3 py-1"
                  : "px-3 py-1 hover:text-gray-900"
              }
            >
              Login
            </button>
            <button
              className={
                isActive("/signup")
                  ? "text-gray-700 border-b-2 border-gray-400 px-3 py-1"
                  : "px-3 py-1 hover:text-gray-900"
              }
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
