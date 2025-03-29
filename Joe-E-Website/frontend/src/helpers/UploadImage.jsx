// UploadImage.jsx
// UploadImage.jsx
const UploadImage = async (image) => {
    const CLOUDINARY_CLOUD_NAME = "dz6pydmk6";
    const UPLOAD_PRESET = "joeCraftfy";
    
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };
  export default UploadImage;