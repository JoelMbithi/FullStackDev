import React, { useState } from 'react';
import ProductUploadPopup from '../components/ProductUploadPopup';
import UploadImage from '../helpers/UploadImage';

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // Changed to array
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [], // Changed to array for multiple images
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

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate files
    const validFiles = files.filter(file => 
      file.type.match('image.*') && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      alert('Some files were invalid (must be images under 5MB)');
    }

    try {
      setUploading(true);
      
      // Create previews
      const newPreviews = await Promise.all(
        validFiles.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        })
      );
      setPreviewImages(prev => [...prev, ...newPreviews]);

      // Upload images
      const uploadResults = await Promise.all(
        validFiles.map(file => UploadImage(file))
      );
      
      const newImageUrls = uploadResults.map(result => result.secure_url);
      setData(prev => ({
        ...prev,
        productImages: [...prev.productImages, ...newImageUrls]
      }));
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", data);
    setShowPopup(false);
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImages: [],
      description: "",
      price: "",
      selling: "",
    });
    setPreviewImages([]);
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
      <ProductUploadPopup 
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        data={data}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        previewImages={previewImages}
        handleUpload={handleUpload}
        uploading={uploading}
        removeImage={removeImage}
      />
    </div>
  );
};

export default Products;