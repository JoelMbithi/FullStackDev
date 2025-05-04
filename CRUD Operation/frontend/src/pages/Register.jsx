import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from 'react';
import axios from 'axios';
import newRequest from '../utils/newRequest';

const Register = () => {
  const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the file for later upload
  
    // Show image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set preview URL for display
      };
      reader.readAsDataURL(file);
    }
  
    // Proceed with upload to Cloudinary
    handleImageUpload(file);
  };
  
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Build Estate');
  
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dz6pydmk6/image/upload',
        formData
      );
      setImageUrl(res.data.secure_url); // Set Cloudinary URL
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
    }
  };
  
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  if (image) {
    formData.append("image", image); // 👈 Append the file manually
  }

  try {
    const res = await newRequest.post("/auth/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 👈 Important for file upload
      },
    });

    console.log('Registered successfully', res.data);
    alert(res.data.message || "Registered successfully");
    navigate('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.response) {
      alert(error.response.data.message || "Registration failed");
    } else {
      alert('An error occurred during registration');
    }
  }
};

  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white rounded-lg mt-20 shadow-md w-full max-w-md'>
        {/* profile */}
        <div className="flex flex-col items-center justify-center p-4 rounded-t-lg">
  {preview ? (
    <img
      src={preview}
      alt="Selected"
      className="w-24 h-24 object-cover rounded-full"
    />
  ) : (
    <>
      <FaRegCircleUser className="text-6xl text-slate-400 cursor-pointer" />
      <label className="text-sm text-blue-600 cursor-pointer mt-2">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </>
  )}
</div>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 p-6'>
            <label className='font-bold'>Full Name:</label>
            <input 
              className='border border-gray-300 p-2 rounded' 
              type="text" 
              name="name"
              placeholder='Enter Full Name' 
              required
            />
          </div>
          
          <div className='flex flex-col gap-2 p-6 '>
            <label className='font-bold'>Email:</label>
            <input 
              className='border border-gray-300 p-2 rounded' 
              type="email" 
              name="email"
              placeholder='Enter your Email' 
              required
            />
          </div>
          <div className='flex flex-col gap-2 p-6 '>
            <label className='font-bold'>Role:</label>
            <input 
              className='border border-gray-300 p-2 rounded' 
              type="text" 
              name="role"
              placeholder='Enter your role' 
              required
            />
          </div>
          
          <div className='flex flex-col gap-2 p-6'>
                <label htmlFor="phone" className='font-bold'>
                  Phone
                </label>
              
                  <input
                    type="tel"
                    id="phone"
                    placeholder="0743861565"
                    className='border border-gray-300 p-2 rounded'
                    name='phone'
                    required
                  />
                  
              </div>

          

              <div className='flex flex-col gap-2 p-6'>
                <label htmlFor="country" className='font-bold'>
                  Country
                </label>
                <select
                  id="country"
                  className='border border-gray-300 p-2 rounded'
                  name='country'
                  required
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="KE">Kenya</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="NG">Nigeria</option>
                  <option value="ZA">South Africa</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
          <div className='flex flex-col gap-2 p-6'>
            <label className='font-bold'>Password:</label>
            <input 
              className='border border-gray-300 p-2 rounded' 
              type="password" 
              name="password"
              placeholder='Enter your password' 
              required
            />
          </div>
          
          <div className='flex flex-col gap-2 p-6 bg-gray-50'>
            <label className='font-bold'>Confirm Password:</label>
            <input 
              className='border border-gray-300 p-2 rounded' 
              type="password" 
              name="confirmPassword"
              placeholder='Confirm your password'
              required
            />
          </div>
          
          <div className='flex flex-col justify-center gap-4 p-6'>
            <button
              type="submit"
              className='bg-blue-900 p-3 flex items-center justify-center text-white text-xl rounded hover:bg-blue-800 transition-colors'
            >
              Register
            </button>
            
            <div className='flex justify-center gap-2'>
              <p>Already have an Account?</p>
              <Link 
                to="/login" 
                className='text-blue-800 underline hover:text-blue-700'
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;