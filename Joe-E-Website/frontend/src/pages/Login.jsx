import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import signin from "../assets/signin.gif";
import newRequest from "../utils/newRequest";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/user/login", data);
      console.log("Response:", res.data);
      
      // Save user data to localStorage
      localStorage.setItem("User", JSON.stringify(res.data));

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
    }
  };

  return (
    <section id="login" className="bg-[#F1EFE1]">
      <div className="bg-[#F1EFE1] mx-auto container p-4">
        <div className="bg-white p-5 mt-6 py-5 w-full max-w-md mx-auto">
          {/* login icon */}
          <div className="w-20 h-20 mx-auto">
            <img className="bg-transparent mt-10" src={signin} alt="" />
          </div>

          {/* form */}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid py-3 mt-10">
              <label>Email</label>
              <div className="bg-slate-100">
                <input
                  onChange={handleChange}
                  name="email"
                  value={data.email}
                  className="rounded-2xl outline-none bg-transparent w-full h-full p-3"
                  type="text"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="grid mt-4">
              <label>Password</label>
              <div className="bg-slate-100 flex">
                <input
                  onChange={handleChange}
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  className="rounded-2xl outline-none bg-transparent w-full h-full p-3"
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
              <Link
                to="/forgotPassword"
                className="text-[#FF6016] underline hover:text-[hsl(2,100%,54%)]"
              >
                Forgot your Password?
              </Link>
            </div>

            <div className="mt-5">
              <button type="submit" className="btn">
                Login
              </button>
              <Link to="/signup">
                <p className="py-3 mt-3">
                  Don't have an account?{" "}
                  <button className="text-[#FF6016] hover:text-[hsl(2,100%,54%)]">
                    Sign up
                  </button>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
