import React from 'react';

const CartPage = () => {
  return (
    <div className="bg-gray-50 mt-20 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-3xl font-bold text-slate-500 mb-6">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col sm:flex-row bg-white rounded justify-between py-4 shadow w-full px-4 gap-4">
          <div className="p-2 flex justify-center sm:block">
            <img
              className="w-32 h-20 object-cover rounded-lg bg-blend-multiply shadow-md"
              src="https://placehold.co/500x400?text=No+Image"
              alt="Cart item"
            />
          </div>

          <div className="py-2 sm:py-6 text-center sm:text-left">
            <h1>Burger</h1>
          </div>

          <div className="py-2 sm:py-6 flex flex-row justify-center sm:justify-start items-center gap-4">
            <button className="text-2xl bg-slate-300 rounded-full h-6 w-6 flex items-center justify-center">-</button>
            <h1>Quantity</h1>
            <button className="text-2xl bg-slate-300 rounded-full h-6 w-6 flex items-center justify-center">+</button>
          </div>

          <div className="py-2 sm:py-6 font-bold text-red-600 text-2xl text-center sm:text-left">
            <h1>$26.00</h1>
          </div>

          <div className="py-2 sm:py-6 text-center sm:text-left">
            <h1>Stock</h1>
          </div>
        </div>

        <div className="bg-white mt-6 flex flex-col sm:flex-row justify-between px-2 py-4 shadow w-full gap-4">
          <div className="font-bold text-2xl px-2 py-2 text-slate-500">
            <h1>Subtotal</h1>
          </div>
          <div className="flex flex-row px-2 py-2 gap-4 items-center justify-center sm:justify-end">
            <p className="rounded-full bg-red-400 p-2 text-xs text-white cursor-pointer">
              Promo Code?
            </p>
            <h1 className="p-2 text-xl text-red-600 font-bold">$345.76</h1>
          </div>
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <button className="bg-black text-white p-2 rounded w-full">
            Back to Shopping
          </button>
          <button className="bg-blue-700 text-white p-2 rounded w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
