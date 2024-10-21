import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css'; // Import the CSS file

const UploadForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null); // Store the image file

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productImage', productImage); // Append the image file to the form data

    // Send the form data (including the image) to the backend
    axios.post('http://localhost:5000/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file upload
      },
    })
      .then(response => {
        alert('Product uploaded successfully');
        // Clear the form fields after successful upload
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
      <h2>Upload Product</h2>
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
          type="file" // Allow users to choose a file from their computer
          accept="image/*" // Restrict file selection to image files only
          onChange={(e) => setProductImage(e.target.files[0])} // Capture the selected file
          required
        />
      </div>
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default UploadForm;
