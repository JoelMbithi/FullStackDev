import React, { useEffect, useState } from 'react';
import { PiUserCircleThin } from "react-icons/pi";
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true); 
  
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    
    // Don't try to fetch if we don't have a user_id
    if (!user_id) {
      setLoading(false);
      return;
    }

    try {
      const res = await newRequest.get(`/user/singleClient/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        console.log(res.data.data) 
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      // Clear invalid token/user data
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); 
  return (
    <div className="mx-auto px-4 bg-white shadow-md fixed top-0  left-0 w-full z-50">
      <div className="container flex items-center justify-between h-16 ">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-green-600">
          <Link to={"/"}>Foodify</Link> {/* Add your logo here */}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="block md:hidden">
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
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
          <a href="/product" className="text-gray-700 hover:text-green-600">Products</a>
          <a href="/cart" className="text-gray-700 hover:text-green-600">Cart</a>
          <a href="/contact" className="text-gray-700 hover:text-green-600">Contact</a>
        </div>

       
        {user && (
  <div className='sm:hidden md:-mr-50 lg:flex flex-row gap-2 items-center'>
    {user.image ? (
      <img src={user.image} className="w-10 h-10 rounded-full" />
    ) : (
      <PiUserCircleThin className="text-xl" />
    )}
   
  </div>
)}


        {/* User Actions */}
        <div className="hidden md:flex space-x-4">
          <a href="/login" className="text-gray-700 hover:text-green-600">Login</a>
          <p>|</p>
          <a href="/register" className="text-gray-700 hover:text-green-600">Sign Up</a>
        </div>
       
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white ">
          <a href="/" className="block px-4 py-2  text-gray-700 hover:text-green-600">Home</a>
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
