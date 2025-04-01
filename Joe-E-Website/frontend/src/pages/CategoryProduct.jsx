import React from "react";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const { category } = useParams(); // Get the category from the URL

  return (
    <div>
      <h1>{category}</h1>
    </div>
  );
};

export default CategoryProduct;
