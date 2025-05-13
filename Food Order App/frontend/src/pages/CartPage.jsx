import React from 'react'
import { FaTrash, FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'

const CartPage = () => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://placehold.co/150x150?text=Headphones",
      quantity: 1,
      color: "Black",
      inStock: true
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "https://placehold.co/150x150?text=Speaker",
      quantity: 2,
      color: "Blue",
      inStock: true
    },
    {
      id: 3,
      name: "Phone Charging Dock",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://placehold.co/150x150?text=Charger",
      quantity: 1,
      color: "White",
      inStock: false
    }
  ]

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice ? item.originalPrice - item.price : 0) * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08 // Example 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart
          </p>
        </div>

        {/* Cart Content */}
        <div className="lg:flex gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FaShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
                <p className="text-gray-600 mt-2 mb-6">Looks like you haven't added any items yet</p>
                <a 
                  href="/products" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Cart Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 p-4 border-b">
                  <div className="col-span-5 font-medium text-gray-700">Product</div>
                  <div className="col-span-2 font-medium text-gray-700">Price</div>
                  <div className="col-span-3 font-medium text-gray-700">Quantity</div>
                  <div className="col-span-2 font-medium text-gray-700 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b last:border-b-0">
                    <div className="md:grid grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-5 flex items-center mb-4 md:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                          {!item.inStock && (
                            <p className="text-sm text-red-500 mt-1">Out of Stock</p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 mb-4 md:mb-0">
                        <div className="flex flex-col">
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-sm line-through text-gray-500">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-3 mb-4 md:mb-0">
                        <div className="flex items-center">
                          <button 
                            className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <FaChevronLeft className="text-xs" />
                          </button>
                          <span className="px-4 py-2 border-t border-b border-gray-300">
                            {item.quantity}
                          </span>
                          <button 
                            className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <FaChevronRight className="text-xs" />
                          </button>
                        </div>
                      </div>

                      {/* Total & Remove */}
                      <div className="col-span-2 flex justify-between md:justify-end items-center">
                        <span className="font-medium md:mr-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            <div className="mt-6">
              <a 
                href="/products" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaChevronLeft className="mr-2" />
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium mt-6"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">We accept:</p>
                <div className="flex space-x-4">
                  <img src="https://placehold.co/40x25?text=Visa" alt="Visa" className="h-6" />
                  <img src="https://placehold.co/40x25?text=MC" alt="Mastercard" className="h-6" />
                  <img src="https://placehold.co/40x25?text=Amex" alt="American Express" className="h-6" />
                  <img src="https://placehold.co/40x25?text=PayPal" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage