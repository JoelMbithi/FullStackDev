import React from 'react'
import "./Gig.scss"

const gig = () => {
  return (
    <div className='gig'>
      <div className="container">
        <div className="left">
          <span className="info">JoeGigs {'>'} Graphics & Design {'>'}</span>
          <h1>I will create generated art for you</h1>

          <div className="user">
            <img src="" alt="" />
            <span>joe Mbithi</span>
            <div className="stars"></div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  )
}

export default gig
