import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './ProductDetail.css'; 
import './Modal.css'; 

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalImage, setModalImage] = useState(''); 
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate('/'); 
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color); 
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  // Display loader while loading
  if (loading) {
    return <div className="loader">Loading...</div>; // Your loading message or spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>; 
  }

  const specifications = product.productSpecification
    ? product.productSpecification.split(',')
    : [];

  const firstColumnSpecs = specifications.slice(0, Math.floor(specifications.length / 2)); 
  const secondColumnSpecs = specifications.slice(Math.floor(specifications.length / 2)); 

  return (
    <div className="product-detail-container">
      <button className="go-back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> 
        Go Back
      </button>
      
      <div className="product-detail-content">
        <div className="product-image-container">
          <img
            src={product.productImage}
            alt={product.productName}
            className="product-detail-image"
            onClick={() => openModal(product.productImage)} 
          />
          <div className="button-container">
            <button className="buy-now-btn">
              <i className="fas fa-shopping-cart"></i> 
              Buy Now
            </button>
          </div>
        </div>
        <div className="product-info">
          <h2 className="product-detail-name">{product.productName}</h2>
          <p className="product-detail-label"><strong>Price:</strong> ₹{product.productPrice} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Company:</strong> {product.companyName}</p>
      

          <p className="product-detail-label"><strong>Spcifications:</strong></p>
          <div className="specifications-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        {firstColumnSpecs.map((spec, index) => (
                          <tr key={index}>
                            <td className="spec-description">{spec.trim()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {secondColumnSpecs.map((spec, index) => (
                          <tr key={index}>
                            <td className="spec-description">{spec.trim()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="product-detail-label"><strong>Description:</strong></p>
          <p className="product-description">{product.productDescription || 'No description available.'}</p>

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
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={modalImage} alt="Modal" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
