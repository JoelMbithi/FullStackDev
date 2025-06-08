import React, { useState } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import newRequest from '../utils/newRequest'

const Footer = () => {
  const [formData,setFormData] = useState({
    email:''

  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await newRequest.post('/subscribes/subscribe', formData)
      if (res.status === 200) {
        alert('Subscription successful! Thank you for subscribing to our newsletter.')
        setFormData({
          email:''
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Foodify</h3>
            <p className="mb-4">
              Your one-stop shop for premium products. We deliver quality and value to customers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/account" className="hover:text-white transition-colors">My Account</a></li>
              <li><a href="/orders" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="/wishlist" className="hover:text-white transition-colors">Wishlist</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>Nairobi Commerce Street, Kenya, KE 10001</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 flex-shrink-0" />
                <div>
                  <a href="tel:+15551234567" className="hover:text-white transition-colors">+(254) 743 861 565</a>
                  <p className="text-sm text-gray-400">Mon-Fri, 9am-5pm EST</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                <a href="mailto:support@yourstore.com" className="hover:text-white transition-colors">
                  foodifyStore@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="lg:flex justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h4 className="text-lg font-semibold text-white mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">Get the latest updates on new products and upcoming sales</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                name='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                
                className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-64"
                required
              />
              <button 
                type="submit" 
                
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Foodify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <span className="text-gray-400">We accept:</span>
              <FaCcVisa className="text-2xl text-gray-400" />
              <FaCcMastercard className="text-2xl text-gray-400" />
              <FaCcAmex className="text-2xl text-gray-400" />
              <FaCcPaypal className="text-2xl text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer