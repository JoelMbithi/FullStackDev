import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignUp from "./pages/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import Admin from "./pages/Admin.jsx";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";

// Layout for main pages
const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <ToastContainer />
      <Header />
      <main className="flex-grow max-h-full w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};



// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forgotPassword", element: <ForgotPassword /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/admin",
        element: <Admin />,
        children: [
        
          { path: "products", element: <Products /> },
          { path: "all-users", element: <Users /> },
        ],
        
      },
      {
        path:"/profile",
      element:<Profile/>
      },
      {
        path: "/settings",
        element:<Setting/>
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
