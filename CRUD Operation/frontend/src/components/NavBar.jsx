import React from 'react';
import { FiSearch } from "react-icons/fi";

const NavBar = () => {
  return (
    <nav className='w-full fixed top-0 left-0 right-0  z-50 bg-white shadow-sm'>
      <div className='container mx-auto px-4 h-20 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center'>
          <h1 className='text-xl font-bold'>
            <span className='text-purple-700'>Build</span>
            <span className='text-gray-800'>Estate</span>
          </h1>
        </div>

        {/* Navigation Links - hidden on mobile, shown on md+ screens */}
        <div className='hidden md:flex space-x-8'>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Home</a>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>How it works</a>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Agents</a>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Sales</a>
        </div>

        {/* Right Side Actions */}
        <div className='flex items-center space-x-4'>
          <button 
            className='hidden sm:inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors'
            aria-label="Language selection"
          >
            KEN
          </button>
          <button 
            className='bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
            aria-label="Contact us"
          >
            Contact Us
          </button>
          <button 
            className='p-2 text-gray-600 hover:text-purple-700 transition-colors'
            aria-label="Search"
          >
            <FiSearch className='text-xl' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;