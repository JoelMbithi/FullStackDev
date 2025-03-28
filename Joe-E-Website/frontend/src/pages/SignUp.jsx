import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import signin from "../assets/signin.gif";
import { ImageToBase64 } from "../helpers/imageToBase64";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "", // Changed from fullname to username
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", data); // Debugging log
  
    // Field Validation
    if (!data.email || !data.password || !data.username || !data.confirmPassword) {
      console.error("All fields are required");
      toast.error("All fields are required");
      return; // Prevent further execution
    }
  
   
    if(data.password === data.confirmPassword) {
    try {
      const res = await newRequest.post("/user/create", data);
      console.log("Response:", res.data);
      navigate("/login");
      toast.success("User created successfully");

      localStorage.setItem("User", JSON.stringify(res.data));

    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
       // Check if error message is "User already exists"
    if (error.response?.data?.message === "User already exists") {
      toast.error("User already exists. Please log in.");
    } else {
      toast.error("User already exists. Please log in.");
    }
    }
      
  } else {
    console.error("Passwords do not match");  
    toast.error("Passwords do not match");
  }
  ;
  }
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64String = await ImageToBase64(file);
      setData((prev) => ({ ...prev, profilePic: base64String }));
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  return (
    <section id="signup" className="bg-[#F1EFE1]">
      <div className="bg-[#F1EFE1] mx-auto container p-4">
        <div className="bg-white p-5 mt-6 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full relative">
            <img
              className="bg-transparent rounded-full mt-10 w-full h-full object-cover"
              src={data.profilePic || signin}
              alt="Profile"
            />
            <label className="text-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md cursor-pointer">
              Upload Photo
              <input 
                onChange={handleProfileUpload} 
                className="hidden" 
                type="file" 
                accept="image/*"
              />
            </label>
          </div>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid py-3 mt-10">
              <label>Username</label>
              <input
                onChange={handleChange}
                name="username" // Changed from fullname to username
                required
                value={data.username}
                className="rounded-2xl outline-none bg-slate-100 w-full p-3"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className="grid py-3 mt-10">
              <label>Email</label>
              <input
                onChange={handleChange}
                name="email"
                required
                value={data.email}
                className="rounded-2xl outline-none bg-slate-100 w-full p-3"
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div className="grid mt-4">
              <label>Password</label>
              <div className="bg-slate-100 flex">
                <input
                  onChange={handleChange}
                  name="password"
                  required
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  className="rounded-2xl outline-none bg-transparent w-full p-3"
                  placeholder="Enter password"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center justify-center h-full w-10 cursor-pointer"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
            <div className="grid mt-4">
              <label>Confirm Password</label>
              <div className="bg-slate-100 flex">
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  required
                  value={data.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  className="rounded-2xl outline-none bg-transparent w-full p-3"
                  placeholder="Confirm password"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="flex items-center justify-center h-full w-10 cursor-pointer"
                >
                  {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="btn"
              >
                Sign Up
              </button>
              <Link to="/login">
                <p className="py-3 mr-40 text-center">
                  Already have an account? 
                  <span className="text-[#FF6016] hover:text-red-500 cursor-pointer"> Sign In</span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
