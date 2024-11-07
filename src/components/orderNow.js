import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './OrderNow.css';

const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    homeNo: '',
    streetName: '',
    village: '',
    taluka: '',
    district: '',
    state: '',
    pinCode: '',
  });

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const totalAmount = quantity * (product ? product.productPrice : 0);

  // Define orderData outside of handleSubmit
  const orderData = {
    productId: product?._id,
    customerName: formData.name,
    customerEmail: formData.email,
    contactNumber: formData.contact,
    address: `${formData.homeNo}, ${formData.streetName}, ${formData.village}, ${formData.taluka}, ${formData.district}, ${formData.state} - ${formData.pinCode}`,
    quantity: quantity,
    paymentMethod: paymentMethod,
    totalAmount: totalAmount,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (increment) => {
    if (increment && quantity < 5) {
      setQuantity(quantity + 1);
    } else if (!increment && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("You can only order up to 5 units of this product.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCheckResponse = await axios.post('http://localhost:5000/api/checkUser', { email: formData.email });
      if (userCheckResponse.data.exists) {
        if (paymentMethod === 'cash') {
          // Save the order immediately if Cash on Delivery is selected
          const response = await axios.post('http://localhost:5000/api/orders', orderData);
          if (response.status === 201) {
            alert('Order placed successfully!');
            navigate('/orderConfirmation');
          }
        }
      } else {
        alert('User not found. Please register first.');
        navigate('/signup');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-now-container">
      {/* Go Back Button */}
      <button className="go-back-button" onClick={() => navigate('/allProducts')}>
        <i className="fa fa-arrow-left"></i>
      </button>

      <div className="product-summary">
        <img src={product.productImage} alt={product.productName} />
        <div className="product-details">
          <h3>{product.productName}</h3>
          <p>Price: ₹{product.productPrice}</p>
        </div>
      </div>

      <div className="order-form-container">
        <form onSubmit={handleSubmit} className="order-form">
          <div className="input-section">
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Contact Number:
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </label>
            <label>
              Home No:
              <input type="text" name="homeNo" value={formData.homeNo} onChange={handleChange} required />
            </label>
            <label>
              Street Name:
              <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} required />
            </label>
            <label>
              Village:
              <input type="text" name="village" value={formData.village} onChange={handleChange} />
            </label>
            <label>
              Taluka:
              <input type="text" name="taluka" value={formData.taluka} onChange={handleChange} required />
            </label>
            <label>
              District:
              <input type="text" name="district" value={formData.district} onChange={handleChange} required />
            </label>
            <label>
              State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </label>
            <label>
              Pin Code:
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
            </label>
          </div>

          <div className="quantity-section">
            <label>
              Quantity: &nbsp;
              <button type="button" onClick={() => handleQuantityChange(false)}>-</button>&nbsp;
              <span>{quantity}</span>&nbsp;&nbsp;
              <button type="button" onClick={() => handleQuantityChange(true)}>+</button>
            </label>
          </div>

          <div className="payment-section">
            <h4>Payment Method</h4>
            <div>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div>
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={() => setPaymentMethod('online')}
              />
              <label htmlFor="online">Online Payment</label>
            </div>

            <div className="total-amount">
              <h4>Total Amount: ₹{totalAmount}</h4>
            </div>
          </div>

          {/* Hide Place Order button when online payment is selected */}
          {paymentMethod === 'cash' && (
            <button type="submit" className="place-order-button">Place Order</button>
          )}
        </form>
      </div>

      {paymentMethod === 'online' && <CheckoutForm amount={totalAmount} orderData={orderData} navigate={navigate} />}
    </div>
  );
};

// CheckoutForm Component
function CheckoutForm({ amount, orderData, navigate }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // New state for handling processing status

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Ensure Stripe and Elements are ready
    }

    const cardElement = elements.getElement(CardElement); // Get the CardElement

    if (!cardElement) {
      setPaymentStatus('Error: CardElement is not available.');
      return; // Check if CardElement is available
    }

    if (isProcessing) {
      return; // Prevent form submission if payment is already being processed
    }

    setIsProcessing(true); // Set processing state to true

    // Get the billing information from the orderData
    const billingDetails = {
      name: orderData.customerName,
      email: orderData.customerEmail,
      phone: orderData.contactNumber, // Mobile number
      address: {
        line1: orderData.homeNo,
        line2: orderData.streetName,
        city: orderData.village,
        state: orderData.state,
        postal_code: orderData.pinCode,
        country: 'IN' // Set the country code, assuming India (IN) here. Adjust if necessary.
      },
    };

    try {
      const response = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }), // Pass the dynamic amount
      });

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error("Failed to retrieve client secret from server.");
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement, // Pass the CardElement directly here
          billing_details: billingDetails, // Send the billing details to Stripe
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        setPaymentStatus('Payment failed: ' + result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment successful:', result.paymentIntent);
          setPaymentStatus('Payment successful!');

          // Save the order after payment is successful
          try {
            const response = await axios.post('http://localhost:5000/api/orders', orderData);
            if (response.status === 201) {
              alert('Payment Successful and Order placed successfully!');
              navigate('/orderConfirmation');
            }
          } catch (error) {
            console.error('Error saving order after payment:', error);
            alert('Error placing order. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      setPaymentStatus('Error: ' + error.message);
    } finally {
      setIsProcessing(false); // Reset processing state after payment attempt
    }
  };

  return (
    <div>
      <h3>Proceed to Payment</h3>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {/* Disable the button when payment is processing */}
        <br/>
        <button type="submit" disabled={isProcessing || !stripe}>Place Order</button>
      </form>
    </div>
  );
}

export default OrderNow;
