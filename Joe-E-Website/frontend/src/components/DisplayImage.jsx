import React from 'react';

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-200 bg-opacity-75  flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Image Popup */}
      <div 
        className="relative bg-white rounded-lg shadow-xl z-10 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 text-lg font-bold border border-gray-200"
        >
          ×
        </button>
        <img 
          src={imageUrl} 
          alt="Preview" 
          className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
        />
        <div className="p-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">Click outside to close</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;