import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './components/Products';
import BuyProduct from './components/BuyProduct';

const App = () => {
  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ margin: '10px' }}>Home</Link>
        <Link to="/about" style={{ margin: '10px' }}>About</Link>
        <Link to="/contact" style={{ margin: '10px' }}>Contact</Link>
        <Link to="/products" style={{ margin: '10px' }}>Products</Link>
        <Link to="/signup" style={{ margin: '10px' }}>Signup</Link>
        <Link to="/login" style={{ margin: '10px' }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/buy/:productId" element={<BuyProduct />} />
      </Routes>
    </div>
  );
};

export default App;
