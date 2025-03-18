import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import star from "../../assets/star.png"; 
import heart from "../../assets/heart.png"; 
import "./GigCard.scss"; 
import { useQuery } from '@tanstack/react-query'; 
import noavatar from "../../assets/noavatar.jpg"
import newRequest from '../../utils/newRequest'; 

//display gig item from the gigs
const GigCard = ({ item }) => {
  
  // Fetch user details based on the userId of the gig owner
   // Unique query key to cache user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigsUser", item.userId],
    // API call to get user details
    queryFn: () => newRequest.get(`/user/getUser/${item.userId}`).then(res => res.data), 
  });

  // Log user data whenever it updates (useful for debugging)
  useEffect(() => {
    console.log("User data:", data);
  }, [data]);

  return (
    <Link to={`/gig/${item._id}`} className="link"> 
      {/* Clicking the card navigates to the gig details page */}
      <div className='gigCard'>

        {/* Display the gig's cover image */}
        <img src={item.cover} alt={item.title} />

        <div className="info">
          {/* Show loading message, error message, or user details */}
          {isLoading ? "loading..." 
            : error ? "Something went wrong!" 
            : <div className="user">
                {/* Display user profile image and username */}
                <img src={data?.img || {noavatar}} alt="User Profile" />
                <span>{data?.username}</span>
              </div>
          }

          {/* Display the gig description */}
          <p>{item.desc}</p>

          {/* Display star rating with an icon */}
          <div className="star">
  <img src={star} alt="Star Rating" />
  <span>
    {item.starNumber > 0 
      ? Math.min(5, Math.round((item.totalStars / item.starNumber) * 5)) 
      : "No Ratings Yet"}
  </span>
</div>


        </div>

        <hr /> 

        {/* Display gig pricing and favorite (wishlist) option */}
        <div className="details">
          {/* Heart icon for saving gig */}
          <img src={heart} alt="Favorite" /> 
          <div className="price">
            <span>STARTING AT</span>
            {/* Displaying the gig price */}
            <h2>${item.price}</h2> 
          </div>
        </div>

      </div>
    </Link>
  );
};

export default GigCard;
