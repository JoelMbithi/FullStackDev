import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import "./GigCard.scss";
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const GigCard = ({ item }) => {

  const {isLoading, error, data} = useQuery({
    queryKey:["gigsUser",],
    queryFn: ()=> 
      newRequest.get(`/user/getUser/${item.userId}`)
  })
  useEffect(() => {
    console.log("User data:", data);
  }, [data]);
  return (
    <Link to="/Gig/123" className="link">
    <div className='gigCard'>
     
        <img src={item.cover} alt={item.title} />
        <div className="info">
         { isLoading ? "loading" 
         : error ? "Something went wrong!"
         :  <div className="user">
            <img src={data.img} alt=""/>
            <span>{data.username}</span>
          </div>}
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
