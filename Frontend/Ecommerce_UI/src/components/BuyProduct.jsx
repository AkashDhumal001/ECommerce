import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/BuyProduct.css';

const BuyProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setError('Product ID not found.');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to buy products.');
        return;
      }

      await api.post(
        '/buy',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Order placed successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
      setMessage('');
    }
  };

  if (loading) return <div className="buy-container"><p>Loading product details...</p></div>;

  if (error) return <div className="buy-container error"><p>{error}</p></div>;

  if (!product) return <div className="buy-container"><p>Product not found.</p></div>;

  return (
    <div className="buy-container">
      <div className="buy-card">
        <div className="buy-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>
        <div className="buy-details">
          <h2>{product.name}</h2>
          <p className="price">₹{parseFloat(product.price).toFixed(2)}</p>
          <p>{product.description || 'No description available.'}</p>

          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button onClick={handleBuy} className="buy-now-btn">Buy Now</button>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
