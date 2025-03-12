import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import profileImage from "../../assets/profile.jpeg"
import { Link, useLocation } from 'react-router-dom'


const App = () => {

    const [active,setActive] = useState(false)
    const [open,setOpen] = useState(false)

    const {pathname} = useLocation(false)


    const isActive = ()=> {
        window.scrollY > 0 ? setActive(true)  : setActive(false);
    }

    useEffect(()=>{
        window.addEventListener("scroll",isActive)

        return ()=> {
            window.removeEventListener("scroll",isActive)
        }
    },[])


    const currentUser= {
        id:1,
        username:"Joe Mbithi",
        isSeller:true
    }

  return (
    <div className={active || pathname !=="/" ? "navbar active": "navbar"}>
      <div className="container">
        <div className="logo">
         <Link  to="/" className='link'>
            <span className="text">JoeGigs</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          <span >Sign In</span>
         { !currentUser?.isSeller && <span>Become a Seller</span>}
         { !currentUser && <button >Join</button>}

{currentUser && (
    <div className="user" onClick={()=> setOpen(!open)}>
        <img src={profileImage} alt="" />
        <span>{currentUser?.username}</span>
        {  open &&
            <div className="options">
            { currentUser?.isSeller && (
                <>
                <Link className='link' to="/myGigs" >Gigs</Link >
                <Link className='link' to="/add" >Add New Gig</Link >
                </>
            )}
            <Link className='link' to="/orders" >Orders</Link >
            <Link className='link' to="/messages">Messages</Link >
            <Link className='link'>Logout</Link >
        </div>}
    </div>
)}

        </div>
      </div>
     { (active || pathname !=="/" ) && ( <>
      <hr />
       <div className="menu">
       <Link className='link' >Graphics & Design</Link>
       <Link className='link'>Video & Animation</Link>
       <Link className='link'>Writing & Translation</Link>
       <Link className='link'>AI Service</Link>
       <Link className='link'>Digital Marketing</Link>
       <Link className='link'>Music & Audio</Link>
       <Link className='link'>Programming & Tech</Link>
       <Link className='link'>Business</Link>
       <Link className='link'>Lifestyle</Link>
       </div>
       </>
       )}
    </div>
  )
}

export default App
