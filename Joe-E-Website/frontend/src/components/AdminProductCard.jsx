import React, { useState } from 'react'
import { MdEdit, MdCloudUpload, MdDelete, MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import newRequest from '../utils/newRequest.js'; // Assuming you have this configured

const AdminProductCard = ({ data, onUpdate }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [editData, setEditData] = useState({
    productName: data?.productName || '',
    brandName: data?.brandName || '',
    category: data?.category || '',
    productImages: data?.productImages || [],
    description: data?.description || '',
    price: data?.price || '',
    sellingPrice: data?.sellingPrice || '',
  });
  const [uploading, setUploading] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await newRequest.post("/product/uploadProduct", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Should return { url: 'image-url' }
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
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

      // Prepare the data for submission
      const productData = {
        ...editData,
        price: Number(editData.price),
        sellingPrice: Number(editData.sellingPrice) || Number(editData.price)
      };

      // Make the API call to update the product
      const res = await newRequest.put(`/product/updateProduct/${data._id}`, productData);
      
      toast.success('Product updated successfully!');
      setEditProduct(false);
      
      // Call the onUpdate callback if provided
      if (onUpdate) {
        onUpdate(res.data);
      }
      
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
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

      // Create previews
      const newPreviews = await Promise.all(
        validFiles.map(createPreview)
      );
      setPreviewImages(prev => [...prev, ...newPreviews]);

      // Upload images to server
      const uploadResults = await Promise.all(
        validFiles.map(file => uploadImageToServer(file))
      );
      
      setEditData(prev => ({
        ...prev,
        productImages: [...prev.productImages, ...uploadResults.map(res => res.url)]
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
    setEditData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };
  return (
    <div className='bg-white p-4  flex text-center justify-center  rounded shadow-2xl'>
      <div className='p-2'>
         <div className='w-35 h-35 flex  justify-center items-center'>
         <img 
          className='rounded object-fill h-full max-auto' 
          src={data?.productImages?.[0] || '/placeholder.jpg'} 
          width={100} 
          height={100} 
          alt={data?.productName} 
        />
         </div>
        <div className='text-xl text-slate-900 font-bold'>
          <h1>{data?.productName}</h1>
        </div>
        <div>
          <p className='text-xs text-gray-700 line-clamp-4'>{data.category}</p>
        </div>
        <div className='text-sm'>
          <p className='text-ellipse line-clamp-2 text-slate-900'>
            {data?.description}
          </p>
        </div>
        <div>
          <p className='text-xs text-black font-bold mt-3'>ksh {data.price}</p>
        </div>
        <div className='w-fit ml-auto p-2 bg-slate-200 cursor-pointer hover:bg-green-500 hover:text-white rounded-full'>
          <MdEdit onClick={() => setEditProduct(true)} />
        </div>
        
        {editProduct && (
          <div className='fixed inset-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto'>
              <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Edit Product</h2>
                <button 
                  onClick={() => setEditProduct(false)}
                  className='p-1 rounded-full hover:bg-gray-100'
                >
                  <MdClose size={24} />
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
                    name="productName"
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
                    name="brandName"
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
                    name="category"
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
                    name="price"
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
                    name="sellingPrice"
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
                    name="description"
                    value={editData.description}
                    onChange={handleOnChange}
                    rows={3}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={uploading}
                  />
                </div>

                {/* Product Images */}
                <div className="md:col-span-2">
                  <label htmlFor="productImages" className="text-black block py-2">Product Images:</label>
                  <div className="flex flex-col items-center justify-center w-full gap-4">
                    {/* Upload Area */}
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${previewImages.length ? 'border-transparent' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-50 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {editData.productImages.length ? (
                        <div className="flex flex-wrap gap-2 p-2">
                          <MdCloudUpload className="w-8 h-8 text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload more images</p>
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
                    {editData.productImages.length > 0 && (
                      <div className="w-full">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                        <div className="flex flex-wrap gap-4">
                          {editData.productImages.map((imageUrl, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={imageUrl} 
                                alt={`Product ${index}`} 
                                className="h-24 w-24 object-cover border rounded"
                                onError={(e) => {
                                  e.target.src = '/placeholder-error.jpg';
                                  e.target.classList.add('opacity-70');
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                disabled={uploading}
                              >
                                <MdDelete size={14} />
                              </button>
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
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isSubmitting || uploading}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductCard;