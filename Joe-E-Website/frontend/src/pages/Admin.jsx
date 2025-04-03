import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";

const Admin = () => {
  const User = JSON.parse(localStorage.getItem("User")) || {}; // ✅ Fallback if null

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-white w-full min-h-full customShadow max-w-60">
        {/* Admin Header */}
        <div className="bg-[#FF6016] flex flex-col items-center justify-center h-50 gap-4 p-4">
          <div className="text-4xl flex cursor-pointer">
            {User.profilePic ? (
              <img className="w-10 h-10 rounded-full" src={User.profilePic} alt="Profile" />
            ) : (
              <HiUserCircle className="w-10 h-10 text-gray-500" />
            )}
          </div>
          <p className="text-sm font-bold">{User.username || "Admin"}</p>
          <p className="font-bold">{User.role || "Admin"}</p>
        </div>

        {/* Navigation */}
        <nav className="grid py-6 px-4 gap-2">
          <Link to="/admin/all-users" className="px-2 py-1">
            <button className="btnAdmin w-full">All Users</button>
          </Link>
          <Link to="/admin/products" className="px-2 py-1">
            <button className="btnAdmin w-full">Products</button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p>Welcome, {User.username || "Admin"}!</p>
        <Outlet />
        
       <div className="flex container gap-4 p-4">
      
        <div className="bg-white flex justify-center text-center p-4 h-32 w-48 rounded shadow">
          <div className="flex justify-center">
            users
          </div>
        </div>
        <div className="bg-white p-4  h-32 w-48 rounded shadow">Product 2</div>
        <div className="bg-white p-4  h-32 w-48 rounded shadow">Product 2</div>
        <div className="bg-white p-4  h-32 w-48 rounded shadow">Product 2</div>
        
       </div>
        
      </main>
    </div>
  );
};

export default Admin;
