import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/navbar';
import Products from './components/products';
import Footer from './components/footer';
import SignUpForm from './components/signupForm';
import LoginForm from './components/loginForm';
import ForgotPasswordForm from './components/forgotPassword';
import ProductDetail from './components/productDetails';
import ImageCarousel from './components/Home.js';
import OrderPage from './components/orderNow.js';
import OrderConfirmation from './components/OrderConfirmation.js'
import MyOrders from './components/MyOrders';
import AboutUs from './components/aboutUs.js';
import ContacUs from './components/contactUs.js';
// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QHJ9gJ3vYbqgfoF5VLtgqIbh8HGfVHAswEDfBrPwLufDX2xQjRXgvSLHk1MaJZxcUjgOhep9O7e5y2tuAcWpbeb00tAyn8MCX');

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Wrap the routes inside Elements provider */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/orderNow" element={<OrderPage />} />
            <Route path="/" element={<ImageCarousel />} />
            <Route path="/allProducts" element={<Products />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orderConfirmation" element={<OrderConfirmation />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContacUs />} />

            
          </Routes>
        </Elements>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
