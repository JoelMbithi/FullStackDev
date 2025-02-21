import React, { useState } from 'react'
import { assets } from '../assets/assets' // Adjust the path to where your assets are located

const Profile = () => {

  const [userData, setUserData] = useState({
    name: "Joel Mbithi",
    image: assets.profile_pic,
    email: "joellembithi@gmail.com",
    phone: "+254 743 861 565",
    address: {
      line1: "TelAviv Nairobi",
      line2: "Chuka University"
    },
    gender: "male",
    dob: "2003-10-01"
  })

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt='' />

      {
          isEdit 
          ? <input className='bg-gray-200 rounded px-2 text-3xl font-medium max-w-60 mt-4' onChange={e => setUserData(prev =>({...prev,name:e.target.value}))}  value={userData.name} type="text"/>
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
         }        

      <hr className='bf-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
     
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email id:</p>
        <p className='text-blue-500'>{userData.email}</p>
        <p className='font-medium'>Phone:</p>
        {
          isEdit
            ? <input className='bg-gray-200 rounded px-3 max-w-52' onClick={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} type='text' />
            : <p className='text-blue-400'>{userData.phone}</p>
        }
        <p className='font-medium'>Address:</p>
        {
          isEdit
            ?
            <div>
              <input className='bg-gray-200' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type='text' />
              <br />
              
              <input className='bg-gray-200' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type='text' />
            </div>
            :
            <div>
              <p className='text-gray-500'>{userData.address.line1}</p>
              <br />
              <p className='text-gray-500'>{userData.address.line2}</p>
            </div>

        }
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-200' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit 
            ? <input className='max-w-28 bg-gray-200' type='date' onChange={(e) => setUserData(prev => ({...prev, dob:e.target.value}))} value={userData.dob}/>
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit 
        ? <button className='border border-gray-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' onClick={()=> setIsEdit(false)}>Save information</button>
        : <button className='border border-gray-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
    </div>

  )
}

export default Profile
