import React, { useEffect, useState } from 'react'
import newRequest from '../../utils/newRequest'
import { useParams } from "react-router-dom";


const TopDishes = () => {
  const [product,setProduct] = useState(null)
   const {product_id} = useParams()
   const [cart,setCart] = useState([])

/* function to add to cart */

const addToCart = (item) => {
  setCart([...cart, item])
  console.log(item)
}

  const fetchProduct = async () => {
    try {
      const res = await newRequest.get(`/product/allProduct`)
      console.log(res.data.data)
      setProduct(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchProduct()
  },[])
  return (
    <div className='container flex flex-col   px-6 gap-4 mt-20'>

 <h1 className='font-bold text-2xl flex  '>Top of the week</h1>
 

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
{product && product.map((products,index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={products.image_url
                    || "https://jasmineandtea.com/wp-content/uploads/2021/07/chicken-teriyaki-recipe.jpg"}  
                   
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{products.description ||"Smooth burger"}</h3>
                  <div className="flex items-center mt-1">
                    
                    <span className="text-gray-600 text-xs ml-1">⭐⭐⭐⭐⭐(24)</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-gray-900">${products.price || "63.76"}</span>
                   
                  </div>
                  <button onClick={() => addToCart(product)} className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default TopDishes

