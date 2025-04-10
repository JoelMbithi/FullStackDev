import React from "react";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom"
import { useProductStore } from "../Store/useProductStore";

const ProductCard = ({ product }) => {
const {deleteProduct} = useProductStore()
  return (
    <div className="card bg-slate-200 shadow-xl 
    hover:shadow-2xl hover:scale-[1.02] 
    transition-all duration-300 ease-in-out
    transform-gpu will-change-transform ">
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt=""
        />
      </figure>

      <div className="flex flex-col gap-2 py-2 px-4">
        <p className="text-2xl text-black font-bold">{product.name}</p>
        <h1 className="text-xl text-green-600 font-bold">$ {product.price}</h1>
      </div>

      <div className="flex flex-row-reverse gap-3 p-4">
       
        <Link to="/"
          className="p-2 border rounded-full text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-200 ease-in-out"
          aria-label="Delete"
          onClick={()=> deleteProduct(product.id)}
        >
          <MdDelete className="text-2xl" />
        </Link>
        <Link to={ `/products/${product.id}`}
          className="p-2 border rounded-full text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 ease-in-out"
          aria-label="Edit"
        >
          <LiaEdit className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
