import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

// Array containing slide data (title, description, and image)
const slides = [
  {
    title: "Book Appointment With Trusted Doctors",
    description: "Easily find and schedule appointments with highly trusted doctors. Enjoy a seamless experience with expert healthcare professionals at your fingertips.",
    image: assets.header_img
  },
  {
    title: "Find Experienced Healthcare Providers",
    description: "Gain instant access to top-rated healthcare providers. Book your appointment effortlessly and receive quality medical care whenever you need it.",
    image: assets.contact_image
  },
  {
    title: "Your Health, Our Priority",
    description: "Stay connected with expert specialists and receive personalized healthcare from the comfort of your home. Your well-being is our top priority.",
    image: assets.about_image
  }
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect to cycle through slides automatically every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className='relative overflow-hidden h-[500px] flex items-center justify-center'>
      <div className='relative w-full h-full'>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-center bg-blue-600 rounded-lg px-6 md:px-10 lg:px-20 transition-opacity duration-[5000ms] ease-in-out transform ${currentSlide === index ? 'opacity-100 scale-100 shadow-2xl' : 'opacity-0 scale-90 shadow-md'}`}
          >
            {/* Left Side Content */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw]'>
              <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
                {slide.title}
              </p>
              <div className='flex items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt='Profiles' />
                <p>{slide.description}</p>
              </div>
              <a
                href='#speciality'
                className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300'
              >
                Book appointment <img className='w-3' src={assets.arrow_icon} alt='Arrow' />
              </a>
            </div>
            {/* Right Side Image */}
            <div className='md:w-1/2 flex justify-end'>
              <img className='w-full h-auto rounded-lg' src={slide.image} alt='Slide' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
