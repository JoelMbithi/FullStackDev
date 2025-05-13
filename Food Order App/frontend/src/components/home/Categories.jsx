import React, { useEffect } from 'react'
import { useState } from 'react'
import newRequest from '../../utils/newRequest'

const categories = () => {
  const [category,setCategory] = useState(null)

  const fetchCategory = async() => {
    try {
      const res = await newRequest.get(`/product/allProduct`)
      setCategory(res.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  },[])
  return (
   <div className='container flex flex-col '>
    <div className='font-bold text-2xl px-4 py-4 '>
   <h1>Top Categories</h1>
   </div>
     <div className=' flex flex-row gap-   '>
   
     {category && category.map((categories,index) => (
    
         <div  key={index} className='flex flex-col   px-4 py-4  '>
       <div className='bg-slate-200 shadow rounded-full  h-30 w-30 flex flex-col items-center justify-center'>
        <img className='h-20 w-20 rounded object-scale-down bg-blend-multiply' src={categories.image_url || "https://jasmineandtea.com/wp-content/uploads/2021/07/chicken-teriyaki-recipe.jpg"} alt="" />
       </div>
       <div className='font-bold text-xl ml-5'>
       <h1>{categories.name}</h1>
       </div>
          </div>
      
     ))}
    </div>
   </div>
  )
}

export default categories
