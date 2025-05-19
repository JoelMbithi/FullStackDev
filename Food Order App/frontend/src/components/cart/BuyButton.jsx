import React from 'react';

const BuyButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium"
    >
      Purchase
    </button>
  );
};

export default BuyButton;