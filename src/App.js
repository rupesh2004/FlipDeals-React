import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Products from './components/products';
import Footer from './components/footer';
import SignUpForm from './components/signupForm';
import LoginForm from './components/loginForm';
import ForgotPasswordForm from './components/forgotPassword';
import ProductDetail from './components/productDetails'; // Import the new ProductDetail component
// import UploadForm from "./components/uploadProduct.js"
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div>
        <Navbar setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path='/' element={<Products searchTerm={searchTerm} />} />
          <Route path='/signin' element={<LoginForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/forgotPassword' element={<ForgotPasswordForm />} />
          <Route path='/product/:id' element={<ProductDetail />} /> {/* New Route for Product Detail */}
          {/* <Route path= "/uploadProducts" element={<UploadForm/>} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
