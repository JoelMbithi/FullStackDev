import React, { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const Users = () => {
  const [getAllUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await newRequest.get("/user/getUsers");
      if (res.data.users && res.data.users.length > 0) {
        setAllUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-8">
      <table className="w-full border-collapse border border-gray-300 userTable">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400">No.</th>
            <th className="border border-gray-400">Name</th>
            <th className="border border-gray-400">Email</th>
            <th className="border border-gray-400">Role</th>
            <th className="border border-gray-400">Created Date</th>
            <th className="border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {getAllUsers.length > 0 ? (
            getAllUsers.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-300">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="bg-slate-200 cursor-pointer hover:bg-green-500 rounded-full py-1 px-1"
                    onClick={() => setSelectedUser(user)}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditional rendering of ChangeUserRole */}
      {selectedUser && (
        <ChangeUserRole
          userId={selectedUser._id}
          userRole={selectedUser.role}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Users;
