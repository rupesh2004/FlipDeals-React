// src/pages/MyOrders.js
import React, { useState } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
    const [email, setEmail] = useState(''); // Not needed anymore
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Directly fetch orders for the email
            const response = await axios.get(`http://localhost:5000/api/orders/${email}`);

            if (response.data.length > 0) {
                // If orders are found, set them
                setOrders(response.data);
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

    return (
        <div className="my-orders-container">
            <h1>My Orders</h1>
            <form onSubmit={handleSubmit} className="my-orders-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Orders'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>

            {orders.length > 0 && (
                <div className="orders-list">
                    <h2>Your Orders</h2>
                    <ul>
                        {orders.map((order) => (
                            <li key={order._id}>
                                <h3>Order ID: {order._id}</h3>
                                <p>Product: {order.productId.name}</p>
                                <p>Quantity: {order.quantity}</p>
                                <p>Total Amount: ₹{order.totalAmount}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <p>Status: {order.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
