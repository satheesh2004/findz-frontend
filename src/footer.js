import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h3>Findzy</h3>
          <p>Your trusted marketplace for finding the best deals.</p>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Findzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
