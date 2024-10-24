// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ productImage, productName, productPrice, productId }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = () => {
    navigate(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={productImage} alt={productName} className="product-image" />
      <h3 className="product-name">{productName}</h3>
      <p className="product-price">Price: {productPrice}</p>
    </div>
  );
};

export { ProductCard };
