import React from 'react'
import { Link } from "react-router-dom"
import star from "../../assets/star.png"
import heart from "../../assets/heart.png"
import "./GigCard.scss"


const GigCard = ({item}) => {
  return (
    <div className='gigCard'>
        <Link to="/gig/123">
        <img src={item.img} alt="" />
        <div className="info">
            <div className="user">
                <img src={item.pp} alt="" />
                <span>{item.username}</span>
            </div>
            <p>{item.desc}</p>
            <div className="star">
                <img src={star} alt="" />
                <span>{item.star}</span>
            </div>
        </div>
        
        <hr />
        <div className="details">
            <img src={heart} alt="" />
            <div className="price">
            <span>STARTING AT</span>
            <h2>{item.price}</h2>
            </div>
            
        </div>
        </Link>
      
    </div>
  )
}

export default GigCard
