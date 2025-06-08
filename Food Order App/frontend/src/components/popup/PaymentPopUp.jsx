import React, { useState } from 'react';
import BuyButton from '../cart/BuyButton';
import newRequest from '../../utils/newRequest'

const PaymentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData,setFormData] = useState(
   {
    name:'',
    location: '',
  station: '',
  amount: '',
  userId: '',
  status: '',
  phoneNumber: '',
   }
  )

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, location, station, phoneNumber, product, amount, user_id, status } = formData;

  if (!name || !location || !station || !phoneNumber || !product || !amount || !user_id) {
    alert('Please fill in all required fields.');
    return;
  }

  setIsProcessing(true);

  try {
    const res = await newRequest.post('/order/create', formData);
    console.log(res.data.data);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment successful! Thank you.`);
      setIsOpen(false);
    }, 2000);
  } catch (error) {
    console.log(error);
    alert('Failed to create order. Check console for details.');
    setIsProcessing(false);
  }
};


  return (
    <div>
      <BuyButton onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Complete Payment</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange ={handleChange  }
                   placeholder="Joe"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your location</label>
                <input
                  type="text"
                  name='location'
                 value={formData.location}
                  onChange={handleChange}
                  placeholder="Nairobi"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Pick Up Station</label>
                <input
                  type="text"
                  name='station'
                  value={formData.station}
                  onChange={handleChange}
                  placeholder="Please enter your pick Up Station"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="0743861565"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPopup;
