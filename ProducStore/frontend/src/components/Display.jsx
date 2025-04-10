import React from 'react';
import headphones from '../assets/headphones.png';

const Display = () => {
  return (
    <div className='container flex justify-center w-full h-screen'>
      <div className='bg-yellow-400 h-100 gap-4 mt-18 w-350 rounded flex items-center -mr-15 ml-4'>
        {/* leftItems */}
        <div className='flex flex-col gap-4 p-20'>
            <div className='flex flex-col p-2'>
                <div className='flex gap-2'> {/* Changed from p to div */}
                  <span className='text-slate-800 font-bold text-xl'>Beats</span> 
                  <span className='text-slate-800 mt-1'>Solo</span> {/* Changed from p to span */}
                </div>
                <h1 className='text-4xl text-black font-bold animate-pulse'>wireless</h1>
                <h1 className='text-white text-5xl sticky font-bold'>HEADPHONES</h1>
            </div>
            <div className='p-2 text-xs'>
                <button className='text-xs border-0 p-2 font-bold rounded-full flex items-center bg-red-600'> 
                  Shop By category
                </button>
            </div>
        </div>
         {/* Right Items */}
         <div className='w-1/2 flex justify-center'>
          <img 
            className='h-64 object-contain animate-pulse drop-shadow-2xl' 
            src={headphones} 
            alt="Beats Solo Wireless Headphones" 
          />
        </div>
      </div>
    </div>
  );
};

export default Display;