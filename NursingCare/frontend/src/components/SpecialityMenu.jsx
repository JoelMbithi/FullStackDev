import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  // Duplicate the specialityData array to create a seamless loop
  const duplicatedSpecialityData = [...specialityData, ...specialityData];

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find & Book the Best Doctors Near You</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Explore our carefully curated list of highly trusted, top-rated doctors. Booking your appointment has never been easier!
      </p>

      {/* Scrollable Container with Infinite Animation */}
      <div className="overflow-hidden w-full">
        <div className="flex animate-scroll">
          {duplicatedSpecialityData.map((item, index) => (
            <Link
              onClick={() => window.scrollTo(0, 0)}
              key={index} // Use index as key since we're duplicating items
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500 w-24 sm:w-32 mx-4'
              to={`doctors/${item.speciality}`}
            >
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;