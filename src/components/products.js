// src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products') // Make sure the port matches your backend server
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="header-title">Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productImage={product.productImage}
            productName={product.productName}
            productPrice={product.productPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
