// src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from './productCard'; // Adjust the path as needed
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const categories = ["Laptops", "Mobiles", "Headphones", "Smart Watches  "]; // Array of headers

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => {
        console.log(response.data); // Log the response data
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 && (
        <>
          {categories.map((category, catIndex) => {
            const categoryProducts = products.filter((_, index) => {
              return Math.floor(index / 5) === catIndex; // Get products for the current category
            });

            return (
              <div key={category} className="category-section">
                <h1 className="header-title">{category}</h1>
                <div className="product-row">
                  {categoryProducts.map((product) => (
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
          })}
        </>
      )}
      <br />
      <br />
    </div>
  );
};

export default Products;
