import React, { useState } from "react";
import CategoryList from "../components/CategoryList.jsx";
import BannerProduct from "../components/Banner.jsx";
import HorizontalCategoryProduct from "../components/HorizontalCategoryProduct.jsx";
import VerticalCategoryProduct from "../components/VerticalCategoryProduct.jsx";

const Home = () => {
  // Define setCount here
  const [count, setCount] = useState(0);
 console.log("Cart count:", count);
  return (
    <div className="p-0.5">
      <BannerProduct />

      <CategoryList />

      {/* Description Section */}
      <div className="max-w-4xl mx-auto mt-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Discover Amazing <span className="text-[#FF6016] ">JoeCartify</span>{" "}
          Products
        </h2>
        <p className="text-gray-600">
          Your one-stop shop for quality and style -{" "}
          <span className="text-xl font-semibold animate-pulse">
            JoeCartify offers{" "}
          </span>
          carefully selected fashion, home essentials, and lifestyle products at{" "}
          <span className="text-[#FF6016] font-medium animate-pulse text-xl">
            {" "}
            unbeatable{" "}
          </span>{" "}
          prices. Happy shopping with{" "}
          <span className="text-[#FF6016] font-medium">JoeCartify</span>!
        </p>
      </div>

      {/* Featured Products Section */}
      <HorizontalCategoryProduct 
        category={"airpods"} 
        header={"Top AirPods"} 
        setCount={setCount} // Pass setCount here
      />
      
      <HorizontalCategoryProduct 
        category={"smart-watch"} 
        header={"Smart Watches"} 
        setCount={setCount} // Pass setCount here
      />

      <VerticalCategoryProduct 
        category={"mobile-phone"} 
        header={"Latest Smartphones"} 
      />
      <VerticalCategoryProduct 
        category={"television"} 
        header={"Premium TVs"} 
      />
      <VerticalCategoryProduct 
        category={"camera"} 
        header={"Professional Cameras"} 
      />
      <VerticalCategoryProduct 
        category={"Mouse"} 
        header={"Professional Mouse"} 
      />
      <VerticalCategoryProduct 
        category={"Refrigerator"} 
        header={"Best Refrigerators"} 
      />
      <VerticalCategoryProduct 
        category={"Trimmer"} 
        header={"Best Trimmers"} 
      />
      <VerticalCategoryProduct 
        category={"Earphone"} 
        header={"Best Earphone"} 
      />
      
      <section className="my-8">{/* Product cards would go here */}</section>

      {/* Special Offers Section */}
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Today's Special Offers</h2>
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
          <p>
            Don't miss our exclusive daily deals! Limited time offers available.
          </p>
        </div>
        
      </section>
    </div>
  );
};

export default Home;
