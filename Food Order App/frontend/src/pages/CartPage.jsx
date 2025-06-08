import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import newRequest from '../utils/newRequest'
const CartPage = () => {

  const [products,setProducts] = useState([])
   const [quantities, setQuantities] = useState({});

   

   const addProduct = async (productId) => {
    const res = await newRequest.post('/product/addToCart', { productId });
    if (res.data.success) {
      setProducts((prevProducts) => [...prevProducts, res.data.product]);
    } else {
      console.error('Failed to add product to cart');
    }
     
  }

  const incrementProduct = async (productId) => {
  const updatedQuantities = { ...quantities };
  updatedQuantities[productId] = (updatedQuantities[productId] || 1) + 1;
  setQuantities(updatedQuantities);

  try {
    const res = await newRequest.post('/product/updateCartQuantity', {
       user_id:localStorage.getItem("user_id"),
       product_id: productId,
       quantity: updatedQuantities[productId]
    })
  } catch (error) {
    console.log(error)
  }
};

const decrementProduct = async  (productId) => {
  const updatedQuantities = { ...quantities };
  if (updatedQuantities[productId] && updatedQuantities[productId] > 1) {
    updatedQuantities[productId] -= 1;
  } else {
    updatedQuantities[productId] = 1;
  }
  setQuantities(updatedQuantities);

    try {
    const res = await newRequest.post('/product/updateCartQuantity', {
       user_id:localStorage.getItem("user_id"),
       product_id: productId,
       quantity: updatedQuantities[productId]
    })
  } catch (error) {
    console.log(error)
  }
};

  const fetchProducts = async () => {
    try {
      const res = await newRequest.get('/product/allProduct');
      setProducts(res.data.data);


     
     /*  console.log(res.data.data); */
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  },[])
  return (
    <div className="bg-gray-50 mt-20 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-3xl font-bold text-slate-500 mb-6">
          Your Shopping Cart
        </h1>

      {products && products.map((product, index) => (
  <div key={index} className="flex flex-col sm:flex-row bg-white rounded justify-between py-4 shadow w-full px-4 gap-4">
    <div className="p-2 flex justify-center sm:block">
      <img
        className="w-32 h-20 object-cover rounded-lg bg-blend-multiply shadow-md"
        src={product.image_url || "https://placehold.co/500x400?text=No+Image"}
        alt="Cart item"
      />
    </div>

    <div className="py-2 sm:py-6 text-center sm:text-left">
      <h1>{product.name || "Burger"}</h1>
    </div>

    <div className="py-2 sm:py-6 flex flex-row justify-center sm:justify-start items-center gap-4">
      <button 
        onClick={() => decrementProduct(product._id)} 
        className="text-2xl bg-slate-300 rounded-full h-6 w-6 flex items-center justify-center"
      >
        -
      </button>
      <h1>{quantities[product._id] || 1}</h1>
      <button 
        onClick={() => incrementProduct(product._id)} 
        className="text-2xl bg-slate-300 rounded-full h-6 w-6 flex items-center justify-center"
      >
        +
      </button>
    </div>

    <div className="py-2 sm:py-6 font-bold text-red-600 text-2xl text-center sm:text-left">
      <h1>${product.price || 26.00}</h1>
    </div>

    <div className="py-2 sm:py-6 text-center sm:text-left">
      <h1>Stock</h1>
    </div>
  </div>
))}


        <div className="bg-white mt-6 flex flex-col sm:flex-row justify-between px-2 py-4 shadow w-full gap-4">
          <div className="font-bold text-2xl px-2 py-2 text-slate-500">
            <h1>Subtotal</h1>
          </div>
          <div className="flex flex-row px-2 py-2 gap-4 items-center justify-center sm:justify-end">
            <p className="rounded-full bg-red-400 p-2 text-xs text-white cursor-pointer">
              Promo Code?
            </p>
            <h1 className="p-2 text-xl text-red-600 font-bold">$345.76</h1>
          </div>
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <Link to="/" className="bg-black text-white p-2 rounded w-full">
            Back to Shopping
          </Link>
          <button className="bg-blue-700 text-white p-2 rounded w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
