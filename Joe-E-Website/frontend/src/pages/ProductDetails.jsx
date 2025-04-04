import React, { useEffect, useState } from 'react'
import newRequest from "../utils/newRequest"
import {useParams} from "react-router-dom"

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
  const [loading, setLoading] = useState(false)
  
  const {id:productId} = useParams()
   console.log("productId",productId)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
        const res = await newRequest.get(`/getProductDetails/getProductDetails/${productId}`);
      setData(res.data.product)  
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

  return (
    <div className='container mx-auto p-4'>
     <div className='min-h-[20px]'>
      {/*  product image */}
      <div>
        <div>
           {
            loading ? (
              <div>

              </div>
            ) : (
              <div>

              </div>
            )
           }
        </div>
      </div>
       {/*  product image */}
       <div>
        <div>
          
        </div>
      </div>
     </div>
    </div>
  )
}

export default ProductDetails