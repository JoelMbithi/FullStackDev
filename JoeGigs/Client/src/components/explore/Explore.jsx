import React from "react";
import "./Explore.scss";
import check from "../../assets/check.png";

const Explore = () => {
  return (
    <div className="explore">
      <div className="container">
        <div className="leftItem">
          <h1>
            WorkMate<i>business</i>
          </h1>
          <div className="item">
            <h1>
              A business solution design for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience with tools and benefits dedicated
              to business
            </p>
            <div className="title">
              <img src={check} alt="" />
              Find the right talent. Build without limits. Grow with confidence.
            </div>
            <div className="title">
              <img src={check} alt="" />
              Find the right talent. Build without limits. Grow with confidence.
            </div>
            <div className="title">
              <img src={check} alt="" />
              Find the right talent. Build without limits. Grow with confidence.
            </div>

            <button>Explore WorkMate Business</button>
          </div>
        </div>
        <div className="rightItem">
        <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
        </div>
      </div>
    </div>
  );
};

export default Explore;
