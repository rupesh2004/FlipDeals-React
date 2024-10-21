import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]); // Capture the image file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productImage', productImage);

    axios.post('http://localhost:5000/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert('Product uploaded successfully');
      setProductName('');
      setProductPrice('');
      setProductImage(null);
    })
    .catch(error => {
      console.error('Error uploading product:', error);
    });
  };

  return (
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
        <label>Product Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
      </div>
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default UploadForm;
