import React from "react";
import "./Review.scss";
import user from "../../assets/user.jpeg";
import flag from "../../assets/kenya.webp";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import chichi from "../../assets/chichi.jpeg";
import dorro from "../../assets/dorro.jpeg";
import star from "../../assets/star.png";

const Review = () => {
  return (
    <div className="reviews-container">
      <div className="review">
        <div className="user">
          <img className="profile" src={user} alt="" />
          <div className="info">
            <span>Joe Mbithi</span>
            <div className="country">
              <img src={flag} alt="" />
              <span>Kenya</span>
            </div>
          </div>
        </div>
        <div className="stars">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <span>5</span>
        </div>
        <p>
          Excellent service! The quality of work exceeded my expectations, and the delivery was on time. Highly recommended!
        </p>
        <div className="helpful">
          <img src={like} alt="" />
          <span>Yes</span>
          <img src={dislike} alt="" />
          <span>No</span>
        </div>
      </div>
      <div className="review">
        <div className="user">
          <img className="profile" src={chichi} alt="" />
          <div className="info">
            <span>Chichi</span>
            <div className="country">
              <img src={flag} alt="" />
              <span>Kenya</span>
            </div>
          </div>
        </div>
        <div className="stars">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <span>4</span>
        </div>
        <p>
          Great work, very satisfied with the experience! Will order again.
        </p>
        <div className="helpful">
          <img src={like} alt="" />
          <span>Yes</span>
          <img src={dislike} alt="" />
          <span>No</span>
        </div>
      </div>
      <div className="review">
        <div className="user">
          <img className="profile" src={dorro} alt="" />
          <div className="info">
            <span>Dorro</span>
            <div className="country">
              <img src={flag} alt="" />
              <span>Kenya</span>
            </div>
          </div>
        </div>
        <div className="stars">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <span>5</span>
        </div>
        <p>
          Amazing service, exceeded my expectations!
        </p>
        <div className="helpful">
          <img src={like} alt="" />
          <span>Yes</span>
          <img src={dislike} alt="" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
