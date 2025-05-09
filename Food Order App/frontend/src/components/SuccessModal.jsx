// components/SuccessModal.jsx
import React from 'react';

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-slate-300 shadow p-6 rounded-lg max-w-sm w-full mx-4">
        <div className="text-center">
          <svg 
            className="mx-auto h-12 w-12 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mt-3">Success!</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={onClose}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;