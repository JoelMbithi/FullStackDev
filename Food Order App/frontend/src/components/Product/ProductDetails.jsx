import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const ProductDetails = () => {
  const { product_id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    
    try {
      const res = await newRequest.get(`/product/allProduct/${product_id}`)
      setLoading(true)
      setProduct(res.data.data)
     
    } catch (error) {
      console.error(error)
    } finally {
        setLoading(false)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
    }

    return stars
  }

  useEffect(() => {
    fetchProduct()
  }, [product_id])

  return (
    <div className="container mx-auto mt-20 px-4 py-12">
      {loading ? (
        <div className="flex flex-col md:flex-row gap-10 animate-pulse">
          <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : product ? (
        <div className="flex flex-col md:flex-row gap-12 bg-white shadow-lg rounded-xl p-6 md:p-10">
  {/* Product Image */}
  <div className="md:w-1/2 w-full">
    <img
      src={product.image_url || "https://placehold.co/500x400?text=No+Image"}
      alt={product.name}
      className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
    />
  </div>

  {/* Product Info */}
  <div className="md:w-1/2 w-full flex flex-col justify-center">
    <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

    {/* Rating */}
    <div className="flex items-center mt-3">
      {renderStars(product.rating || 4)}
      <span className="ml-3 text-sm text-gray-600">
        ({product.reviewCount || 0} reviews)
      </span>
    </div>

    {/* Description */}
    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
      {product.description}
    </p>

    {/* Price */}
    <div className="mt-8 text-3xl font-bold text-blue-600">${product.price}</div>

    {/* Call to Action (optional) */}
    <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 w-max">
      Add to Cart
    </button>
  </div>
</div>

      ) : (
        <div className="text-center text-red-500 font-medium">Product not found.</div>
      )}
    </div>
  )
}

export default ProductDetails