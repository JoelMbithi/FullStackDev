import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
