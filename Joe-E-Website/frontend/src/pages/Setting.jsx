import React, { useState, useEffect } from 'react';
import { HiUserCircle, HiOutlinePencilAlt } from 'react-icons/hi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = () => {
      const userData = JSON.parse(localStorage.getItem('User')) || {
        username: 'JohnDoe',
        email: 'john@example.com',
        profilePic: null,
        bio: 'Frontend developer and design enthusiast'
      };
      setUser(userData);
      setFormData({
        username: userData.username,
        email: userData.email,
        bio: userData.bio || ''
      });
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you would update the user data via API
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('User', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-red-700 p-6 text-center">
          <div className="relative inline-block">
            {user?.profilePic ? (
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <HiUserCircle className="w-32 h-32 text-white" />
            )}
            <button 
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
              onClick={() => document.getElementById('profilePicInput').click()}
            >
              <HiOutlinePencilAlt className="text-red-600" />
              <input type="file" id="profilePicInput" className="hidden" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">
            {user?.username || 'User'}
          </h1>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">About</h2>
                <p className="text-gray-600 mt-2">{user?.bio || 'No bio yet'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
                <p className="text-gray-600 mt-2">{user?.email}</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-6 px-4 py-2 bg-[#FF6016] text-white rounded flex items-center space-x-2"
              >
                <HiOutlinePencilAlt />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;