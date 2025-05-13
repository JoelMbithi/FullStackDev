import React, { useEffect, useState } from 'react';
import AddProductForm from '../components/Admin/Addproduct';
import TotalUsers from '../components/Admin/TotalUsers';
import TotalOrder from '../components/Admin/TotalOrder'
import RevenuePage from '../components/Admin/Revenue';
import newRequest from "../utils/newRequest"

const AdminDashboard = () => {
  const [popUp, setPopUp] = useState(false);
  const [TotalUser,setTotalUser] = useState(false)
  const [userCount,setUserCount] = useState(null)
  const [totalOrder,setTotalOrder]  = useState(false)
  const [revenue,setRevenue] = useState(false)

  const[order,setOrder] = useState(null)
  const [orderCount, setOrderCount] = useState(null);


  const handleClose = () => {
    setPopUp(false);
    setTotalOrder(false)
    setTotalUser(false)
    setRevenue(false)
  };

  const fetchUser = async () => {
    try {
      const res = await newRequest.get(`/user/allClient`)
      /* console.log(res.data.data) */
      setUserCount(res.data.data.length)
    } catch (error) {
      console.log(error)
    }
  }
 // 1. Fetch all orders
 const fetchAllOrders = async () => {
  try {
    const res = await newRequest.get("/order/orders"); // if getOrder returns all orders
    /* console.log(res.data.data) */
    setOrder(res.data.data)
  
      setOrderCount(res.data.data.length);
     
   /*  if (order.length > 0) {
      const latestOrderId = order[0].order_id; // Or change to .at(-1) to get last
       setOrderId(latestOrderId); 
    } */ 
  } catch (error) {
    console.log("Failed to fetch orders list", error);
  }
};

// 2. Fetch specific order by ID
/* const fetchOrder = async (id) => {
  try {
    const res = await newRequest.get(`/order/orders/${id}`);
    setOrder(res.data.data);
    console.log("Fetched order:", res.data.data);
  } catch (error) {
    console.log("Failed to fetch order by ID", error);
  }
}; */

useEffect(() => {
  fetchAllOrders();
  fetchUser()
}, []);

/* useEffect(() => {
  if (orderId) {
    fetchOrder(orderId);
  }
}, [orderId]); */



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Admin</span>
          <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Summary Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Total Orders */}
          <button
           onClick={()=> setTotalOrder(true)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          >
          
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-xl font-semibold">{orderCount || "1243"}</p>

          </button>
          
          {totalOrder && (
            <TotalOrder
            onClose={handleClose}
            />          )}



          {/* User Display   */}
          <button
           onClick={() => setTotalUser(true)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <h3 className="text-sm text-gray-500">Active Users</h3>
            <p className="text-xl font-semibold">{userCount || "321"}</p>
          </button>
          {
              TotalUser && (
                <TotalUsers
                onClose={handleClose}
                />
              )
            }


            {/* Revenue  */}
          <button
             onClick={()=> setRevenue(true)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <h3 className="text-sm text-gray-500">Revenue Today</h3>
            <p className="text-xl font-semibold">KES 12,400</p>
          </button>
          {revenue && (
            <RevenuePage
             onClose={handleClose}
            />
          )}
          <button
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <h3 className="text-sm text-gray-500">Pending Deliveries</h3>
            <p className="text-xl font-semibold">17</p>
          </button>
        </div>

        {/* Add Product Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Management</h2>
            <button
              onClick={() => setPopUp(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Product
            </button>
          </div>
          <p className="text-sm text-gray-600">You can manage products and featured menu items here.</p>

          {popUp && (
            <div className='fixed top-10 inset-0 z-50 flex justify-center items-center'>
              <div className='bg-white shadow p-4 rounded-lg'>
                <AddProductForm setPopUp={setPopUp} onClose={handleClose} />
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white shadow-md rounded-lg m-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <button
              onClick={() => alert("Navigate to 'Add Order' form or modal")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + New Order
            </button>
          </div>

          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase border-b">
              <tr>
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {order && order.map((orders,index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{orders.order_id}</td>
                  <td className="py-2 px-4">{orders.name}</td>
                  <td className="py-2 px-4">{orders.product}</td>
                  <td className="py-2 px-4">{orders.amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        orders.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        orders.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800'
                      }`}
                    >
                      {orders.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
