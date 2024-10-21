import React from 'react';
import './ProductCard.css'

const ProductCard = ({ productImage, productName, productPrice }) => {
  return (
    <div className="product-card">
      <img src={productImage} alt={productName} className="product-image" />
      <h3 className="product-name">{productName}</h3>
      <p className="product-price">Price: {productPrice}</p>
    </div>
  );
};

export { ProductCard };
