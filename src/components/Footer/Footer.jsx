import React from 'react';
import './Footer.css';
import { BiSolidCameraMovie } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">
          <Link to='/' className='logo'><BiSolidCameraMovie className="logo-icon" /> MovieApp  </Link> </h2>
           <p>&copy; 2025 MovieApp. All rights reserved.</p>
        <div className="footer-links">  <span>Privacy Policy</span><span>Terms & Conditions</span> </div>
      </div>
    </footer>
  );
};

export default Footer;
