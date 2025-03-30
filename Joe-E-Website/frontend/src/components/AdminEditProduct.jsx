import React, { useState } from 'react'
import { MdCloudUpload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {  MdClose } from "react-icons/md";


const AdminEditProduct = ({data}) => {

   const [previewImages, setPreviewImages] = useState([]);
    const [editData,setEditData] = useState({
      productName: data?.productName,
      brandName: data?.brandName,
      category: data?.category,
      productImages:data?.productImages || [],
      description: data?.description,
      price: data?.price,
      sellingPrice: data?.sellingPrice,
    })
    const [uploading, setUploading] = useState()
      const [editProduct,setEditProduct] = useState(false)
  
      const handleSubmit =()=> {
  
      }
  
      const handleOnChange = (e)=> {
           setEditData(e.target.value)
      }
  
      const handleUploadProduct = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          // Validate required fields
          if (!data.productName || !data.price || !data.description) {
            throw new Error('Product name, price and description are required');
          }
    
          if (data.productImages.length === 0) {
            throw new Error('At least one product image is required');
          }
    
          // Convert price to number
          const productData = {
            ...data,
            price: Number(data.price),
            sellingPrice: Number(data.sellingPrice) || Number(data.price) // Fallback to regular price
          };
    
          const res = await newRequest.post("/product/uploadProduct", productData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          toast.success('Product uploaded successfully!');
          setShowPopup(false);
          resetForm();
          
        } catch (error) {
          console.error('Upload error:', error);
          toast.error(error.response?.data?.message || error.message || 'Failed to upload product');
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
    
        try {
          setUploading(true);
          
          // Validate files
          const validFiles = files.filter(file => 
            file.type.match('image.*') && file.size <= 5 * 1024 * 1024
          );
    
          if (validFiles.length !== files.length) {
            toast.warning('Some files were invalid (must be images under 5MB)');
          }
    
          // Create previews
          const newPreviews = await Promise.all(
            validFiles.map(createPreview)
          );
          setPreviewImages(prev => [...prev, ...newPreviews]);
    
          // Upload images
          const uploadResults = await Promise.all(
            validFiles.map(file => UploadImage(file))
          );
          
          setData(prev => ({
            ...prev,
            productImages: [...prev.productImages, ...uploadResults.map(img => img.secure_url)]
          }));
          
        } catch (error) {
          console.error("Upload failed:", error);
          toast.error("Image upload failed. Please try again.");
        } finally {
          setUploading(false);
        }
      };
    
      const createPreview = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      };
    
      const removeImage = (index) => {
        setData(prev => ({
          ...prev,
          productImages: prev.productImages.filter((_, i) => i !== index)
        }));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
      };
    
      const resetForm = () => {
        setData({
          productName: "",
          brandName: "",
          category: "",
          productImages: [],
          description: "",
          price: "",
          sellingPrice: "",
        });
        setPreviewImages([]);
      };
    
  
  return (
    <div className='fixed bottom-0 right-0 left-0 rounded top-0  bg-white flex text-center align-center  justify-center'>
      {/* Product Name and Brand Name */}
      
        <div className='fixed inset-0 bg-slate-20 bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto'>
            <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center'>
              <h2 className='text-xl font-bold'>Edit Product</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className='p-1 rounded-full hover:bg-gray-100'
              >
                <MdClose onClick={()=>setEditProduct(false)} size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Product Name */}
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={editData.productName}
                  onChange={handleOnChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Brand Name */}
              <div>
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  value={editData.brandName}
                  onChange={handleOnChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={editData.category}
                  onChange={handleOnChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={editData.price}
                  onChange={handleOnChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Selling Price */}
              <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  value={editData.sellingPrice}
                  onChange={handleOnChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={editData.description}
                  onChange={handleOnChange}
                  rows={3}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Product Images */}
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

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditProduct(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={uploading}
                 
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={uploading}
                >
                  {uploading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  )
}

export default AdminEditProduct
