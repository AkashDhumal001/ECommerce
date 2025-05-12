import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>
          Welcome to <span>ShopEasy</span>
        </h1>
        <p>Discover amazing products at unbeatable prices</p>
        <Link to="/products">
          <button>Shop Now →</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
