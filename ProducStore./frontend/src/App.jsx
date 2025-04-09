import React, { useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Product from './Pages/Product.jsx';
import Home from './Pages/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import { useThemeStore } from './Store/useStoreTheme.jsx';

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-all duration-300">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product />} />
      </Routes>
    </div>
  );
};

export default App;
