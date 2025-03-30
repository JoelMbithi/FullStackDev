import React, { useEffect, useState } from 'react';
import ProductUploadPopup from '../components/ProductUploadPopup';
import UploadImage from '../helpers/UploadImage';
import newRequest  from '../utils/newRequest.js';
import { toast } from 'react-toastify';
import AdminProductCard from '../components/AdminProductCard.jsx';

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allProduct,setAllProduct] = useState([])
   const [loadingProducts,setLoadingProducts,error] = useState()

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    price: "",
    sellingPrice: "", // Changed to match backend
  });

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await newRequest.get("/product/getProduct");
     
      console.log(res.data); // Log the actual product data

      setAllProduct(res.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(prev => ({
      ...prev,
      [id]: value
    }));
  };

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
    <div className=' sm:flex-row relative min-h-screen px-10 py-8'>
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <button 
          onClick={() => setShowPopup(true)}
          className="text-red-500 border border-red-500 hover:bg-red-50 rounded-full px-4 py-1 text-sm font-medium transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Product'}
        </button>
      </div>


    {/* All Products Display */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
  {allProduct?.data?.map((product, index) => (
    <AdminProductCard data={product} key={index + 1} />
  ))}
</div>

      <ProductUploadPopup 
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        data={data}
        handleOnChange={handleOnChange}
        handleSubmit={handleUploadProduct}
        previewImages={previewImages}
        handleUpload={handleUpload}
        uploading={uploading || isSubmitting}
        removeImage={removeImage}
      />
    </div>
  );
};

export default Products;