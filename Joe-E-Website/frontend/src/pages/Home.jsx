import React, { useState } from "react";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} style={{ height: "100vh", padding: "20px" }}>
      <h3 className="font-medium">Dark Mode</h3>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Switch between light and dark theme
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default Home;
