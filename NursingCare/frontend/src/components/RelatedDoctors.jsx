import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext);
    //create use state to store all doctors data
    const [relDoc,setRelDoc] = useState([])
   
    const navigate = useNavigate();

    useEffect(()=>{

        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    },[doctors,docId,speciality])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
    <h1 className='text-3xl font-medium'>Find & Book the Best Doctors Near You</h1>  
    <p className='sm:w-1/3 text-center text-sm'>
        Explore our carefully curated list of highly trusted, top-rated doctors. Booking your appointment has never been easier!
    </p>

    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item,index) => (
            <div 
                key={item.id || item._id} // Ensure unique key
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
onClick={() => {navigate(`/appointment/${item.id || item._id}`); window.scrollTo(0, 0)}} //                 Fix reference
            >
                <img className='bg-blue-50 w-full' src={item.image} alt={item.name} />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Available</p>
                    </div>
                    <p className='font-semibold'>{item.name}</p>
                    <p className='text-gray-500'>{item.speciality}</p>
                </div>
            </div>
        ))}
    </div>
    
    <button className='mt-6 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition-all'>
        More
    </button>
</div>
  )
}

export default RelatedDoctors
