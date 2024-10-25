// src/components/HomePage.js

import React from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import custom CSS
import { Carousel } from 'react-bootstrap';

// Import images directly
import slider1 from './images/slide1.jpg';
import slider2 from './images/slide2.jpg';
import slider3 from './images/slide3.jpg';
import slider4 from './images/slide4.jpg';

import mobile from './images/mobile.jpeg';
import laptop from './images/laptop.jpeg';
import smartwatch from './images/smartwatch.jpeg';
import headphone from './images/headphone.jpeg';

const categories = [
  { name: 'Mobiles', imgSrc: mobile, description: 'Latest models available. Experience high-speed performance and stunning displays.' },
  { name: 'Laptops', imgSrc: laptop, description: 'Powerful machines for work and play. Ideal for gamers and professionals alike.' },
  { name: 'Smart Watch', imgSrc: smartwatch, description: 'Track your fitness in style. Stay connected with notifications at a glance.' },
  { name: 'Headphones', imgSrc: headphone, description: 'High-quality sound for music lovers. Enjoy your favorite tunes with noise cancellation.' },
];

const CarouselImages = () => (
  <Carousel>
    {[slider1, slider2, slider3, slider4].map((imgSrc, index) => (
      <Carousel.Item interval={1000} key={index}>
        <img
          className="d-block w-100 carousel-img"
          src={imgSrc}
          alt={`Slide ${index + 1}`}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);

const Categories = () => (
  <div className="container my-4">
    <h2 className="categories-header text-center">Available Products</h2>
    <div className="row justify-content-center">
      {categories.map((category, index) => (
        <div className="col-6 col-sm-4 col-md-3 col-lg-3 text-center mb-4" key={index}>
          <div className="category-card">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="img-fluid rounded-circle category-img"
            />
            <h6 className="mt-3">{category.name}</h6>
            <p className="category-description">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// New AllProducts component
const AllProducts = () => (
  <div className="container my-4">
    <h2 className="text-center">All Products</h2>
    <p className="text-center">Here you can see all available products!</p>
    <div className="row justify-content-center">
      {categories.map((category, index) => (
        <div className="col-6 col-sm-4 col-md-3 col-lg-3 text-center mb-4" key={index}>
          <div className="category-card">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="img-fluid rounded-circle category-img"
            />
            <h6 className="mt-3">{category.name}</h6>
            <p className="category-description">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handler for button click
  const handleShowAllProducts = () => {
    navigate('/allProducts'); // Navigate to /allProducts
  };

  return (
    <div>
      <CarouselImages />
      <header className="homepage-header text-center py-4">
        <h1 className="header-title">Welcome to Our Store</h1>
        <p className="header-subtitle">Discover the best products for your lifestyle</p>
        <p className="slogan">Your one-stop shop for all your needs!</p>
        <button className="button" onClick={handleShowAllProducts}> {/* Add click handler */}
          <i className="fas fa-shopping-cart"></i> Shop Now
        </button>
      </header>
      <Categories />
    </div>
  );
};

export default HomePage;
