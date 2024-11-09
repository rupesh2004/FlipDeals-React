import React from 'react';
import './Services.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTags, faPercentage, faTruck, faCreditCard, faHeadset, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
    const services = [
        {
            icon: faShoppingCart,
            title: "Discounted Products",
            description: "Discover a variety of discounted products from top brands, making shopping affordable and rewarding."
        },
        {
            icon: faTags,
            title: "Exclusive Deals",
            description: "Get access to limited-time, exclusive deals tailored just for you. Don’t miss out on extra savings."
        },
        {
            icon: faPercentage,
            title: "Cashback Offers",
            description: "Earn cashback on selected purchases and redeem your rewards on future buys for extra savings."
        },
        {
            icon: faTruck,
            title: "Fast & Free Shipping",
            description: "Enjoy fast, free shipping on qualifying orders. We ensure your products arrive quickly and reliably."
        },
        {
            icon: faCreditCard,
            title: "Secure Payments",
            description: "Shop with confidence with multiple secure payment options that keep your transactions safe."
        },
        {
            icon: faHeadset,
            title: "24/7 Customer Support",
            description: "Our dedicated support team is available around the clock to assist with any inquiries or issues."
        },
    ];

    const orderSteps = [
        "Create an Account: Sign up on our website to access exclusive deals.",
        "Log In: Access your account by logging in.",
        "Browse Products: View all products available on our site.",
        "Select Product: Choose the product you want to purchase.",
        "View Product Details: Check product specifications and features.",
        "Buy Now: Click 'Buy Now' to start the purchase process.",
        "Fill Order Form: Complete your shipping and billing information.",
        "Select Payment Method: Choose online or cash on delivery. For online, enter card details.",
        "Place Order: Submit your order and receive confirmation.",
        "Track Order Status: View your order’s progress in your account."
    ];

    return (
        <div className="services-container">
            <h1>Our Services</h1>
            <p>Making your shopping experience seamless, affordable, and rewarding with our range of services.</p>
            
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={service.icon} className="service-icon" />
                        </div>
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
            
            <h2 className="order-heading">How to Place an Order</h2>
            <ul className="order-steps">
                {orderSteps.map((step, index) => (
                    <li key={index}>
                        <span className="step-number"></span>
                        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
            
            <button className="cta-button">Explore More Services</button>
        </div>
    );
};

export default Services;
    