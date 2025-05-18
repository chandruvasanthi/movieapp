import React, { useRef, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

const Header = () => {
  const navigator = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value.trim();
    e.target.reset();
    return navigator(`/search?q=${queryTerm}`);
  };
  const menuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    menuRef.current.style.right = "0";
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    menuRef.current.style.right = "-400px";
    setIsMenuOpen(false);
  };
  const handleNavItemClick = () => {
    closeMenu(); 
  };
  const navbarVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  return (
    <nav className='navbar'>
      <Link to="/" className="logo"><BiSolidCameraMovie className="logo-icon" />  Movie App   </Link>
       <form className="search-container" onSubmit={handleSearch} >
        <input type="text" className="search-input" placeholder="Search movies..." name='search' />
        <button className="search-btn" >  <IoSearch className="search-icon" /> </button>
      </form>
      <motion.nav initial="hidden" animate="visible" variants={navbarVariants}>
         <div ref={menuRef} className='nav-menu'>
             {!isMenuOpen && <RxHamburgerMenu onClick={openMenu} className='nav-mob-open' />}
             {isMenuOpen && <IoCloseOutline onClick={closeMenu} className='nav-mob-close' />}
          <div className="nav-links">
            <Link to="/" className="nav-item"  onClick={handleNavItemClick}><b>Home</b></Link>
            <Link to="/movies/top" className="nav-item"  onClick={handleNavItemClick}><b>Top Rated</b></Link>
            <Link to="/movies/popular" className="nav-item"  onClick={handleNavItemClick}><b>Popular</b></Link>
            <Link to="/movies/upcoming" className="nav-item"  onClick={handleNavItemClick}><b>Upcoming</b></Link>
         </div>
       </div>
       </motion.nav>
    </nav>
  )
}

export default Header;