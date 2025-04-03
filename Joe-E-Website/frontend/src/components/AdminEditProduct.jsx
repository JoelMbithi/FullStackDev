import React, { useState } from 'react';
import { MdCloudUpload, MdDelete, MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import newRequest from "../utils/newRequest";

const AdminEditProduct = ({ data, setShowEditModal, refreshProducts }) => {
  const [editData, setEditData] = useState({
    productName: data?.productName || '',
    brandName: data?.brandName || '',
    category: data?.category || '',
    productImages: data?.productImages || [],
    description: data?.description || '',
    price: data?.price || '',
    sellingPrice: data?.sellingPrice || data?.selling || '',
  });
  
  const [previewImages, setPreviewImages] = useState(data?.productImages || []);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!editData.productName || !editData.price || !editData.description) {
        throw new Error('Product name, price and description are required');
      }
  
      if (editData.productImages.length === 0) {
        throw new Error('At least one product image is required');
      }
  
      // Prepare the data for submission with correct field names
      const productData = {
        productName: editData.productName,
        brandName: editData.brandName,
        category: editData.category,
        productImages: editData.productImages,
        description: editData.description,
        price: Number(editData.price),
        selling: Number(editData.sellingPrice) || Number(editData.price), // Using 'selling' instead of 'sellingPrice'
        _id: data._id
      };
  
      // Make the API call to update the product
      const res = await newRequest.put(`/product/update/${data._id}`, productData);
      
      toast.success('Product updated successfully!');
      setShowEditModal(false);
      refreshProducts();
      
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to update product');
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
        file.type.match('image.*') && file.size <= 5 * 1024 * 1024 // 5MB limit
      );

      if (validFiles.length !== files.length) {
        toast.warning('Some files were invalid (must be images under 5MB)');
      }

      // Upload images to cloud storage
      const formData = new FormData();
      validFiles.forEach(file => formData.append('images', file));
      
      const uploadRes = await newRequest.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update state with new images
      setEditData(prev => ({
        ...prev,
        productImages: [...prev.productImages, ...uploadRes.data.urls]
      }));
      
      // Create previews for UI
      const newPreviews = await Promise.all(
        validFiles.map(file => URL.createObjectURL(file))
      );
      setPreviewImages(prev => [...prev, ...newPreviews]);
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setEditData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto'>
        <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Edit Product</h2>
          <button 
            onClick={() => setShowEditModal(false)}
            className='p-1 rounded-full hover:bg-gray-100'
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Form fields (same as before) */}
          {/* ... */}

          {/* Product Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="flex flex-col gap-4">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdCloudUpload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    {previewImages.length ? 'Add more images' : 'Click to upload or drag and drop'}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={handleUpload}
                  accept="image/*"
                  multiple
                  disabled={uploading}
                />
              </label>

              {/* Image Previews */}
              <div className="flex flex-wrap gap-2">
                {editData.productImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Product preview ${index}`}
                      className="h-24 w-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <MdDelete size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isSubmitting || uploading}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;