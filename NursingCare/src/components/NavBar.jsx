import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex items-center justify-between text-sm py-4 px-6 border-b border-gray-300">
        <img onClick={() => navigate('/')} className="w-28 cursor-pointer" src={assets.logo} alt="DigiCare Logo" />

        {/* Nav Links */}
        <ul className="hidden sm:flex items-center gap-6 font-medium">
          <li className="py-1 border border-gray-300 px-4 rounded hover:scale-105 transition-all">
            <Link to="/">Home</Link>
          </li>
          <li className="py-1 border border-gray-300 px-4 rounded hover:scale-105 transition-all">
            <Link to="/doctors">All Doctors</Link>
          </li>
          <li className="py-1 border border-gray-300 px-4 rounded hover:scale-105 transition-all">
            <Link to="/about">About</Link>
          </li>
          <li className="py-1 border border-gray-300 px-4 rounded hover:scale-105 transition-all">
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>

        {/* User Profile or Login */}
        <div className="hidden sm:flex items-center">
          {token ? (
            <div className="relative" ref={profileMenuRef}>
              <img
                className="w-8 rounded cursor-pointer"
                src={assets.profile_pic}
                alt="User Profile"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
             {showProfileMenu && (
  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
    <p onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      My Profile
    </p>
    <p onClick={() => { navigate('/myAppointments'); setShowProfileMenu(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      My Appointments
    </p>
    <p onClick={() => { setToken(false); setShowProfileMenu(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
      Logout
    </p>
  </div>
)}

            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Create Account
            </button>
          )}
         
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
          <img src={assets.menu_icon} alt="Menu" className="w-6" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="sm:hidden flex flex-col items-center bg-white shadow-md py-4">
          <Link to="/" className="py-2">Home</Link>
          <Link to="/doctors" className="py-2">All Doctors</Link>
          <Link to="/about" className="py-2">About</Link>
          <Link to="/contacts" className="py-2">Contacts</Link>
          {token ? (
            <>
              <p onClick={() => { navigate('/profile'); setShowMenu(false); }} className="py-2 cursor-pointer">My Profile</p>
              <p onClick={() => { navigate('/myAppointments'); setShowMenu(false); }} className="py-2 cursor-pointer">My Appointments</p>
              <p onClick={() => { setToken(false); setShowMenu(false); }} className="py-2 cursor-pointer text-gray-500">Logout</p>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-6 py-2 rounded-full mt-2">
              Create Account
            </button>
          )}
          
        </div>
        
      )}
      
     

      <div className='mb-4'></div>
    </div>
  );
};

export default NavBar;
