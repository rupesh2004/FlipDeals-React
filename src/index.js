import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import UploadForm from './components/uploadProduct'; // Import your UploadForm component
import { ProductCard } from './components/productCard';// Create a Home component or another page component

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ProductCard/>
        <Routes>
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
