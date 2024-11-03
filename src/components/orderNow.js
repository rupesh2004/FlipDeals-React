import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const loadGooglePay = useCallback(() => {
    if (window.google) {
      const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
      const button = paymentsClient.createButton({
        onClick: onGooglePayButtonClicked,
      });
      const gpayContainer = document.getElementById('gpay-button-container');
      gpayContainer.innerHTML = '';
      gpayContainer.appendChild(button);
    }
  }, []);

  useEffect(() => {
    if (paymentMethod === 'online') {
      loadGooglePay();
    }
  }, [paymentMethod, loadGooglePay]);

  const onGooglePayButtonClicked = async () => {
    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: 'BCR2DN4TXXYQWBHG',
        merchantName: 'Your Company Name',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: totalAmount.toString(),
        currencyCode: 'INR',
        countryCode: 'IN',
      },
    };

    const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      handlePaymentSuccess(paymentData);
    } catch (error) {
      console.error('Google Pay Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const orderData = {
        productId: product._id,
        customerName: formData.name,
        customerEmail: formData.email,
        contactNumber: formData.contact,
        address: `${formData.homeNo}, ${formData.streetName}, ${formData.village}, ${formData.taluka}, ${formData.district}, ${formData.state} - ${formData.pinCode}`,
        quantity: quantity,
        paymentMethod: 'online',
        totalAmount: totalAmount,
        paymentData: paymentData, // Include payment data for processing
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      if (response.status === 201) {
        alert('Order placed successfully!');
        navigate('/orderConfirmation');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      productId: product._id,
      customerName: formData.name,
      customerEmail: formData.email,
      contactNumber: formData.contact,
      address: `${formData.homeNo}, ${formData.streetName}, ${formData.village}, ${formData.taluka}, ${formData.district}, ${formData.state} - ${formData.pinCode}`,
      quantity: quantity,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount,
    };

    if (paymentMethod === 'online') {
      onGooglePayButtonClicked();
    } else {
      try {
        const userCheckResponse = await axios.post('http://localhost:5000/api/checkUser', { email: formData.email });
        if (userCheckResponse.data.exists) {
          const response = await axios.post('http://localhost:5000/api/orders', orderData);
          if (response.status === 201) {
            alert('Order placed successfully!');
            navigate('/orderConfirmation');
          }
        } else {
          alert('User not found. Please register first.');
          navigate('/signup');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
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
              <label htmlFor="online">Google Pay</label>
            </div>

            <div className="total-amount">
              <h4>Total Amount: ₹{totalAmount}</h4>
            </div>
          </div>

          {paymentMethod === 'cash' && (
            <button type="submit" className="place-order-button">Place Order</button>
          )}
        </form>

        {paymentMethod === 'online' && (
          <div id="gpay-button-container" className="gpay-button-container"></div>
        )}
      </div>
    </div>
  );
};

export default OrderNow;
