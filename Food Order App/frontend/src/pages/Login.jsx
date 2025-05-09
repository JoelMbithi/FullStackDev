import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuUserRound } from "react-icons/lu";
import newRequest from '../utils/newRequest';
import SuccessModal from '../components/SuccessModal'
const Register = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    const {
     
      email,
      password,
     
    } = formData;

    if (!email || !password ) {
      alert('Error: Please fill all fields');
      return;
    }

   

    const res = await newRequest.post(`/auth/login`,formData);
    console.log(res.data);

     // Save token and user_id to localStorage
     const { user, token } = res.data;

     localStorage.setItem("token", res.data.token);
     localStorage.setItem("user_id", user.user_id); 
     localStorage.setItem("role", user.role); 

  

    setSuccessMessage('SigIn  successfully!');
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);

        if(user.role == 'admin'){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, 3000);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex-1 flex justify-center items-center p-6 bg-white mt-20">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to your Account</h1>
        
        {showSuccessModal && (
        <SuccessModal 
          message={successMessage} 
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/login'); // Redirect after closing
          }} 
        />
      )}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3"
          placeholder="Email"
          type="email"
          onKeyDown={handleKeyDown}
        />

       

       

        
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3"
          placeholder="Password"
          type="password"
          onKeyDown={handleKeyDown}
        />

      
        <button
          className="w-full bg-red-500 py-3 rounded-lg text-white font-bold text-lg"
          onClick={handleSubmit}
        >
         Login
        </button>

        <div className="mt-6 text-center">
          <button
            className="text-gray-600"
            onClick={() => navigate('/')}
          >
           Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
