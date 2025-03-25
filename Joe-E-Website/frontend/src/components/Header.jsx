import React from 'react';
import { ImSearch } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import logo from "../assets/logo.png";
import { Link, Links } from 'react-router-dom';

const Header = () => {
  return (
<header className="bg-white sticky top-0 h-20 p-1 shadow-md">
<div className="container mx-auto h-full flex items-center px-3 justify-between">
  
      {/* logo */}
      <div className="p-5">
        <Link to="/">
          <img className='h-10 p-1 ml-3 rounded-full' src={logo} alt="Logo" />
          <h1 className='flex ml-1 text-xl font-bold'>joe-Ecommers</h1>
        </Link>
      </div>
  
      {/* Search Bar */}
      <div className="hidden md:flex items-center w-full justify-between max-w-lg border border-gray-400 pl-2 rounded-full focus-within:shadow-md">
        <input type="text" placeholder="Search products here..." className="w-full outline-none max-w-xl" />
        <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white" style={{ backgroundColor: "#FF6016" }}>
          <ImSearch />
        </div>
      </div>
  
      {/* Login Button */}
      <div className="flex items-center gap-7">
        <button className="px-3 py-1 rounded-full text-white bg-[#FF6016] hover:bg-[#ff2020]">
          About us
        </button>
        <button className="px-3 py-1 rounded-full text-white bg-[#FF6016] hover:bg-[#FF4120]">
          Register
        </button>
        <Link to="/login">
          <button className="px-3 py-1 rounded-full text-white bg-[#FF6016] hover:bg-[#FF4120]">
            Login
          </button>
        </Link>
      </div>
  
      {/* Icons */}
      <div className="flex items-center gap-4">
        <div className="text-4xl cursor-pointer">
          <HiUserCircle />
        </div>
  
        <div className="text-3xl cursor-pointer relative">
          <span>
            <TiShoppingCart />
            <div className="absolute -top-2 -right-2">
              <p className="bg-[#FF6016] text-xs text-white flex items-center justify-center h-5 w-5 rounded-full">0</p>
            </div>
          </span>
        </div>
      </div>
  
    </div>
  </header>
  
  );
}

export default Header;
