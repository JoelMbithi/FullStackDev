import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import signin from "../assets/signin.gif";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section id="login" className="bg-[#F1EFE1]">
      <div className="bg-[#F1EFE1]  mx-auto container p-4">
        <div className="bg-white p-5  mt-6 py-5 w-full max-w-md mx-auto">
          {/* login icon */}

          <div className=" w-20 h-20 mx-auto">
            <img className="bg-transparent  mt-10" src={signin} alt="" />
          </div>

          {/* form */}

          <form>
            <div className="grid py-3 mt-10">
              <label>Email</label>
              <div className="bg-slate-100">
                <input
                  className="rounded-2xl outline-none bg-transparent w-full h-full p-3"
                  type="text"
                  placeholder="enter email"
                />
              </div>
            </div>
            <div className="grid  mt-4">
              <label>Password</label>
              <div className="bg-slate-100 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="rounded-2xl outline-none bg-transparent w-full h-full p-3"
                  placeholder="enter password"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className=" flex items-center justify-center h-full w-10"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
            {/*<div className="grid  mt-4">
                    <label>Confirm Password</label>
                    <div className=" flex items-center bg-slate-100">
                        <input type={showConfirmPassword ? "text" : "password"} className='rounded-2xl outline-none bg-transparent w-full h-full p-3'  placeholder='confirm password' />
                        <div className="">
                            <span onClick={()=> setShowConfirmPassword((prev) => (!prev))}  className=' flex items-center justify-center h-full w-10'>
                                {showConfirmPassword ?  <IoEyeOutline />
 
                                : <IoEyeOffOutline />
                                }
                                
                               

                            </span>
                        </div>
                    </div>
                    </div>*/}
            <div className="grid mt-4">
              <div className="">
                <Link
                  to="/forgotPassword"
                  className="text-[#FF6016] underline mr-50 hover:text-[hsl(2,100%,54%)]"
                >
                  Forgot your Password?
                </Link>
              </div>
            </div>
            <div className=" mt-5">
              <button className="bg-[#FF6016] text-white w-full p-3 hover:scale-105 transition-all">
                Login
              </button>
              <Link to="/signup">
                {" "}
                <p className="py-3 mr-40 mt-3">
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
