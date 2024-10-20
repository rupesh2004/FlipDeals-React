// src/Navbar.js
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './navbar.css'; // Import CSS for Navbar styles
import logo from './images/logo.jpeg'; // Import your logo

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        // Implement your search functionality here
        console.log('Search Term:', searchTerm);
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="FlipDeals Logo" className="logo" />
                <h1 className="company-name">FlipDeals</h1>
            </div>
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <ul className="nav-items">
                <li>
                    <a href="#home">
                        <i className="fa fa-home"></i> Home
                    </a>
                </li>
                <li>
                    <a href="#products">
                        <i className="fa fa-box"></i> Products
                    </a>
                </li>
                <li className="dropdown">
                    <a href="#categories">
                        <i className="fa fa-th-list"></i> Categories
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="#mobiles"><i className="fa fa-mobile"></i> Mobiles</a></li>
                        <li><a href="#headphones"><i className="fa fa-headphones"></i> Headphones</a></li>
                        <li><a href="#laptops"><i className="fa fa-laptop"></i> Laptops</a></li>
                        <li><a href="#smartwatches"><i className="fa fa-watch"></i> Smart Watches</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#signin">
                        <i className="fa fa-sign-in"></i> Sign In
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
