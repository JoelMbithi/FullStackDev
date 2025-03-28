import React, { useState } from 'react';
import productCategory from "../helpers/PRoductCategory.jsx";
import { MdCloudUpload } from "react-icons/md";

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // Added state for previewImage
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    selling: "",
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", data);
    setShowPopup(false);
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImage: "",
      description: "",
      price: "",
      selling: "",
    });
    setPreviewImage(null); // Reset preview image after form submission
  };

  return (
    <div className='relative min-h-screen px-10 py-8'>
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <button 
          onClick={() => setShowPopup(true)}
          className="text-red-500 border border-red-500 hover:bg-red-50 rounded-full px-4 py-1 text-sm font-medium transition-colors"
        >
          Upload Product
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(203,213,225,0.1)]">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-4">Product Upload</h2>
              
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="productName" className="text-black block py-2">Product Name:</label>
                    <input 
                      onChange={handleOnChange}
                      type="text" 
                      id="productName"
                      value={data.productName}
                      placeholder="Product Name" 
                      className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brandName" className="text-black block py-2">Brand Name:</label>
                    <input 
                      onChange={handleOnChange}
                      type="text" 
                      id="brandName"
                      value={data.brandName}
                      placeholder="Brand Name" 
                      className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="text-black block py-2">Category:</label>
                  <select
                    onChange={handleOnChange}
                    id="category"
                    value={data.category}
                    className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {productCategory.map((product) => (
                      <option value={product.value} key={product.id}>
                        {product.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="text-black block py-2">Price:</label>
                  <input 
                    onChange={handleOnChange}
                    type="number" 
                    id="price"
                    value={data.price}
                    placeholder="Price" 
                    className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="productImage" className="text-black block py-2">Product Image:</label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${previewImage ? 'border-transparent' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-50`}>
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <MdCloudUpload className="w-8 h-8 text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        </div>
                      )}
                      <input 
                        id="productImage"
                        type="file" 
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="text-black block py-2">Description:</label>
                  <textarea
                    onChange={handleOnChange}
                    id="description"
                    value={data.description}
                    placeholder="Product description" 
                    className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="selling" className="text-black block py-2">Selling Points:</label>
                  <input 
                    onChange={handleOnChange}
                    type="text" 
                    id="selling"
                    value={data.selling}
                    placeholder="Key selling points" 
                    className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowPopup(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
