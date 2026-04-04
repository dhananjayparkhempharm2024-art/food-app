import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Column 1: Brand & About */}
        <div className="footer-col">
          <h2 className="footer-logo">Food<span>Express</span></h2>
          <p className="footer-desc">
            Bringing the best flavors from local kitchens straight to your doorstep. 
            Fresh, fast, and always delicious.
          </p>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="https://github.com/SHUBHAM-MAKODE"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/shubham-makode/"><FaLinkedin /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <span>123 Food Street, Bengaluru, Karnataka</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>support@foodexpress.com</span>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest offers and menu updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 FoodExpress. Designed with ❤️ by <strong>Shubham Makode</strong></p>
      </div>
    </footer>
  );
};

export default Footer;