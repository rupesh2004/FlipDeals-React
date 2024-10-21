import React from 'react';
import './ProductCard.css'

const ProductCard = ({ productImage, productName, productPrice }) => {
  return (
    <div className="product-card">
      <img src={productImage} alt={productName} className="product-image" />
      <h3>{productName}</h3>
      <p>Price: {productPrice}</p>
    </div>
  );
};

export {ProductCard};
