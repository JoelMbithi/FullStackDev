import React, { useEffect } from 'react';
import Display from '../components/Display';
import { useProductStore } from '../Store/useProductStore';
import { GrCycle } from "react-icons/gr";
import ProductCard from '../components/ProductCard';
import AddProductModule from "../components/AddProductModule"

const Home = () => {
  const {products,error,loading,fetchProducts} = useProductStore()

  useEffect(()=>{
    fetchProducts()
  },[fetchProducts])

  const openAddProductModal = () => {
    document.getElementById("addProductModule").showModal(); // Correct method to open the modal
  };
  console.log("products",products)
  return (
    <div className=''>
    
     
      <Display />

      <main className='-mt-30 max-w-6xl mx-auto px-2 py-2'>
         <div className='flex justify-between items-center mb-8'>
           <button className='bg-green-700 hover:scale-120 transition-all hover:bg-green-400 p-2 rounded text-xs shadow-accent'
           onClick={openAddProductModal} 
           >

            Add Product
           </button>
           <button className=''>
            <GrCycle className='text-xl hover:scale-120 transition-all' />
           </button>
         </div>
        
        <AddProductModule/>
         {
          loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='loading loading-spinner loading-lg'/>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </div>
          )
         }
      </main>
    </div>
  );
};

export default Home;
