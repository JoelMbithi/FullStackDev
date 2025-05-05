import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { MdBookmarkAdded } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Contact from '../components/navbar/Contact';

import newRequest from '../utils/newRequest';

const NavBar = () => {
  const [user, setUser] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchUser = async () => {
    try {
      setLoading(true); // Set loading to true when the request is made
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const res = await newRequest.get(`/user/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
console.log(res.data.data)
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        console.log("Error: Unable to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setIsOpen(false);
    navigate('/login');
  };

  const handleBooking = () => {
    navigate("/booking");
  };
  
  const handleClick = () => {
    setPopUp(true); // Show popup
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className='w-full fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-sans'>
      <div className='container mx-auto px-4 h-20 flex items-center justify-between'>
        {/* Logo */}
        <Link to="/">
          <div className='flex items-center'>
            <h1 className='text-xl font-bold'>
              <span className='text-purple-700'>Build</span>
              <span className='text-gray-800'>Estate</span>
            </h1>
          </div>
        </Link>

        {/* Hamburger for Mobile */}
        <div className="absolute top-4 right-4 md:hidden z-50">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-2xl text-gray-700">
            ☰
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className={`absolute md:static top-20 left-0 w-full md:w-auto bg-white md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0 px-4 py-4 md:py-0 z-40 shadow md:shadow-none ${isNavOpen ? 'block' : 'hidden'}`}>
          <a href="#" className='block text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Home</a>
          <Link to="/overView" className='block text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>How it works</Link >
          <Link to="/agents" className='block text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Agents</Link>
          <Link to='/sales' className='block text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Sales</Link > </div>

        {/* Right Side */}
        <div className='flex items-center space-x-4'>
          <button className='hidden sm:inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors'>
            KEN
          </button>

          <button className='hidden sm:inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
            onClick={handleClick}>
            Contact Us
          </button>

          {/* Popup Modal */}
          {popUp && <Contact onClose={() => setPopUp(false)} />}

          <button className='p-2 text-gray-600 hover:text-purple-700 transition-colors'>
            <FiSearch className='text-xl sm:hidden' />
          </button>

          {/* User Avatar and Dropdown */}
          <div className='flex flex-col items-center relative dropdown'>
          <div
  className={`p-2 rounded-full hover:text-purple-700 transition-colors ${
    user?.image ? '' : 'bg-purple-400'
  }`}
>
  <button
    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
    className='relative'
  >
    <div className="flex flex-col items-center justify-center rounded">
      {user?.image ? (
        <img
          src={user.image}
          alt="User"
          className="w-10 h-10 object-fill rounded-full"
        />
      ) : (
        <CiUser className="text-2xl ml-1 text-white" />
      )}
    </div>

    {loading ? 
      <p className='text-sm bg-slate-300 w-20 animate-pulse rounded h-4 mt-1'></p>
      : user && user.name ? (
        <p className='text-sm font-semibold text-center'>{user.name}</p>  
      ) : (
        <p className='text-xs hover:text-blue-700 cursor-pointer text-center'>signIn</p> 
    )}
  </button>

  {isUserDropdownOpen && (
    <div className='absolute top-14 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
      {user ? (
        <>
          <div className='px-4 py-2 text-sm text-gray-700 border-b'>
            Signed in as <span className='font-medium'>{user.name}</span>
          </div>
          <Link to="/profile" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsUserDropdownOpen(false)}>
            Profile
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsUserDropdownOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsUserDropdownOpen(false)}>
            Login
          </Link>
          <Link to="/register" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsUserDropdownOpen(false)}>
            Register
          </Link>
        </>
      )}
    </div>
  )}


            </div>
          </div>

          {/* Booked Button */}
          <div
            className="sm:mr-1 p-5 flex flex-col items-center text-slate-600 font-bold cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleBooking}
          >
            Booked
            <MdBookmarkAdded className="text-xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
