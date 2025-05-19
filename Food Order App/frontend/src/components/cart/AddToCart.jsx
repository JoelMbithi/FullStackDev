import React, { useEffect, useState } from 'react'
import newRequest from '../../utils/newRequest'

const AddToCart = ({ userId, productId }) => {
    const [addToCart,setAddToCart] = useState([])   
   

    const handleAddToCart = async () => {
        try {
          const response = await newRequest.post(`/product/addToCart`, {
            user_id: userId,
            product_id: productId,
            quantity: 1,
          });
          console.log({ user_id: userId, product_id: productId, quantity: 1 });


          console.log("Added to cart:", response.data.data);
         
        } catch (error) {
          console.error("Error adding to cart", error);
          
        }
      };
  return (
    
    <button 
    onClick={handleAddToCart}
    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
  >
    Add to Cart
  </button>
  )
}

export default AddToCart
