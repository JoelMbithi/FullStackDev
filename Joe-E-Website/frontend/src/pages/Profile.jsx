import React from 'react'
import { HiUserCircle, HiOutlinePencilAlt } from 'react-icons/hi';

const Profile = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-start py-12 px-4'>
      <div className='w-full max-w-2xl justify-center bg-white rounded-lg shadow-xl overflow-hidden'>
           <div>
             <HiUserCircle className="w-32 h-32 " />
           </div>
      </div>
    </div>
  )
}

export default Profile
