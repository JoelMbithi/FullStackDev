import React, { useEffect, useState } from 'react'
import newRequest from "../utils/newRequest"
import {useParams} from "react-router-dom"
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import VerticalCategoryProduct from '../components/VerticalCategoryProduct';
import HorizontalCategoryProduct from '../components/HorizontalCategoryProduct';



const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: '',
    category: '',
    productImages: [],
    description: '',
    price: '',
    selling: ""
  })
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const {id:productId} = useParams()
   console.log("productId",productId)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
        const res = await newRequest.get(`/getProductDetails/getProductDetails/${productId}`);
      setData(res.data.product)  
      setActiveImage(res.data.product.productImages[0])
      console.log(res.data.product.productImages[0])
      console.log(res.data.product)
    } catch (error) {
      console.log(error)
    } finally {
    setLoading(false) 
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])  // You can keep just product_id if you're sure params won't change without product_id changing

    const handleDisplayImage = (image) => {
      setActiveImage(image)
        }

  return (
    <div className='container mx-auto p-4 overflow-scroll'>
     <div className='min-h-[20px] flex  flex-col lg:flex-row gap-6'>
      {/*  product image */}
      <div className='h-96 flex flex-col lg:flex-row-reverse gap-2 relative'>
        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
          <img src={activeImage}
          className='w-full h-full object-scale-down mix-blend-multiply'
          alt="" />
        </div>
         {/*    product zoom */}
        
        <div className='h-full'>
           {
            loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                  productImageListLoading.map((product,index)=> {
                    return(
                       <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>
                          
                       </div>
                    )
                  })
                }
              </div>
             
            ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data.productImages.map((image,index)=>{
                      return (
                        <div className='h-20 w-20 h-1 bg-slate-200 rounded p-1' key={image}>
                          <img src={image} 
                          onClick={()=>handleDisplayImage(image)}
                          onMouseOver={()=>handleDisplayImage(image)}
                          className='h-full w-full object-scale-down animate-purlse  cursor-pointer mix-blend-multiply'
                           />
                        </div>
                      )
                    })
                  }
              </div>
            )
           }
        </div>
      </div>
       {/*  product detail */}
     {
      loading ? "Loading"
      :  
      <div className='flex flex-col gap-3 ' >
       
      <div className='bg-red-50  h-grow w-grow  '>
         <p className='bg-red-100 text-2xl text-[#FF6016] px-5 font-bold py-2 rounded'>{data?.brandName}</p>
      <h2 className='text-3xl px-4 py-1 font-medium text-slate-800 '>{data?.productName}</h2>
      <p className='capitalize px-4  text-slate-500'>{data?.category}</p>

      <div className='text-yellow-400 px-4 py-2 flex flex- items-center gap-2 '>
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      
      <FaStarHalf />
           </div>
           <div className=' flex items-center gap-4 text-xl py-3 px-4'>
            <p className='font-bold text-red-600 '>Ksh  {data?.selling}.00</p>
            <p className=' line-through text-slate-400 '>Ksh  {data?.price}.00</p>

           </div>
            <div className='flex  place-items-center px-4 my-4 gap-3'>
              <button className='border-2 border-red-600 px-4 py-2 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white rounded'>Buy</button>
              <button className='border-2 border-red-600 px-4 py-2 min-w-[100px] bg-red-600 text-white font-medium hover:bg-white hover:text-red-600 rounded'>Add To Cart</button>
            </div>

            <div className=' bg-slate-200 p-4 rounded'>
              <p className='font-medium  text-slate-600 '>Description:</p>
              <p>{data?.description}</p>
            </div>
      </div>
    </div>
     
     } 
     </div>
   
      <HorizontalCategoryProduct 
        category={"smart-watch"} 
        header={"Recommended Categories"} 
      />

<VerticalCategoryProduct 
        category={"mobile-phone"} 
        header={"Recommended Categories"} 
      />
    </div>
  )
}

export default ProductDetails