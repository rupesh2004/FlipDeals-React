// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './ProductDetail.css'; // Optional CSS for product details styling

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); // State for selected color
  const navigate = useNavigate(); // Use navigate for going back

  useEffect(() => {
    // Fetch product details from the backend using the product ID
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data); // Set the fetched product data
      } catch (err) {
        setError('Error fetching product details');
        console.error('Error fetching product details:', err);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the main page
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color); // Update the selected color state
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>; // Display a loading message while fetching
  }

  return (
    <div className="product-detail-container">
      <button className="go-back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> {/* Font Awesome icon */}
        Go Back
      </button>
      <div className="product-detail-content">
        <img src={product.productImage} alt={product.productName} className="product-detail-image" />
        <div className="product-info">
          <h2 className="product-detail-name">{product.productName}</h2>
          
          {/* Added Labels for Product Information */}
          <p className="product-detail-label"><strong>Price:</strong> ${product.productPrice}</p>
          
          {/* Conditional Rendering for Specifications */}
          <p className="product-detail-label">
            <strong>Specifications:</strong> {product.productSpecification || 'No specifications available.'}
          </p>
          
          {/* Color Options */}
          <div className="color-options">
            <p className="product-detail-label"><strong>Choose Color:</strong></p>
            {['red', 'blue', 'green', 'yellow'].map((color) => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>

          {/* Button Container for Buy Now and Cancel Order */}
          <div className="button-container">
            <button className="buy-now-btn">Buy Now</button>
            <button className="cancel-order-btn">Cancel Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
