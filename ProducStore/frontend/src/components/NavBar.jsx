import React from 'react';
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiBasketLight } from "react-icons/pi";
import { useResolvedPath } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ThemeSelector from '../components/ThemeSelector.jsx';
import { useThemeStore } from '../Store/useStoreTheme.jsx';

const NavBar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  const { theme } = useThemeStore();

  console.log('Current theme on Home:', theme);
  return (
    <div className='h-[1.4rem] right-0 w-full sticky bg-[#a5a5a5] top-0 z-100'> 
      <div className='flex text-center px-15 gap-10 text-sm'>
        <p className='text-sm animate-bounce'>Free shipping on orders over $50</p> 
        <p>30-Day Money Back Guarantee</p>
      </div>

      {/* Navbar */}
      <div
        className='flex justify-evenly py-4 border sticky h-15 stick z-10 w-full'
        data-theme={theme}  // Changed this to dynamic theme
      >
        {/* Logo */}
        <div className='-ml-20'>
          <h1 className="font-bold text-2xl">
            <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              Joe
            </Link>
            <Link to="/" className="text-green-700">Store</Link>
          </h1>
        </div>

        <div className='flex gap-6 text-slate-400 text-sm justify-around'>
          <span className='hover:text-white'>products</span>
          <span className='hover:text-white'>Pricing</span>
          <span className='hover:text-white'>Solutions</span>
          <span className='hover:text-white'>About</span>
          <span className='hover:text-white'>Customers</span>
        </div>

        <div className='flex flex-row text-slate-400 p-2 gap-6 -mr-40'>
          <div className='flex flex-row gap-2'>
            <p className='text-sm text-white'>login</p>
            <CiUser className='text-xl' />
          </div>
          {/* Theme selector */}
          <div className='text-xs  flex gap-2'>
            <ThemeSelector />
            {isHomePage && (
              <div className='indicator'>
                <div className='rounded-full hover:bg-base-200 transition-colors'>
                  <PiBasketLight className='text-xl' />
                  <span className='rounded-full badge indicator-items -mt-19 bg-red-500'>0</span>
                </div>
              </div>
            )}
          </div>

          <CiSearch className='text-xl' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
