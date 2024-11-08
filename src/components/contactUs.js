import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Thank you for reaching out! We'll get back to you soon.");
            } else {
                setErrorMessage(data.message || "There was an error sending your message. Please try again later.");
            }
        } catch (error) {
            setErrorMessage("There was an error sending your message. Please try again later.");
        } finally {
            setLoading(false); // Reset loading to false after completion
        }

        // Clear form after submission
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p>We’d love to hear from you! Reach out with any questions, feedback, or inquiries.</p>

            <div className="contact-columns">
                {/* Contact Info & Location */}
                <div className="contact-info-location">
                    <section className="contact-info">
                        <h2>Contact Information</h2>
                        <p><FontAwesomeIcon icon={faEnvelope} />&nbsp; <strong>Email:</strong>flipdeals38@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPhone} /> &nbsp;<strong>Phone:</strong>+91 8080186885</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp; <strong>Address:</strong>506, Neelkanth, Vidya Vihar West, Mumbai</p>
                        <div className="social-links">
                            <a href="https://facebook.com/flipdeals" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} /> Facebook
                            </a>
                            <a href="https://twitter.com/flipdeals" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} /> Twitter
                            </a>
                            <a href="https://instagram.com/flipdeals" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} /> Instagram
                            </a>
                        </div>
                    </section>

                    <section className="location-info">
                        <h2>Our Location</h2>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.9073994302075!2d-122.08424968441953!3d37.42199957982409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c74fdc4b3%3A0x4d8b69b93e17e2f7!2s1600%20Amphitheatre%20Parkway%2C%20Mountain%20View%2C%20CA%2094043!5e0!3m2!1sen!2sus!4v1632254501779!5m2!1sen!2sus"
                                width="600"
                                height="450"
                                allowFullScreen=""
                                loading="lazy"
                            />
                        </div>
                    </section>
                </div>

                {/* Contact Form */}
                <div className="contact-form">
                    <h2>Send Us a Message</h2><br/>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {loading ? (
                        <p>Loading...</p> // Display loading text or spinner here
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
