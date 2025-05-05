import React from 'react';
import { FaSearch, FaHome, FaHandshake, FaKey, FaUserTie, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Build Estate Works</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connecting buyers, sellers, and agents in Kenya's real estate market
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* For Buyers */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <FaHome className="text-3xl text-blue-700 mr-4" />
            <h2 className="text-3xl font-bold">For Property Buyers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">1</div>
              <div className="flex items-center mb-4">
                <FaSearch className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Search Properties</h3>
              </div>
              <p className="text-gray-600">
                Browse our extensive listings of properties across Kenya. Use filters to find exactly what you're looking for.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">2</div>
              <div className="flex items-center mb-4">
                <FaUserTie className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Connect with Agents</h3>
              </div>
              <p className="text-gray-600">
                Contact verified real estate agents who can provide more details and arrange viewings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">3</div>
              <div className="flex items-center mb-4">
                <FaKey className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Make Your Purchase</h3>
              </div>
              <p className="text-gray-600">
                Complete your transaction with our secure payment system and legal support.
              </p>
            </div>
          </div>
        </section>

        {/* For Sellers */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <FaChartLine className="text-3xl text-blue-700 mr-4" />
            <h2 className="text-3xl font-bold">For Property Sellers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">1</div>
              <div className="flex items-center mb-4">
                <FaHome className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">List Your Property</h3>
              </div>
              <p className="text-gray-600">
                Create a detailed listing with photos, videos, and all relevant property information.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">2</div>
              <div className="flex items-center mb-4">
                <FaUserTie className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Get Matched with Buyers</h3>
              </div>
              <p className="text-gray-600">
                Our system connects you with serious buyers interested in your type of property.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">3</div>
              <div className="flex items-center mb-4">
                <FaHandshake className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Close the Deal</h3>
              </div>
              <p className="text-gray-600">
                Complete the sale with our secure transaction process and legal documentation support.
              </p>
            </div>
          </div>
        </section>

        {/* For Agents */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <FaUserTie className="text-3xl text-blue-700 mr-4" />
            <h2 className="text-3xl font-bold">For Real Estate Agents</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">1</div>
              <div className="flex items-center mb-4">
                <FaUserTie className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Create Your Profile</h3>
              </div>
              <p className="text-gray-600">
                Register as a verified agent and showcase your experience, specialties, and past sales.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">2</div>
              <div className="flex items-center mb-4">
                <FaHome className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">List Properties</h3>
              </div>
              <p className="text-gray-600">
                Add properties to your portfolio and reach thousands of potential buyers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-5xl font-bold mb-4">3</div>
              <div className="flex items-center mb-4">
                <FaChartLine className="text-2xl mr-3 text-blue-700" />
                <h3 className="text-xl font-semibold">Grow Your Business</h3>
              </div>
              <p className="text-gray-600">
                Use our tools to manage clients, track leads, and close more deals efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users in Kenya's fastest growing real estate platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;