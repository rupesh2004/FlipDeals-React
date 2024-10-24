// src/components/Navbar.js
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './navbar.css'; // Import CSS for Navbar styles
import logo from './images/logo.jpeg'; // Import your logo
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = ({ setSearchTerm }) => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="FlipDeals Logo" className="logo" />
                <h1 className="company-name">FlipDeals</h1>
            </div>
            <div className="search-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search..." 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button type="submit" className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
            <ul className="nav-items">
                <li>
                    <Link to="/">
                        <i className="fa fa-home"></i> Home
                    </Link>
                </li>
                <li>
                    <Link to="/uploadProducts">
                        <i className="fa fa-items"></i> Products 
                    </Link>
                </li>
                
                <li className="dropdown">
                    <a href="#categories">
                        <i className="fa fa-th-list"></i> Categories
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="#mobiles"><i className="fa fa-mobile"></i> Mobiles</a></li>
                        <li><a href="#headphones"><i className="fa fa-headphones"></i> Headphones</a></li>
                        <li><a href="#laptops"><i className="fa fa-laptop"></i> Laptops</a></li>
                        <li><a href="#smartwatches"><i className="fa fa-watch"></i> Smart Watches</a></li> {/* Updated with smartwatch icon */}
                    </ul>
                </li>
                <li>
                    <Link to="/signin">
                        <i className="fa fa-sign-in"></i> Sign In
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
