import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';
import orderSuccessful from './images/orderSuccessful.jpg';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <h1>Order Successful!</h1>
      <img src={orderSuccessful} alt="Order Successful" /><br/>
      <p>Thank you for your order. Your order was placed successfully!</p>
      <button className="view-more-button" onClick={() => navigate('/allProducts')}>
        View More Products
      </button>
    </div>
  );
};

export default OrderConfirmation;
