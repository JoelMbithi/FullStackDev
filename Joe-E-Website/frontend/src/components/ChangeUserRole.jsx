import React, { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";

const ChangeUserRole = ({ userId, userRole, onClose }) => {
  const [roles, setRoles] = useState([]);
  const [updatedRole, setUpdatedRole] = useState(userRole || "");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await newRequest.get("/user/roles");
        if (res.data.roles && res.data.roles.length > 0) {
          setRoles(res.data.roles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRole();
  }, []);

  const handleChangeRole = (e) => {
    setUpdatedRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    if (!updatedRole) {
      toast.error("Please select a role before saving.");
      return;
    }
  
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }
  
    try {
      const res = await newRequest.put("/user/updateRole", {
        userId,
        newRole: updatedRole,
      });
      toast.success("Role updated successfully!");
      
      // Update localStorage if the updated user is the current user
      const currentUser = JSON.parse(localStorage.getItem("User")) || {};
      if (currentUser._id === userId) {
        const updatedUser = { ...currentUser, role: updatedRole };
        localStorage.setItem("User", JSON.stringify(updatedUser));
      }
      
      onClose(); 
      setTimeout(() => {
        window.location.reload(); // Restart window after 500ms
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
        <h2 className="text-lg font-bold">Change User Role</h2>
        <p className="text-gray-600">Modify the user’s role below.</p>

        {/* Dropdown for Role Selection */}
        <select
          value={updatedRole}
          onChange={handleChangeRole}
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateRole}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
