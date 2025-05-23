import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Product from "./pages/Product"
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage';
import ProductDetails from './components/Product/ProductDetails'

// Wrapper component to access location outside of <Routes>
const AppLayout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product" element={<Product />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/product/:product_id" element={<ProductDetails />} />
        </Routes>
      </div>
      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
