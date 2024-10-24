import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Products from './components/products';
import Footer from './components/footer';
import SignUpForm from './components/signupForm';
import LoginForm from './components/loginForm';
import ForgotPasswordForm from './components/forgotPassword';
import ProductDetail from './components/productDetails'; // Import the ProductDetail component

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div>
        <Navbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Navbar */}
        <Routes>
          <Route path='/' element={<Products searchTerm={searchTerm} />} /> {/* Home page route */}
          <Route path='/signin' element={<LoginForm />} /> {/* Login page */}
          <Route path='/signup' element={<SignUpForm />} /> {/* Signup page */}
          <Route path='/forgotPassword' element={<ForgotPasswordForm />} /> {/* Forgot password page */}
          <Route path='/product/:id' element={<ProductDetail />} /> {/* Dynamic product detail page */}
        </Routes>
        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

export default App;
