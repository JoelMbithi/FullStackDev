import React, { useState } from 'react';
import { MdCloudUpload } from "react-icons/md";
import productCategory from "../helpers/productCategory.jsx";
import DisplayImage from '../components/DisplayImage.jsx';
import { MdDelete } from "react-icons/md";



const ProductUploadPopup = ({ 
    
  showPopup, 
  setShowPopup, 
  data, 
  handleOnChange, 
  handleSubmit, 
  previewImages,  // Changed from previewImage to previewImages
  handleUpload,
  uploading,
  removeImage ,
  handleUploadProduct   // Added removeImage prop
}) => {

    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")


  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 top-18 ml-30 flex items-center justify-center z-[100] bg-[rgba(248,75,248,0.1)]">
     <div className="bg-white rounded-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto ">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Product Upload</h2>
          
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Product Name and Brand Name */}
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
                  disabled={uploading}
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
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="text-black block py-2">Category:</label>
              <select
                onChange={handleOnChange}
                id="category"
                value={data.category}
                className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={uploading}
              >
                <option value="">Select a category</option>
                {productCategory.map((product) => (
                  <option value={product.value} key={product.id}>
                    {product.label}
                  </option>
                ))}
              </select>
            </div>

            

            {/* Image Upload */}
            <div>
              <label htmlFor="productImages" className="text-black block py-2">Product Images:</label>
              <div className="flex flex-col items-center justify-center w-full gap-4">
                {/* Upload Area */}
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${previewImages.length ? 'border-transparent' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-50 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {previewImages.length ? (
                    <div className="flex flex-wrap gap-2 p-2">
                     <MdCloudUpload className="w-8 h-8 text-gray-500 mb-2" />
                     <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <MdCloudUpload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      
                    </div>
                  )}
                  <input 
                    id="productImages"
                    type="file" 
                    className="hidden"
                    onChange={handleUpload}
                    accept="image/*"
                    multiple
                    disabled={uploading}
                  />
                </label>

                {/* Upload Status */}
                {uploading && (
                  <div className="text-blue-500">Uploading images, please wait...</div>
                )}

                {/* Uploaded Images Display */}
                {data.productImages.length > 0 && (
  <div className="w-full">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
    <div className="flex flex-wrap gap-4">
      {data.productImages.map((imageUrl, index) => (
        <div key={index} className="relative group">
          <img 
            src={imageUrl} 
            alt={`Product ${index}`} 
            className="h-24 w-24 object-cover border rounded cursor-pointer"
            onClick={() => {
              setOpenFullScreenImage(true);
              setFullScreenImage(imageUrl);
            }}
            onError={(e) => {
              e.target.src = '/placeholder-error.jpg';
              e.target.classList.add('opacity-70');
            }}
          />
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the image click
              removeImage(index);
            }}
            className="absolute bottom-3 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={uploading}
          >
            <MdDelete />

          </button>
          <div className="text-xs text-gray-500 truncate w-24 mt-1">
            {imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('/') + 16)}...
          </div>
        </div>
      ))}
    </div>
  </div>
)}
              </div>
            </div>
{/* Price */}
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
                disabled={uploading}
              />
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className="text-black block py-2">Description:</label>
              <textarea
                onChange={handleOnChange}
                id="description"
                value={data.description}
                placeholder="Product description" 
                className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                required
                disabled={uploading}
              />
            </div>
            
            {/* Selling Points */}
            <div>
              <label htmlFor="selling" className="text-black block py-2">Selling Points:</label>
              <input 
                onChange={handleOnChange}
                type="text" 
                id="selling"
                value={data.selling}
                placeholder="Key selling points" 
                className="w-full bg-slate-100 p-2 px-3 rounded text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              />
            </div>
            
            {/* Form Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                onClick={handleUploadProduct}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <MdCloudUpload className="text-lg" />
                    Upload Product
                  </>
                )}
              </button>
            </div>
          </form>
         
        </div>
      </div>

       
       {/*  dispaly Image fullscreen*/}
       {openFullScreenImage && (
            <DisplayImage 
              onClose={() => setOpenFullScreenImage(false)} 
              imageUrl={fullScreenImage}
            />
          )}

      

    </div>
  );
};

export default ProductUploadPopup;