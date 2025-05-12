import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products', {
        params: { search, category, page, limit: 12 }
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <h2>Our Products</h2>
        <div className="search-filter">
          {/* Search Box */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              id="search"
              name="search"
              placeholder="Search products..." 
              value={search} 
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} 
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category">Filter by Category</label>
            <select 
              id="category"
              name="category"
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="category-select"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                  <div className="product-badge">{product.category}</div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">
                    ₹{!isNaN(product.price) ? parseFloat(product.price).toFixed(2) : '0.00'}
                  </p>
                  <p className="product-desc">
                    {product.description || 'No description available'}
                  </p>
                  <Link to={`/buy/${product.id}`} className="buy-button">
                    <FaShoppingCart /> Buy Now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setPage((prev) => Math.max(1, prev - 1))} 
            disabled={page <= 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} 
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
