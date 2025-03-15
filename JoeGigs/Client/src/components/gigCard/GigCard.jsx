import React from 'react';
import { Link } from "react-router-dom";
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import "./GigCard.scss";

const GigCard = ({ item }) => {
  return (
    <Link to="/Gig/123" className="link">
    <div className='gigCard'>
     
        <img src={item.img} alt={item.title} />
        <div className="info">
          <div className="user">
            <img src={item.profilePic} alt={item.username} />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={star} alt="Star Rating" />
            <span>{item.rating}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src={heart} alt="Favorite" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
     
    </div>
    </Link>
  );
};

export default GigCard;
