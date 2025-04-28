import React, { Profiler } from 'react'
import "./App.css"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Properties from './pages/Properties'
import Profile from './pages/Profile'
import Users from "./pages/UsersManagement"; 

const App = () => {
  return (
    <div>
      <NavBar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="users" element={<Users />} />
        <Route path="/properties" element={<Properties/>}/>
        <Route path="/profile" element={<Profile/>}/>
       </Routes>
      <Footer />
      
    </div>
  )
}

export default App
