
import React, { useState } from 'react';
import { FiSettings, FiUser, FiLock, FiBell, FiMoon, FiSun } from 'react-icons/fi';

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [currentTab, setCurrentTab] = useState('account');

  const settingsTabs = [
    { id: 'account', icon: <FiUser />, label: 'Account' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'appearance', icon: darkMode ? <FiSun /> : <FiMoon />, label: 'Appearance' }
  ];

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-red-500'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          {/* Settings Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <FiSettings className="text-2xl" />
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account preferences and settings
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Settings Sidebar */}
            <div className={`w-full md:w-64 p-4 border-b md:border-b-0 md:border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <nav className="space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center w-full px-4 py-2 rounded-lg transition ${currentTab === tab.id 
                      ? darkMode 
                        ? 'bg-red-600 text-white' 
                        : 'bg-red-100 text-red-600'
                      : darkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-6">
              {currentTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                      <input
                        type="text"
                        defaultValue="user123"
                        className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {currentTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Security</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                        />
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {currentTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Receive updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={() => setNotifications(!notifications)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Switch between light and dark theme
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;