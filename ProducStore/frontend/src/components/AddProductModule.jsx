import React, { useState } from 'react';
import { useProductStore } from '../Store/useProductStore';

const AddProductModule = () => {
  const { addProduct, resetForm, formData, setFormData } = useProductStore();
  
  // Local state to manage the form fields
  const [product, setProduct] = useState({
    name: formData.name || '',
    image: formData.image || '',
    price: formData.price || '',
  });

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send product data to addProduct function
    addProduct(product);
    // Reset the form in the component and store
    resetForm();
    setProduct({ name: '', image: '', price: '' }); // Clear local state after submission
  };

  // Close the dialog when clicking the X button
  const closeDialog = () => {
    document.getElementById('addProductModule').close();
  };

  return (
    <dialog id='addProductModule' className='flex bg-slate-900 flex-col items-center ml-[35%] justify-center p-4'>
      <form method="dialog" className="absolute right-2 top-2">
        <button type="button" 
                className='btn btn-sm btn-ghost' 
                onClick={closeDialog} 
                aria-label="Close Modal">
          X
        </button>
      </form>

      <div>
        <h3 className='font-bold text-xl mb-8'>Add New Product</h3>
      </div>

      <form onSubmit={handleSubmit} aria-live="polite">
        <div className='flex flex-col p-2 m-2 gap-2'>
          <label htmlFor="name" className='text-xl font-bold'>Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className='bg-slate-200 rounded p-2'
            value={product.name}
            onChange={handleChange}
            required
            aria-label="Enter product name"
          />
        </div>

        <div className='flex flex-col p-2 m-2 gap-2'>
          <label htmlFor="image" className='text-xl font-bold'>Image URL:</label>
          <input
            type="url"
            id="image"
            className='bg-slate-200 rounded h-30 p-2'
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            aria-label="Enter image URL"
          />
        </div>

        <div className='flex flex-col p-2 m-2 gap-2'>
          <label htmlFor="price" className='text-xl font-bold'>Price ($):</label>
          <input
            type="number"
            className='bg-slate-200 rounded p-2'
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            aria-label="Enter product price"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4" aria-label="Submit product">Add Product</button>
      </form>
    </dialog>
  );
};

export default AddProductModule;
