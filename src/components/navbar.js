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
                <Link to="/">
                    <h1 className="company-name">FlipDeals</h1>
                </Link>
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
                    <Link to="/allProducts">
                        <i className="fa fa-box"></i> Products {/* Updated icon */}
                    </Link>
                </li>
                <li>
                    <Link to="/myOrders">
                        <i className="fa fa-list-alt"></i> My Orders {/* Updated tab */}
                    </Link>
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
