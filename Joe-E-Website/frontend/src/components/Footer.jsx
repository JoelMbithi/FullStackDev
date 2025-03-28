import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b52] min-h-[250px] flex justify-center py-10 px-4 text-gray-300">
      <div className="container mx-auto w-full flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start px-5">
        
        {/* Left Section */}
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0 text-center sm:text-left">
          <Link to="/" className="flex items-center justify-center sm:justify-start space-x-2">
            <img className="hidden md:flex h-12 rounded-full" src={logo} alt="Logo" />
            <h1 className="text-white text-lg font-semibold">About Us</h1>
          </Link>
          <p className="mt-4 text-sm mr-10">
            Welcome to <span className="text-[#FF6016] font-semibold">JoeCartify</span>, your go-to destination for quality products at unbeatable prices. We offer a seamless shopping experience with secure payments, fast delivery, and exceptional customer support.
          </p>
          <Link to="/team" className="mt-3 inline-block text-[#FF6016] hover:underline">
            Our Team
          </Link>
        </div>

        {/* Middle Section */}
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0 text-center sm:text-left">
          <h1 className="text-white text-lg font-semibold">Quick Links</h1>
          <ul className="mt-4 space-y-2">
            <li><Link to="/" className="hover:text-[#FF6016]">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[#FF6016]">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-[#FF6016]">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-[#FF6016]">Checkout</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <h1 className="text-white text-lg font-semibold">Connect with Us</h1>
          <ul className="mt-4 flex justify-center sm:justify-start space-x-6">
            <li><a href="#" className="hover:text-[#FF6016]"><FaFacebook size={22} /></a></li>
            <li><a href="#" className="hover:text-[#FF6016]"><FaInstagram size={22} /></a></li>
            <li><a href="#" className="hover:text-[#FF6016]"><FaTwitter size={22} /></a></li>
            <li><a href="#" className="hover:text-[#FF6016]"><FaLinkedin size={22} /></a></li>
          </ul>

          <div className="hidden md:flex flex-col py-4 mt-6 text-sm">
            <p className="py-1">&copy; joellembithi@gmail.com</p>
            <p>0743861565</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
