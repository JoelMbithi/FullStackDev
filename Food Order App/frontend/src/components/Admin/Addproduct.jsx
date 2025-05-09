import React, { useState } from 'react';

const AddProductForm = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to save the product details (POST request)
    console.log({ productName, price, category, description });
    onClose();  // Close the form after submission
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className='flex flex-row justify-between'>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <p onClick={onClose  } className='cursor-pointer bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center'>X</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Price (KES)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-between items-center">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
