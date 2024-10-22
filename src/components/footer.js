// src/components/Footer.js
import React from 'react';
import './footer.css'; // Import the CSS for styling
import logo from './images/logo.jpeg'; // Adjust the path to your logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { faGithub, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Brand icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Company Logo" className="footer-logo-image" />
                    <h1 className="footer-company-name">FlipDeals</h1>
                </div>
                <div className="footer-links">
                    <h2 className="footer-title">Company</h2>
                    <ul className="footer-list">
                        <li><a href="/"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                        <li><a href="/about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</a></li>
                        <li><a href="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact</a></li>
                        <li><a href="/services"><FontAwesomeIcon icon={faPhone} /> Services</a></li>
                    </ul>
                </div>
                <div className="footer-social-media">
                    <h2 className="footer-title">Follow Us</h2>
                    <ul className="social-media-list">
                        <li><a href="https://www.github.com/rupesh2004" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> GitHub</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
                        <li><a href="https://www.instagram.com/_rupesh_bhosale_" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
                        <li><a href="https://www.linkedin.com/in/rupeshkumar-bhosale-681b63255/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} FlipDeals. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
