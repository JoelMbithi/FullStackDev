import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaShieldAlt, FaTruck, FaExchangeAlt, FaHeadset } from 'react-icons/fa';
import newRequest from '../utils/newRequest';
import { Link, useParams } from 'react-router-dom';
import AddToCart from '../components/cart/AddToCartButton';
import BuyButton from '../components/cart/BuyButton';
import PaymentPopup from '../components/popup/PaymentPopUp';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartegory, setCartegory] = useState("All");
  const { categoryName } = useParams(); 
  const {product_id} = useParams()

  const [availableCategories, setAvailableCategories] = useState([]);
  const user_id = localStorage.getItem("user_id");

  const fetchProduct = async () => {
    try {
      const res = await newRequest.get(`/product/allProduct`);
      console.log(res.data.data);
      setProducts(res.data.data);
  
     

      // Set categories
      const uniqueCategories = ["All", ...new Set(res.data.data.map(p => p.cartegory))];
      setAvailableCategories(uniqueCategories);
  
      // Filter by cartegory from URL
      if (categoryName) {
        const filtered = res.data.data.filter(product =>
          product.cartegory.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
        setCartegory(categoryName);
      } else {
        setFilteredProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, [categoryName]); // Add categoryName to dependency array

  // Update filtered products when cartegory changes
  useEffect(() => {
    if (cartegory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.cartegory.toLowerCase() === cartegory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [cartegory, products]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  }

  // Handle breadcrumb click
  const handleCategoryClick = (cat) => {
    setCartegory(cat);
  };

  return (
    <div className="bg-gray-50 mt-20 min-h-screen">
      {/* Navigation Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 text-sm">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button 
                onClick={() => handleCategoryClick("All")} 
                className="text-gray-700 hover:text-blue-600"
              >
                Home
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
                <button 
                  onClick={() => handleCategoryClick("Electronics")} 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Electronics
                </button>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
                <button 
                  onClick={() => handleCategoryClick("Headphones")} 
                  className="text-blue-600"
                >
                  Headphones
                </button>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Category Filter Buttons */}
<div className="flex flex-wrap gap-3 justify-center mb-6">
  {availableCategories.map((cat, index) => (
    <button
      key={index}
      onClick={() => handleCategoryClick(cat)}
      className={`px-4 py-2 rounded-full text-sm font-medium border 
        ${cartegory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-300"} 
        hover:bg-blue-500 hover:text-white transition`}
    >
      {cat}
    </button>
  ))}
</div>

        {/* Display filtered products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
           
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product.product_id}`}>
            <img 
              src={product.image_url || "https://placehold.co/400x300?text=No+Image"} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
           </Link>
            <div className="p-4">
               
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center mt-1">
                {renderStars(product.rating || 4)}
                <span className="text-gray-600 text-xs ml-1">({product.reviewCount || 0})</span>
              </div>
              <div className="mt-2">
                <span className="font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-gray-500 ml-2">${product.originalPrice}</span>
                )}
              </div>
              
              <div className='flex flex-row gap-4 ' >
              <AddToCart userId={user_id}  productId={product.product_id} />
              <PaymentPopup />


              </div>
            </div>
          </div>
         
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;