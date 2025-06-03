import React, { useEffect, useState } from 'react';
import { PiUserCircleThin, PiShoppingCartLight } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const [productsCount, setProductsCount] = useState(0);
 


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    if (!user_id) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`/user/singleClient/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false); 
  }, [location]);


  const fetchProductsCount = async () => {
    try {
      const res = await newRequest.get("/product/allProduct")
      
      setProductsCount(res.data.data.length);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductsCount();
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUser(null);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <nav className={`fixed w-full top-0 left-0 shadow z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-green-600">
          Foodify<span className="text-red-500">.</span>
        </Link>

        {/* Search (Desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search food or restaurants..."
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`hover:text-green-600 ${location.pathname === '/' && 'text-green-600 font-semibold'}`}>Home</Link>
          <Link to="/product" className={`hover:text-green-600 ${location.pathname === '/product' && 'text-green-600 font-semibold'}`}>Products</Link>
          <Link to="/contact" className={`hover:text-green-600 ${location.pathname === '/contact' && 'text-green-600 font-semibold'}`}>Contact</Link>

          <Link to="/cart" className="relative">
            <PiShoppingCartLight className="text-2xl" />
            {productsCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {productsCount}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode}>
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
          </button>

          {/* User */}
          {user ? (
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                {user.image ? (
                  <img src={user.image} alt="User" className="w-8 h-8 rounded-full" />
                ) : (
                  <PiUserCircleThin className="text-2xl" />
                )}
                <span className="text-sm text-gray-700 dark:text-white"> {user.name}</span>
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded-md shadow-lg py-2 w-40">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-green-600">Login</Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <Link to="/" className="block text-sm py-2 border-b">Home</Link>
          <Link to="/products" className="block text-sm py-2 border-b">Products</Link>
          <Link to="/contact" className="block text-sm py-2 border-b">Contact</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-red-500 flex items-center gap-1">
            <PiShoppingCartLight className="text-xl" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 rounded-full">3</span>
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="block text-sm py-2 border-b">My Profile</Link>
              <Link to="/orders" className="block text-sm py-2 border-b">My Orders</Link>
              <button onClick={handleLogout} className="block text-left w-full text-sm py-2 border-b">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm py-2 border-b">Login</Link>
              <Link to="/register" className="block text-sm py-2 border-b">Sign Up</Link>
            </>
          )}
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="flex items-center space-x-2 pt-2">
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}

        {/* Mobile Menu */}
        {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/products" className="block text-gray-700 hover:text-red-500">Products</Link>
          <Link to="/cart" className="block text-gray-700 hover:text-red-500 flex items-center gap-1">
            <PiShoppingCartLight className="text-xl" />
            <span>Cart</span>
            <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">3</span>
          </Link>
          <Link to="/contact" className="block text-gray-700 hover:text-red-500">Contact</Link>

          {user ? (
            <>
              <Link to="/profile" className="block text-gray-700 hover:text-red-500">Profile</Link>
              <button onClick={handleLogout} className="block text-left w-full text-red-600 hover:bg-gray-100 px-2 py-1">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-red-500">Login</Link>
              <Link to="/register" className="block text-gray-700 hover:text-red-500">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
