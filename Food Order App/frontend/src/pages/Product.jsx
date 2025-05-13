
import React, { useEffect, useState } from 'react'
import { FaChevronRight, FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaShieldAlt, FaTruck, FaExchangeAlt, FaHeadset } from 'react-icons/fa'
import newRequest from '../utils/newRequest'

const Product = () => {
  const [products,setProducts] = useState(null)


  const fetchProduct = async () => {
    try {
      const res = await newRequest.get(`/product/allProduct`)
      setProducts(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  },[])
  // Sample product data
  const product = {
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 15,
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design"
    ],
    specifications: {
      "Brand": "AudioMaster",
      "Model": "WH-2023",
      "Connectivity": "Wireless (Bluetooth 5.0)",
      "Battery Life": "30 hours",
      "Weight": "265g",
      "Color": "Black"
    },
    colors: ["Black", "Silver", "Blue"],
    sizes: ["One Size"]
  }

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

  return (
    <div className="bg-gray-50 mt-20 min-h-screen">
      {/* Navigation Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 text-sm">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
                <a href="#" className="text-gray-700 hover:text-blue-600">Electronics</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
                <span className="text-blue-600">Headphones</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <img 
                src="https://placehold.co/600x600?text=Premium+Wireless+Headphones" 
                alt={product.name} 
                className="w-full rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((img) => (
                <div 
                  key={img} 
                  className="bg-white p-2 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 border border-transparent"
                >
                  <img 
                    src={`https://placehold.co/100x100?text=Image+${img}`} 
                    alt={`${product.name} angle ${img}`} 
                    className="w-full rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl line-through text-gray-500 ml-2">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 text-sm font-semibold ml-2 px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="mt-4">
              {product.inStock ? (
                <span className="text-green-600 font-medium">
                  <i className="fas fa-check-circle mr-1"></i> In Stock ({product.stockCount} available)
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  <i className="fas fa-times-circle mr-1"></i> Out of Stock
                </span>
              )}
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
            
            {/* Features */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Color Selection */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Color</h2>
              <div className="flex space-x-2 mt-2">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${color === 'Black' ? 'bg-gray-900' : color === 'Silver' ? 'bg-gray-300' : 'bg-blue-500'} hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label={color}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Size</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <span className="mr-4 text-gray-900">Quantity:</span>
                <div className="flex border border-gray-300 rounded-md">
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                  <span className="px-4 py-1 border-x border-gray-300">1</span>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md font-medium">
                  Buy Now
                </button>
                <button className="p-3 text-gray-600 hover:text-red-500 border border-gray-300 rounded-md">
                  <FaHeart />
                </button>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaShieldAlt className="text-green-500 mr-2" />
                <span className="text-sm text-gray-600">2-Year Warranty</span>
              </div>
              <div className="flex items-center">
                <FaTruck className="text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <FaExchangeAlt className="text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
              <div className="flex items-center">
                <FaHeadset className="text-orange-500 mr-2" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600">
                Specifications
              </button>
              <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Reviews
              </button>
              <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                FAQs
              </button>
            </nav>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-t border-gray-200">
                <dl>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           
          {products && products.map((product,index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={product.image_url || "https://jasmineandtea.com/wp-content/uploads/2021/07/chicken-teriyaki-recipe.jpg"} 
            
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900"> {product.name}</h3>
              <div className="flex items-center mt-1">
              {renderStars(4)}
                <span className="text-gray-600 text-xs ml-1">(24)</span>
              </div>
              <div className="mt-2">
                <span className="font-bold text-gray-900">${product.price || "159.99"}</span>
                {index % 2 === 0 && (
                  <span className="text-sm line-through text-gray-500 ml-2">$159.99</span>
                )}
              </div>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                Add to Cart
              </button>
            </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product