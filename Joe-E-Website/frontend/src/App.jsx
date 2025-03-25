import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home"; // Ensure the correct path
import Header from "./components/Header.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SignUp from "./pages/SigUp.jsx";



const Layout = () => {
  return (
    <div className="app ">
       <Header />
      <Outlet />
      <Footer/>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
   
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element:<Login/>,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
