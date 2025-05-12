import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './components/Products';
import BuyProduct from './components/BuyProduct';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';




const App = () => {
  return (
    <div style={{ minWidth: '100vw', minHeight: '100vh' }}>
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/buy/:productId" element={<BuyProduct />} />
          <Route path="/add-product" element={<AddProduct />} />

          
        </Routes>
      </main>
      <Footer />
    </div>
    </div>
  );
};

export default App;