import React, { useEffect, useState } from 'react';
import newRequest from '../../utils/newRequest';


const UsersPage = ({onClose}) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUser = async () => {
    try {
     const res = await newRequest.get(`/user/allClient`)
     /*  console.log(res.data.data) */
      setUsers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])
  const filteredUsers = users.filter(
    user =>
      (filterRole === 'All' || user.role === filterRole) &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 fixed inset-0 index-10  bg-gray-100 min-h-screen">
     
      <div className='flex flex-row justify-between'>
      <h1 className="text-2xl font-bold mb-4 text-green-700">User Management</h1>
     <p className='bg-red-500 p-2 rounded w-20 h-10 hover:bg-red-600 text-white cursor-pointer' onClick={onClose}>Cancel</p>
     </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
          <option value="Restaurant Owner">Restaurant Owner</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Registered</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user,index) => (
              <tr key={user.id || index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.user_id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{' '}
  {new Date(user.created_at).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}</td>
                <td className="px-4 py-2"> {user.phone}
                 {/*  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status}
                  </span> */}
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    View
                  </button>
                  <button className="text-yellow-600 hover:underline text-xs">
                    {user.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                  <button className="text-purple-600 hover:underline text-xs">
                    Promote
                  </button>
                  <button className="text-red-600 hover:underline text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">{selectedUser.name}'s Profile</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Registered:</strong> {' '}
  {new Date(selectedUser.created_at).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}</p>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Order History</h3>
              <p className="text-xs text-gray-500">Order history feature coming soon...</p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Activity Logs</h3>
              <p className="text-xs text-gray-500">Activity logs feature coming soon...</p>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
