import React, { useState } from 'react';
import newRequest from '../../utils/newRequest';

const AddProductForm = ({ onClose, setPopUp }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", price);
      formData.append("cartegory", category); // keep backend spelling
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile); // match req.file
      }

      const res = await newRequest.post(`/product/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        alert("Product registered successfully");
        setProduct(prev => [...prev, res.data.data]);
        setPopUp(false);
        setProductName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImageFile(null);
      }

    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.response?.data?.message || 'Failed to register product');
    } finally {
      setLoading(false);
    }f  
  };
  const handleImageUpload = async (file) => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'Build Estate');

    try {
      setUploading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dz6pydmk6/image/upload',
        form
      );
      setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96" encType="multipart/form-data">
        <div className='flex flex-row justify-between items-center mb-4'>
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <p onClick={onClose} className='cursor-pointer bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center'>X</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Price (KES)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-between items-center">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
