import React, { useEffect, useState, useRef } from "react";
import newRequest from "../utils/newRequest";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { addToCart } from "./AddToCart.jsx";
import { Link } from "react-router-dom";

const VerticalCategoryProduct = ({ category, header }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();

  // Fetch products based on category
  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const res = await newRequest.post("/getAllCategoryProduct/getAllProduct", { category });
      setLoading(false);
      setData(res.data.products);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, [category]); 

  // Scroll functions
  const scrollRight = () => {
    if (scrollElement.current) scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    if (scrollElement.current) scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 relative my-6">
      <p className="text-xl font-bold py-4">{header}</p>

      {/* Scroll Buttons */}
      <button onClick={scrollLeft} className="bg-white shadow-md rounded-full p-1 absolute left-0 top-1/2 transform -translate-y-1/2 hidden md:block">
        <FaAngleLeft />
      </button>
      <button onClick={scrollRight} className="bg-white shadow-md rounded-full p-1 absolute right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
        <FaAngleRight />
      </button>

      {/* Product List */}
      <div ref={scrollElement} className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((product) => (
            <Link to={`/productDetails/${product?._id}`} key={product._id} className="w-full min-w-[270px] md:min-w-[310px] max-w-[270px] md:max-w-[310px]  bg-white rounded shadow ">
              {/* Left Section */}
              <div className="bg-slate-100 p-5 h-40 min-w-[120px] md:min-w-[145px]">
                <img src={product.productImages[0]} className="object-scale-down h-full hover:scale-110 transition-transform" alt={product.productName} />
              </div>

              {/* Right Section */}
              <div className="p-4">
                <h2 className="font-medium text-base md:text-lg text-black text-ellipsis line-clamp-1">{product?.productName}</h2>
                <p className="capitalize text-slate-800 text-xs">{product?.brandName}</p>
                 <p className="capitalize text-slate-800 text-xs">{product?.description}</p>
                <div className="flex gap-4">
                  <p className="font-bold text-[#FF6016]">Ksh {product?.selling?.toLocaleString()}.00</p>
                  <p className="text-xs line-through text-gray-400">Ksh {product?.price?.toLocaleString()}.00</p>
                </div>

                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Save Ksh {(product?.price - product?.selling)?.toLocaleString()}.00
                </span>

                <button onClick={(e)=> addToCart(e,product?._id)}  className="w-full py-1.5 bg-[#FF6016] hover:bg-[#E55614] text-white text-sm rounded">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default VerticalCategoryProduct;
