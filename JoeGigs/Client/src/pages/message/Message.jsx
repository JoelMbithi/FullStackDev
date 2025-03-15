import React from "react";
import { Link } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">MESSAGES</Link> {">"} Joe Mbithi
        </span>
        <div className="messages">
          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              Hello! I'm interested in your services. Could you tell me more
              about what you offer?
            </p>
          </div>

          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              Hi! Of course. We specialize in high-quality design and
              development services. What exactly are you looking for?
            </p>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              I'm looking for a modern and user-friendly website for my
              business. Do you provide custom designs?
            </p>
          </div>

          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              Yes, we do! We can create a fully customized website tailored to
              your business needs. Do you have any design preferences?
            </p>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              I prefer a clean and minimalistic look with a focus on user
              experience. How long does the development process take?
            </p>
          </div>

          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              That sounds great! Depending on the complexity, it typically takes
              2-4 weeks. We ensure quality work and timely delivery.
            </p>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>That works for me! What are the next steps to get started?</p>
          </div>

          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              We'll start with a brief consultation to understand your exact
              needs. I’ll send you a proposal with the details. Sounds good?
            </p>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              Sounds perfect! Looking forward to working with you. Thanks for
              your time!
            </p>
          </div>

          <div className="item owner">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>Likewise! I’ll be in touch soon. Have a great day!</p>
          </div>
        </div>
        <hr />
        <div className="write">
          <textarea placeholder="write a message" id="" cols="30" row="10"></textarea>
          <button>send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
