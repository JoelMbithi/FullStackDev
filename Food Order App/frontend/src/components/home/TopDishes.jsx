import React from 'react'

const TopDishes = () => {
  return (
    <div className='container flex flex-col  px-6 gap-4 mt-20'>
  <h1 className='font-bold text-2xl flex  '>Top of the week</h1>
        
    <div className='flex flex-row gap-4 mt-4'>
    <div className='flex flex-col rounded h-grow bg-white shadow w-77' >
      <div>
        <img  className="object-fit " src="https://jasmineandtea.com/wp-content/uploads/2021/07/chicken-teriyaki-recipe.jpg" alt="" />
      </div>
      <div className="p-4 mb-2">
  <h1 className='font-semibold text-lg'>Burger</h1>
  <p>Smooth burger</p>
  <p className='text-md font-bold' >$63.76</p>
  <div className="flex items-center">
    <p className='mr-2'>⭐⭐⭐⭐⭐  </p>
    <p>(2343)</p>
  </div>
</div>
      </div>
     
     
    </div>
    </div>
  )
}

export default TopDishes
