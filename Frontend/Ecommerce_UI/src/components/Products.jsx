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
        <h2>Explore Our Products</h2>
        <div className="search-filter">
          {/* Search Box */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Filter */}
          <select
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

      {/* Product Grid */}
      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            products.map((product) => (
              <div className="card product-card" key={product.id}>
                <img
                  src={product.image || 'https://via.placeholder.com/300x250?text=No+Image'}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{parseFloat(product.price).toFixed(2)}</p>
                  <p className="card-text text-muted">{product.description || 'No description'}</p>
                  <Link to={`/buy/${product.id}`} className="btn btn-primary w-100 mt-2">
                    <FaShoppingCart className="me-2" /> Buy Now
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
            className="btn btn-outline-primary"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="mx-3">Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline-primary"
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
