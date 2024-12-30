import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer pt-5">
      <div className="container">
        {/* Footer Top Section */}
        <div className="row">
          {/* Column 1: UnidevGo Links */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-primary">UnidevGo</h6>
            <ul className="list-unstyled">
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/contact" className="footer-link">Contact us</Link></li>
              <li><Link to="/templates" className="footer-link">Templates</Link></li>
              <li><Link to="/smb" className="footer-link">SMB</Link></li>
              <li><Link to="/support" className="footer-link">24/7 Support</Link></li>
            </ul>
          </div>

          {/* Column 2: Features */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-secondary">Features</h6>
            <ul className="list-unstyled">
              <li><Link to="/docs" className="footer-link">Docs</Link></li>
              <li><Link to="/integrations" className="footer-link">Integrations</Link></li>
              <li><Link to="/automations" className="footer-link">Automations</Link></li>
              <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
              <li><Link to="/ai" className="footer-link">AI</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-danger">Products</h6>
            <ul className="list-unstyled">
              <li><Link to="/work-management" className="footer-link">Work Management</Link></li>
              <li><Link to="/crm" className="footer-link">CRM</Link></li>
              <li><Link to="/dev" className="footer-link">Dev</Link></li>
              <li><Link to="/service" className="footer-link">Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Use Cases */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-success">Use Cases</h6>
            <ul className="list-unstyled">
              <li><Link to="/marketing" className="footer-link">Marketing</Link></li>
              <li><Link to="/sales" className="footer-link">Sales</Link></li>
              <li><Link to="/hr" className="footer-link">HR</Link></li>
              <li><Link to="/education" className="footer-link">Education</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-warning">Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about-us" className="footer-link">About us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/press" className="footer-link">Press</Link></li>
              <li><Link to="/partners" className="footer-link">Become a Partner</Link></li>
            </ul>
          </div>

          {/* Column 6: Resources */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h6 className="fw-bold mb-3 text-info">Resources</h6>
            <ul className="list-unstyled">
              <li><Link to="/help-center" className="footer-link">Help Center</Link></li>
              <li><Link to="/community" className="footer-link">Community</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/academy" className="footer-link">Academy</Link></li>
            </ul>
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="app-buttons d-flex justify-content-center gap-3 mb-4">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-store-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="img-fluid"
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="app-store-btn">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="img-fluid"
            />
          </a>
        </div>

        {/* Footer Links */}
        <div className="footer-links d-flex flex-wrap justify-content-center gap-4 mb-4">
          <Link to="/security" className="footer-link">Security</Link>
          <Link to="/terms" className="footer-link">Terms and privacy</Link>
          <Link to="/privacy-policy" className="footer-link">Privacy policy</Link>
          <Link to="/choices" className="footer-link">Your privacy choices</Link>
          <Link to="/status" className="footer-link">Status</Link>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap my-5 pt-4 border-top">
          {/* Social Media Icons */}
          <div className="social-icons d-flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
          </div>

          {/* Footer Text */}
          <p className="text-muted mb-0">&copy; 2024 UnidevGo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
