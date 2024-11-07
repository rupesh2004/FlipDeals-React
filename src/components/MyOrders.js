import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [reason, setReason] = useState('');
    const [cancelOrderId, setCancelOrderId] = useState(null);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/checkEmailAndFetchOrders', { email });

            if (response.data.emailFound) {
                setOrders(response.data.orders);
                setOtpSent(true); 
                setError('');
            } else {
                setError('No orders found for this email address.');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/verifyOtp', { email, otp });

            if (response.data.valid) {
                setOtpVerified(true);
                setError('');
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            console.error(error);
        }
    };

    const requestCancelOrder = (orderId) => {
        setCancelOrderId(orderId); 
    };

    const handleCancelOrder = async (e) => {
        e.preventDefault();

        if (!reason) {
            setError("Please provide a reason for cancellation.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/orders/cancel`, { 
                orderId: cancelOrderId, 
                reason 
            });

            if (response.data.success) {
                setOrders(orders.filter(order => order._id !== cancelOrderId));
                setCancelOrderId(null);
                setReason('');
                setError('');
            } else {
                setError('Failed to cancel the order.');
            }
        } catch (error) {
            setError('Something went wrong while cancelling the order. Please try again later.');
            console.error(error);
        }
    };

    const calculateOrderStatus = (deliveryDate) => {
        const today = new Date();
        const deliveryDateObj = new Date(deliveryDate);
        return today > deliveryDateObj ? 'Delivered' : 'Shipped';
    };

    return (
        <div className="my-orders-container">
            {/* Go Back button */}
            <button className="go-back-button" onClick={() => navigate('/')}>
                <i className="fa fa-arrow-left"></i>
            </button>

            <h1>My Orders</h1>
            
            <form onSubmit={handleEmailSubmit} className="my-orders-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading || otpSent}>
                    {loading ? 'Loading...' : 'Send OTP'}
                </button>
            </form>

            {otpSent && (
                <form onSubmit={handleOtpSubmit} className="otp-form">
                    <div className="input-group">
                        <label>Enter OTP:</label>
                        <input 
                            type="text" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={otpVerified}>
                        Verify OTP
                    </button>
                </form>
            )}

            {error && <p className="error-message">{error}</p>}

            {otpVerified && (
                
                <div className="orders-list">
                    <h2>Your Orders</h2>
                    <div className="orders-container">
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                    <br/><br/>
                                
                                <p><strong>Product:</strong> {order.productId.productName}</p>
                                <p><strong>Quantity:</strong> {order.quantity}</p>
                                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                                <p><strong>Status:</strong> {calculateOrderStatus(order.deliveryDate)}</p>
                                <button 
                                    onClick={() => requestCancelOrder(order._id)} 
                                    className="cancel-button"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {cancelOrderId && (
                <div className="cancel-order-form">
                    <h3>Cancel Order</h3>
                    <form onSubmit={handleCancelOrder}>
                        <div className="input-group">
                            <label>Reason for Cancellation:</label>
                            <input 
                                type="text" 
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="submit-button">Submit Cancellation</button>
                        <br/>   
                        <br/>   

                        <button onClick={() => setCancelOrderId(null)} className="cancel-button">
                            Close
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
