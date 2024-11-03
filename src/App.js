// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Products from './components/products';
import Footer from './components/footer';
import SignUpForm from './components/signupForm';
import LoginForm from './components/loginForm';
import ForgotPasswordForm from './components/forgotPassword';
import ProductDetail from './components/productDetails'; // Import the ProductDetail component
import ImageCarousel from './components/Home.js';
import OrderNow from './components/orderNow.js';
function App() {

  return (
    <Router>
      <div>
        <Navbar/> 
        <Routes>
          <Route path='/' element={<ImageCarousel/>} /> {/* Home page route */}
          <Route path = '/allProducts' element={<Products/>}/>
          <Route path='/signin' element={<LoginForm />} /> {/* Login page */}
          <Route path='/signup' element={<SignUpForm />} /> {/* Signup page */}
          <Route path='/forgotPassword' element={<ForgotPasswordForm />} /> {/* Forgot password page */}
          <Route path='/product/:id' element={<ProductDetail />} /> {/* Dynamic product detail page */}
          <Route path = "/orderNow" element= {<OrderNow/>} />
        </Routes>
        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

export default App;
