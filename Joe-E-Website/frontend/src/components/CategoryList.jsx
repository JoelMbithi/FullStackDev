import React, { useEffect, useState } from 'react';
import newRequest from "../utils/newRequest.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryList = () => { 
  const [categoryData, setCategoryData] = useState({
    categories: [],
    products: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const res = await newRequest.get("/productCategory/productCategory");
      setCategoryData({
        categories: res.data.categories || [],
        products: res.data.data || []
      });
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Product Categories</h2>
      
      {categoryData.categories.length > 0 ? (
        <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {categoryData.categories.map((category, index) => {
            const product = categoryData.products.find(p => p.category === category);
            
            return (
              <div key={index}>
                <Link 
                  to={`/category-product/${category}`} 
                  className="inline-flex flex-col items-center flex-shrink-0 cursor-pointer"
                >
                  <motion.div 
                    className='w-16 h-16 md:w-20 md:h-20 p-4 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {product?.productImages?.[0] ? (
                      <motion.img 
                        src={product.productImages[0]} 
                        alt={category}
                        className='object-scale-down mix-blend-multiply'
                        onError={(e) => {
                          e.target.src = '/placeholder-category.png';
                          e.target.className = 'w-full h-full object-cover';
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                        <span className="text-xs text-gray-500">No image</span>
                      </div>
                    )}
                  </motion.div>
                  <p className='mt-2 text-center capitalize text-sm md:text-base'>
                    {category.replace(/-/g, ' ')}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default CategoryList;
