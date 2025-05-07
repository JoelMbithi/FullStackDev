import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mx-auto px-4 bg-white shadow-md fixed top-0  left-0 w-full z-50">
      <div className="container flex items-center justify-between h-16 ">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-green-600">
          <span>Foodify</span> {/* Add your logo here */}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
          <a href="/products" className="text-gray-700 hover:text-green-600">Products</a>
          <a href="/cart" className="text-gray-700 hover:text-green-600">Cart</a>
          <a href="/contact" className="text-gray-700 hover:text-green-600">Contact</a>
        </div>

        {/* User Actions */}
        <div className="hidden lg:flex space-x-4">
          <a href="/login" className="text-gray-700 hover:text-green-600">Login</a>
          <a href="/signup" className="text-gray-700 hover:text-green-600">Sign Up</a>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:text-green-600">Home</a>
          <a href="/products" className="block px-4 py-2 text-gray-700 hover:text-green-600">Products</a>
          <a href="/cart" className="block px-4 py-2 text-gray-700 hover:text-green-600">Cart</a>
          <a href="/contact" className="block px-4 py-2 text-gray-700 hover:text-green-600">Contact</a>
          <a href="/login" className="block px-4 py-2 text-gray-700 hover:text-green-600">Login</a>
          <a href="/signup" className="block px-4 py-2 text-gray-700 hover:text-green-600">Sign Up</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
