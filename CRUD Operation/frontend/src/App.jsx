import React from 'react'
import "./App.css"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Home/>
      <Footer />
    </div>
  )
}

export default App
