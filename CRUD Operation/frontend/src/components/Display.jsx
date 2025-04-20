import React from 'react';
import image from "../assets/build.png";

const Display = () => {
  return (
    <div 
      className="relative h-64 w-90% rounded m-4 mr-4 bg-cover bg-center flex items-center justify-center text-white" 
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute  inset-0  bg-opacity-40 rounded" />
     <div>
     <h1 className="relative text-3xl font-bold z-10 text-white text-center">
        Let's find a home <br /> that's perfect for you
      </h1>
      <p>search confidently with your trusted source of homes for sale or rent</p>
     </div>
    </div>
  );
};

export default Display;
