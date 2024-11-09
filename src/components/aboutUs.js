import React from 'react';
import './AboutUs.css';
import rupesh from "./images/rupesh.jpg";
import monal from "./images/monal.jpg";

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>
            <div className="about-us-content">
                <section className="about-us-intro">
                    <h2>Welcome to FlipDeals</h2>
                    <p>
                        FlipDeals is your one-stop destination for quality products at competitive prices. Since our inception, 
                        we have been committed to providing a wide variety of products, from electronics to home essentials, 
                        ensuring our customers find exactly what they need. At FlipDeals, we combine quality with affordability, 
                        making online shopping a delightful experience for everyone.
                    </p>
                </section>

                <section className="about-us-mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to create a customer-centric online marketplace where quality products meet exceptional service. 
                        We strive to build a shopping platform that puts customers first, offering seamless experiences through our 
                        easy-to-navigate website, trusted vendors, and dedicated customer support team.
                    </p>
                    <p>
                        FlipDeals aims to redefine online shopping by bridging the gap between convenience and quality. 
                        Our commitment to transparency, competitive pricing, and timely delivery ensures our customers enjoy 
                        a hassle-free shopping experience.
                    </p>
                </section>

                <section className="about-us-vision">
                    <h2>Our Vision</h2>
                    <p>
                        Our vision is to be a trusted household name in the e-commerce industry, recognized for our commitment 
                        to customer satisfaction and innovation. We envision a future where FlipDeals is synonymous with quality, 
                        reliability, and trustworthiness, helping millions of customers access the best products from the comfort of their homes.
                    </p>
                    <p>
                        As we grow, we are dedicated to staying ahead of trends, embracing technology, and continuously improving our services 
                        to meet the changing needs of our customers.
                    </p>
                </section>
                
                <section className="about-us-story">
                    <h2>Our Story</h2>
                    <p>
                        FlipDeals was founded with a simple idea: to make quality products accessible to everyone. 
                        What started as a small online store quickly grew into a dynamic platform with an extensive selection of items across various categories. 
                        Thanks to our loyal customers and a team that’s passionate about making a difference, we’ve transformed FlipDeals into a trusted name 
                        in e-commerce.
                    </p>
                    <p>
                        Today, FlipDeals is proud to serve a diverse customer base, connecting people with the products they love 
                        and creating meaningful shopping experiences. Our story is one of innovation, dedication, and a commitment to making 
                        online shopping better every day.
                    </p>
                </section>

                <section className="about-us-team">
                    <h2>Meet the Team</h2>
                    <p>
                        Our team is the backbone of FlipDeals. We are a group of dedicated professionals with a shared passion for e-commerce 
                        and customer satisfaction. Each team member brings unique skills to the table, making FlipDeals a trusted platform 
                        that our customers can rely on. Get to know the people who make FlipDeals possible.
                    </p>
                    <div className="team-profiles">
                        <div className="team-member">
                            <img src={rupesh} alt="Rupesh Bhosale - Founder & CEO" />
                            <h3>Rupesh Bhosale</h3>
                            <p>Founder & CEO</p>
                            <a href="https://www.linkedin.com/in/rupeshkumar-bhosale-681b63255/" target="_blank" rel="noopener noreferrer" className="profile-link">
                                Visit Profile
                            </a>
                        </div>
                        {/* <div className="team-member">
                            <img src={monal} alt="Monal Sutar - Co-Founder & CTO" />
                            <h3>Monal Sutar</h3>
                            <p>Co-Founder & CTO</p>
                            <a href="https://www.linkedin.com/in/monal-gajanan-sutar-13a9a6235/" target="_blank" rel="noopener noreferrer" className="profile-link">
                                Visit Profile
                            </a>
                        </div> */}
                        {/* Add more team members as needed */}
                    </div>
                </section>
                
                <section className="about-us-values">
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Integrity:</strong> We value honesty and transparency, maintaining trust with our customers and partners.</li>
                        <li><strong>Quality:</strong> We never compromise on quality, from our product selection to our service.</li>
                        <li><strong>Customer Focus:</strong> Our customers come first, and we strive to exceed their expectations in everything we do.</li>
                        <li><strong>Innovation:</strong> We embrace new ideas and technologies to continually improve our offerings.</li>
                        <li><strong>Accountability:</strong> We take responsibility for our actions, ensuring reliability and trustworthiness.</li>
                    </ul>
                </section>
                
                <section className="about-us-commitment">
                    <h2>Our Commitment to You</h2>
                    <p>
                        At FlipDeals, we are committed to making every shopping experience a positive one. Whether you are browsing our latest 
                        collections or reaching out for support, we are here to assist you every step of the way. Thank you for choosing FlipDeals. 
                        We look forward to serving you with integrity, dedication, and a smile.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
