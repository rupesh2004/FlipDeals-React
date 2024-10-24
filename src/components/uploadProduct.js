// src/ProductUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css'
const ProductUpload = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [companyName, setCompanyName] = useState(''); // New field
  const [productDescription, setProductDescription] = useState('');
  const [productSpecification, setProductSpecification] = useState(''); // New field
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('companyName', companyName); // Append new field
    formData.append('productDescription', productDescription);
    formData.append('productSpecification', productSpecification); // Append new field
    if (productImage) {
      formData.append('productImage', productImage);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Reset form fields
      setProductName('');
      setProductPrice('');
      setCompanyName(''); // Reset new field
      setProductDescription('');
      setProductSpecification(''); // Reset new field
      setProductImage(null);
    } catch (error) {
      console.error('Error uploading product:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Specification:</label>
          <textarea
            value={productSpecification}
            onChange={(e) => setProductSpecification(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductUpload;
