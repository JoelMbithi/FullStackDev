import React, { useEffect, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start rotation animation
      setIsRotating(true);
      
      // After rotation completes, change image
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % desktopImages.length);
        setIsRotating(false);
      }, 1000); 
    }, 10000); 
    
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  return (
    <div className="container mx-auto mb-6 px-2  rounded">
      <div className="h-60 md:h-72 w-full overflow-hidden  background-color ">
        
        {/*  desktop and tablet image */}
        <div className="hidden md:flex relative h-full">

        
          {desktopImages.map((imageUrl, index) => {
            const isActive = index === currentImage;
            return (
              <div
                className={`w-full h-full min-w-full min-h-full absolute transition-all duration-1000 ${
                  isActive 
                    ? isRotating 
                      ? 'rotate-y-180' 
                      : 'opacity-100' 
                    : 'opacity-0'
                }`}
                key={imageUrl}
                style={{
                  transform: isActive 
                    ? isRotating 
                      ? 'rotateY(200deg)' 
                      : 'translateX(0)' 
                    : 'translateX(-100%)',
                  zIndex: isActive ? 10 : 0
                }}
              >
                <img 
                  className="w-full h-full object-cover overflow-hidden" 
                  src={imageUrl} 
                  alt={`Slide ${index + 1}`} 
                />
              </div>
            );
          })}
        </div>

   {/*  mobile view image */}
        <div className="flex  h-full md:hidden">

{mobileImages.map((imageUrl, index) => {
  const isActive = index === currentImage;
  return (
    <div
      className={`w-full h-full min-w-full min-h-full absolute transition-all duration-1000 ${
        isActive 
          ? isRotating 
            ? 'rotate-y-180' 
            : 'opacity-100' 
          : 'opacity-0'
      }`}
      key={imageUrl}
      style={{
        transform: isActive 
          ? isRotating 
            ? 'rotateY(200deg)' 
            : 'translateX(0)' 
          : 'translateX(-100%)',
        zIndex: isActive ? 10 : 0
      }}
    >
      <img 
        className="w-full h-60 object-cover overflow-hidden" 
        src={imageUrl} 
        alt={`Slide ${index + 1}`} 
      />
    </div>
  );
})}
</div>
      </div>
    </div>
  );
};

export default BannerProduct;