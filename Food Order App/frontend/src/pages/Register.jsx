import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuUserRound } from "react-icons/lu";
import axios from 'axios';
import newRequest from '../utils/newRequest.js';
import SuccessModal from '../components/SuccessModal'

const Register = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageUrl: '',
    country: '',
    role: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'Build Estate');

    try {
      setUploading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dz6pydmk6/image/upload',
        form
      );
      setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      imageUrl,
      country,
      role,
      phone,
    } = formData;
  
    // Validation
    if (!name || !email || !password || !confirmPassword || !imageUrl || !country || !role || !phone) {
      alert('Please fill all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
  
    if (!/^[0-9]{10,15}$/.test(phone)) {
      alert('Please enter a valid phone number (10-15 digits)');
      return;
    }
  
    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role.toLowerCase())) {
      alert(`Role must be one of: ${validRoles.join(', ')}`);
      return;
    }
  
    try {
      const payload = {
        ...formData,
        role: role.toLowerCase() // normalize role case
      };
  
      console.log('Sending payload:', payload);
      
      const res = await newRequest.post('/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Registration success:', res.data);
      setSuccessMessage('Account created successfully!');
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/login');
      }, 3000);
     
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Registration failed. Please try again.';
      alert(errorMessage);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex-1 flex justify-center items-center p-6 bg-white mt-20">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {showSuccessModal && (
        <SuccessModal 
          message={successMessage} 
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/login'); // Redirect after closing
          }} 
        />
      )}
        <label className="cursor-pointer flex flex-col items-center justify-center mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
          ) : (
            <>
              <LuUserRound className="text-6xl text-gray-400 mb-2 rounded-full bg-slate-200 h-20 w-20 p-2" />
              <span className="text-gray-600 text-sm">Click to upload profile photo</span>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {uploading && <p className="text-center text-sm text-gray-500 mb-3">Uploading image...</p>}

        <input name="name" value={formData.name} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Full Name" onKeyDown={handleKeyDown} />
        <input name="email" value={formData.email} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Email" type="email" onKeyDown={handleKeyDown} />
        <input name="country" value={formData.country} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Country" onKeyDown={handleKeyDown} />
        <input name="role" value={formData.role} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Role (e.g. Buyer/Seller)" onKeyDown={handleKeyDown} />
        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4" placeholder="Phone Number" type="tel" onKeyDown={handleKeyDown} />
        <input name="password" value={formData.password} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Password" type="password" onKeyDown={handleKeyDown} />
        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3" placeholder="Confirm Password" type="password" onKeyDown={handleKeyDown} />

        <button className="w-full bg-red-500 py-3 rounded-lg text-white font-bold text-lg" onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Register'}
        </button>

        <div className="mt-6 text-center">
          <button className="text-gray-600" onClick={() => navigate('/login')}>
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
