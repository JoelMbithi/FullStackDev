import React, { useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";
import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";


const BannerProduct = () => {
  const [currentImage,setCurrentImage] = useState(2)
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  return (
    <div className="container mx-auto mb-10 px-4 rounded ">
      <div className="h-72 w-full bg-slate-200">
        <div className="flex">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div className="w-full h-full min-w-full min-h-full translate" key={imageUrl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                <img className="w-full h-full " src={imageUrl} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
