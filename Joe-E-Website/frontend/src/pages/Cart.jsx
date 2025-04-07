import React, { useEffect, useState } from 'react'
import newRequest from '../utils/newRequest'

const cart = () => {
const [data,setData] = useState(null)
const [loading ,setLoading] = useState(false)

const fetchData = async ()=> {
  try {
    setLoading(true)
    const res = await newRequest.get("/addProductToCart/countTotalItems")
   setLoading(false)
    setData(res.data)
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
},[])

console.log(data)
  return (
    <div className='container mx-auto '>
     <div className='flex flex-col items-center justify-center bg-white rounded text-lg my-4 p-4'>
     { loading ? (
          <div className="bg-slate-300 h-full w-full animate-pulse flex items-center justify-center text-white">
            <p>Loading...</p>
          </div>)
       :( !data || data.count === 0 ? (
            <p className='p-4 text-slate-600'>No Data</p>
        ) 
        : (
          <>
            < p className="text-slate-800 font-semibold">{data?.message} </p>
          <p className="text-[#FF6016] text-3xl font-bold">{data?.count}</p> 
        </>
        )
      )}
     </div>
    </div>
  )
}

export default cart


