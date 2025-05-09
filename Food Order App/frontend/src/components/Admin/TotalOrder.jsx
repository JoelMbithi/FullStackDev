  import React, { useEffect, useState } from 'react';
  import { FiSearch, FiFilter, FiPrinter, FiEye, FiEdit, FiX } from 'react-icons/fi';
  import newRequest from '../../utils/newRequest';

  const OrdersPage = ({onClose    }) => {
    const [order,setOrder] = useState([])
  

    const fetchOrder = async () => {
      try {
        const res = await newRequest.get("/order/orders")
        console.log(res.data.data)
        setOrder(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchOrder()
    },[])

    // State for filters and modal
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter orders
    /* const filteredOrders = orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'All' || order.status === statusFilter;
      
      const matchesDate = 
        !dateFilter || order.date.startsWith(dateFilter);
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  */
    // Change order status
    // Update order status
const updateStatus = (orderId, newStatus) => {
  setOrder((prevOrders) => prevOrders.map((order) => 
    order.id === orderId ? { ...order, status: newStatus } : order
  ));
};

// Cancel order
const cancelOrder = (orderId) => {
  setOrder((prevOrders) => prevOrders.map((order) => 
    order.id === orderId ? { ...order, status: 'Cancelled' } : order
  ));
};


const filteredOrders = (order || []).filter((ord) => {
  const orderIdStr = ord?.order_id ? String(ord.order_id).toLowerCase() : '';
  const nameStr = ord?.name ? String(ord.name).toLowerCase() : '';

  const matchesSearch =
    orderIdStr.includes(searchTerm.toLowerCase()) ||
    nameStr.includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All' || ord.status === statusFilter;

  const matchesDate =
    !dateFilter || (ord.order_date && ord.order_date.startsWith(dateFilter));

  return matchesSearch && matchesStatus && matchesDate;
});
  

    

    return (
      <div className="fixed inset-0 index-10 bg-white mx-auto px-4 py-8">
      
        <div className='flex flex-row justify-between'>
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <p className='bg-red-500 p-2 rounded w-20 h-10 hover:bg-red-600 text-white  cursor-pointer' onClick={onClose}>Cancel</p>
      </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer"
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <FiFilter className="absolute left-3 top-3 text-gray-400" />
                <select
  className="pl-10 pr-4 py-2 border rounded-lg"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All">All Statuses</option>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

              </div>
              
              <input
                type="date"
                className="px-4 py-2 border rounded-lg"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order,index) => (
                <tr key={order.order_id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{' '}
  {new Date(order.order_date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button 
                        onClick={() => cancelOrder(order.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiX className="inline mr-1" /> Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold mb-4">Order Details - {selectedOrder.id}</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p>{selectedOrder.name}</p>
                    <p className="text-gray-600">{selectedOrder.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Order Information</h3>
                    <p><span className="font-medium">Date:</span> {' '}
  {new Date(selectedOrder.order_date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Payment:</span> {selectedOrder.amount}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="border rounded-lg">
                    <div className="p-3 bg-gray-50 border-b">
                      <div className="font-medium">{selectedOrder.product || "Items Ordered"}</div>
                    </div>
                    <div className="p-3">
                    {selectedOrder.items && selectedOrder.items.split(', ').map((item, index) => (
                        <div key={index} className="py-1">{item}</div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t font-bold">
                      Total: {selectedOrder.amount}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Special Instructions</h3>
                  <p className="text-gray-600">{selectedOrder.notes || 'None'}</p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                    <FiPrinter className="inline mr-2" /> Print Invoice
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default OrdersPage;