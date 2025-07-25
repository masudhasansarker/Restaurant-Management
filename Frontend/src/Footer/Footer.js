import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="row-footer">
          <div className="footer-col">
            <h4>Our Restaurant</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/dish">Menu</a></li>
              <li><a href="/contact">Reservations</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Delivery Info</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul>
              <li>Mon-Fri: 10am - 10pm</li>
              <li>Sat-Sun: 12pm - 11pm</li>
              <li>Public Holidays: Closed</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
              <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
            </div>
            {/* <p><FontAwesomeIcon icon={faPhone} /> +123 456 7890</p> */}
          </div>
        </div>
      </div>
      <div className="developer-note">
        <p>Developed by Masud Hasan &copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
