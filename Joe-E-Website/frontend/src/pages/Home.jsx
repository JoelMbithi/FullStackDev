import React from "react";
import CategoryList from "../components/CategoryList.jsx"; // Note uppercase 'C'
import BannerProduct from "../components/Banner.jsx";


const Home = () => {
  return (
    <div className="p-4 text-black"> 
    <BannerProduct/>
     
      <CategoryList /> 
     
    </div>
  );
};

export default Home;