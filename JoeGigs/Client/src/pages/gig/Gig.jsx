import React from "react";
import "./Gig.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import star from "../../assets/star.png";
import user from "../../assets/user.jpeg";
import flag from "../../assets/kenya.webp";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import chichi from "../../assets/chichi.jpeg";
import dorro from "../../assets/dorro.jpeg";
import clock from "../../assets/clock.png";
import cycle from "../../assets/recycle.png";
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { useParams } from "react-router-dom"
import greenCheck from "../../assets/greencheck.png";

const gig = () => {

  const {id} = useParams()
 

  //to fetch gig from gigs
  const {isLoading,error,data, refetch} = useQuery({
    queryKey:["gig"],
    qqueryFn: ()=>
      newRequest.get(`/gigs/singleGig/${id}`).then((res) => {
        return res.data;
      })
  })



  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };



  return (
    <div className="gig">
      { isLoading ? "loading" 
      : error ? "something went wrong!"
      : <div className="container">
        <div className="left">
          <span className="breadCrumb">
            JoeGigs {">"} Graphics & Design {">"}
          </span>
          <h1>{data.title}</h1>

          <div className="user">
            <div className="profile">
              <img src={user} alt="" />
            </div>

            <span>Joe Mbithi</span>
            <div className="stars">
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <span>5</span>
            </div>
          </div>
          <Slider {...settings} className="slider">
            {data.images.map((img) => (
              <img
              key={img}
              src={img}
              alt=""
              />
            ))}
            
          </Slider>

          <h2>About This Gig</h2>
          <p>
           {data.desc}
          </p>

          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src={user} alt="" />
              <div className="info">
                <span>Joe Mbithi</span>
                <div className="stars">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">Kenya</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">5 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                My name is Karen, I enjoy creating AI generated art in my spare
                time. I have a lot of experience using the AI programe and that
                means i know what to prompt the AI with to get a great and
                incredibly detailed result
              </p>
            </div>
          </div>

          {/*reviews*/}
          <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
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
                Excellent service! The quality of work exceeded my expectations,
                and the delivery was on time. Highly recommended!
              </p>

              <div className="helpful">
                <img src={like} alt="" />
                <span>Yes</span>
                <img src={dislike} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img className="profile" src={chichi} alt="" />
                <div className="info">
                  <span>Christine Mutheu</span>
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
                Excellent service! The quality of work exceeded my expectations,
                and the delivery was on time. Highly recommended!
              </p>

              <div className="helpful">
                <img src={like} alt="" />
                <span>Yes</span>
                <img src={dislike} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img className="profile" src={dorro} alt="" />
                <div className="info">
                  <span>Dorcus Wanza</span>
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
                Excellent service! The quality of work exceeded my expectations,
                and the delivery was on time. Highly recommended!
              </p>

              <div className="helpful">
                <img src={like} alt="" />
                <span>Yes</span>
                <img src={dislike} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
           {data.desc}
          </p>
          <div className="details">
            <div className="item">
              <img src={clock} alt="" />
              <span>{data.deliveryDate} days Delivery</span>
            </div>
            <div className="item">
              <img src={cycle} alt="" />
              <span>{data.revisionNumber} Revision</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((features)=> (
              <div className="item">
              <img src={greenCheck} alt="" />
              <span>{feature}</span>
            </div>
            ))}
            
           
    
          </div>
          <button>Continue</button>
        </div>
      </div>}
    </div>
  );
};

export default gig;
