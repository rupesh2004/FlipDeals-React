// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.js';
import Products from './components/products.js';
import Footer from './components/footer.js' // Adjust path as needed
import './App.css';
import SignUpForm from './components/signupForm.js';
import LoginForm from './components/loginForm.js'
// import ProductCarousel from './components/productSlider.js';
import ForgotPasswordForm from './components/forgotPassword.js'
function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Router>
            <div>
                <Navbar setSearchTerm={setSearchTerm} />
                <Routes>
                    <Route path='/' element={<Products searchTerm={searchTerm} />} />
                    <Route path = '/signin' element = {<LoginForm/>}/>  
                    <Route path = '/signup' element = {<SignUpForm/>}/>
                    <Route path = "/forgotPassword" element = {<ForgotPasswordForm/>} />
                    {/* Add other routes as needed */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
