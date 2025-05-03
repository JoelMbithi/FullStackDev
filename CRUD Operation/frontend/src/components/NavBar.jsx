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
  const navigate = useNavigate();
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchUser = async () => {
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const res = await newRequest.get(`/user/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        console.log("Error: Unable to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
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
   
   
    setPopUp(true);         // show popup
  };

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

        {/* Navigation Links */}
        <div className='hidden md:flex space-x-8'>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Home</a>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>How it works</a>
          <Link to="/agents" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Agents</Link>
          <a href="#" className='text-gray-600 hover:text-purple-700 transition-colors text-sm font-medium'>Sales</a>
        </div>

        {/* Right Side */}
        <div className='flex items-center space-x-4'>
          <button className='hidden lg:inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors'>
            KEN
          </button>

          <button className='hidden sm:inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
          onClick={() => handleClick()}
          >
            Contact Us
          </button>
{/* Popup Modal */}
{isOpen && (
 < Contact
 onClose={() => {
  setPopUp(false);}}
 />
)}
          <button className='p-2 text-gray-600 hover:text-purple-700 transition-colors'>
            <FiSearch className='text-xl sm:hidden' />
          </button>

          {/* User Avatar and Dropdown */}
          <div className='flex flex-col items-center relative'>
            <div className='p-2 bg-purple-400 rounded-full hover:text-purple-700 transition-colors'>
              <button onClick={toggleDropdown} className='relative'>
                <CiUser className='text-2xl text-white' />
              </button>
            </div>

            {user && user.name ? (
              <p className='text-sm font-semibold'>{user.name}</p>
            ) : (
              <p className='text-sm bg-slate-300 w-20 animate-pulse rounded h-4 mt-1'></p>
            )}

            {isOpen && (
              <div className='absolute top-14 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                {user ? (
                  <>
                    <div className='px-4 py-2 text-sm text-gray-700 border-b'>
                      Signed in as <span className='font-medium'>{user.name}</span>
                    </div>
                    <Link to="/profile" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
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
