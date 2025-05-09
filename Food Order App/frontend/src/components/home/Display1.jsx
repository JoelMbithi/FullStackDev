import React from 'react'

const Display1 = () => {
  return (
    <div className="mx-auto flex h-grow flex-col gap-6 mt-10 items-center justify-center px-4">
      {/* search input */}
      <div className="w-full lg:w-320px">
        <input
          type="text"
          placeholder="Search on here"
          className="w-full p-2 rounded text-slate-600 border border-slate-600"
        />
      </div>

      {/* display */}
      
      <div className="w-full max-w-320px bg-green-700 rounded shadow h-80 text-white flex flex-row justify-between items-center p-4">
      
        <div  className="flex flex-col gap-10 ">
        <h1 className=" text-6xl font-semibold">Delivery to Home</h1>
        <p className="text-sm mt-2">Your items will be delivered quickly and safely to your doorstep.</p>
        <h1 className='bg-white font-bold text-xl text-slate-600 p-2 w-40 rounded'>24Hrs </h1>
        </div>
        <div>
           <div className="hidden ml-4 md:flex flex-row gap-6">
    <img
      className="object-cover h-55 w-55 animate-pulse rounded-full"

      src="https://www.cookingclassy.com/wp-content/uploads/2018/04/teriyaki-chicken-15.jpg"
      alt="Chicken Teriyaki"
    />
    <img
      className="object-cover h-55 w-55 animate-pulse rounded-full"

      src="https://www.cookingclassy.com/wp-content/uploads/2018/04/teriyaki-chicken-15.jpg"
      alt="Chicken Teriyaki"
    />
  </div>
        </div>
      </div>

      {/* display 2 */}

      <div className="w-full max-w-320px bg-slate-200 rounded shadow h-55 flex flex-row justify-between items-center p-4">
  <div className="flex-1">
    <h1 className="text-2xl font-bold">Chicken Teriyaki</h1>
    <p className="text-sm text-red-600">Discount 25%</p>
    <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
      Order Now
    </button>
  </div>
  <div className="ml-4">  
    <img
      className="object-cover h-55 w-200 rounded"
      src="https://cdn.apartmenttherapy.info/image/upload/f_jpg%2Cq_auto%3Aeco%2Cc_fill%2Cg_auto%2Cw_1500%2Car_16%3A9/k%2FPhoto%2FRecipes%2F2024-05-chicken-teriyaki-190%2Fchicken-teriyaki-190-171-horizontal"
      alt="Chicken Teriyaki"
    />
  </div>
</div>


     
    </div>
  )
}

export default Display1
