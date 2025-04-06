import React, { useState,useEffect } from 'react';
import { ImSearch } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import logo from "../assets/logo.png";
import { Link, Links, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import newRequest from "../utils/newRequest.js"
import { useSelector } from 'react-redux';

const Header = () => {

  const User = JSON.parse(localStorage.getItem("User"))
  const navigate = useNavigate()
  const user = useSelector(state => state?.user?.user)
  const [menuDisplay,setMenuDisplay] = useState(false)
  console.log("user header",User)
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
 
  // Fetch cart items count

 useEffect(() => {
  const handleAuthChange = () => {
    setUser(JSON.parse(localStorage.getItem("User")));
    fetchCartCount();
  };

  window.addEventListener("authChange", handleAuthChange);
  return () => window.removeEventListener("authChange", handleAuthChange);
}, []);

// 2. Improved fetch cart count
const fetchCartCount = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    
    if (!currentUser?.token) {
      setCount(0);
      return;
    }

    const res = await newRequest.get("/addProductToCart/countTotalItems", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    setCount(res.data.count || 0);
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("User");
      setUser(null);
    }
    setCount(0);
  }
};

// 3. Cart update listener
useEffect(() => {
  const handleCartUpdate = (e) => {
    if (e.detail?.count !== undefined) {
      setCount(e.detail.count);
    }
  };

  window.addEventListener("cartUpdated", handleCartUpdate);
  return () => window.removeEventListener("cartUpdated", handleCartUpdate);
}, []);

// 4. Initial load
useEffect(() => {
  fetchCartCount();
}, [user]); 
  const handleLogout = async () => {
    try {
      const res = await newRequest.post("/user/logout");
      
      console.log("Logout status:", res.status); 
  
      // Remove user data from localStorage
      localStorage.removeItem("User");
  
      toast.success("Successfully logged out!");
     
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };
  

  return (
<header className="bg-white sticky  z-[1000] top-0 h-20 p-1 shadow-md">
<div className="container mx-auto h-full flex items-center px-3 justify-between">
  
      {/* logo */}
      <div className="p-5">
        <Link to="/">
          <img className=' h-10 p-1 ml-3  rounded-full' src={logo} alt="Logo" />
          <h1 className='flex -ml-5 text-xl font-bold'> <p className='italic text-sm mt-0.5'>Joe</p> <p className='text-[#FF6016]'> Cartify</p></h1>
        </Link>
      </div>
  
      {/* Search Bar */}
      <div className="hidden md:flex items-center mr-4 w-full justify-between max-w-lg border border-gray-400 pl-2 rounded-full focus-within:shadow-md">
        <input type="text" placeholder="Search products here..." className="w-full outline-none  max-w-xl" />
        <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white" style={{ backgroundColor: "#FF6016" }}>
          <ImSearch />
        </div>
      </div>
  
      {/* Login Button */}
      <div className="flex items-center gap-2">
        <button className="px-2 py-1  text-black hover:underline hover:text-[#FF6016]">
         Home
        </button>
        <button className=" px-1 py-1  text-black hover:underline hover:text-[#FF6016]">
         Category
        </button>
        <button className="hidden md:flex px-3 py-1  text-black hover:underline hover:text-[#FF6016]">
         Blog
        </button>
        <Link to="/signup">
        <button className=" px-3 py-1  text-black  hover:underline  hover:text-[#FF6016]">
         Contact
        </button>
        </Link>
        {
          User?._id ? (
            <Link to="/">
          <button onClick={handleLogout} className="btn-primary">
            Logout
          </button>
          </Link>
          )  : ( <Link to="/login">
          <button className="btn-primary">
            Login
          </button>  
          </Link>
        )}
        
        
      </div>
  
      {/* Icons */}
      {User?._id && (
  <div className='  flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
    <div className="flex items-center gap-4  ">
      <div className="text-4xl -mr-6 flex flex-col cursor-pointer">
        {User?.profilePic ? (
          <img className="w-10 h-9 rounded-full" src={User.profilePic} alt="Profile" />
        ) : (
          <HiUserCircle className="w-10 h-10 text-gray-500" />
        )}
        <p className='text-sm ml-4  font-bold'>
          {User?.username || "Guest"}
        </p>
      </div>
    </div>

    {/* Popup menu - shows for all logged-in users */}
    {menuDisplay && (
      <div className='absolute shadow-lg rounded top-10 h-fit p-3 bg-white bottom-0'>
        <nav>
          {/* Only show Admin Panel link if user is admin */}
          {User?.role === "admin" && (
            <Link to="/admin" className='whitespace-nowrap hover:bg-slate-200 p-2'>
              Admin Panel
            </Link>
          )}
          {/* Add other menu items that should appear for all users */}
          <Link to="/profile" className='whitespace-nowrap hover:bg-slate-200 p-2 block'>
            My Profile 
          </Link>
          <Link to="/settings" className='whitespace-nowrap hover:bg-slate-200 p-2 block'>
            Settings
          </Link>
        </nav>
      </div>
    )}
  </div>
)}
        <div className="text-3xl  ml-5 cursor-pointer relative">
          <span>
            <TiShoppingCart className='ml-3' />
            <div className="absolute -top-2 -right-2">
              <p className="bg-[#FF6016] text-xs text-white flex items-center justify-center h-5 w-5 rounded-full">{count}</p>
            </div>
          </span>
     
     
      </div>
  
    </div>
  </header>
  
  );
}

export default Header;
