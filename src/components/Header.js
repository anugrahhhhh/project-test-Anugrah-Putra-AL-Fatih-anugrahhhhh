import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar fixed-top ${show ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/suitmedia1.png" alt="Suitmedia Logo" className="logo me-2" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink to="/" className="nav-link">Work</NavLink></li>
            <li className="nav-item"><NavLink to="/about" className="nav-link">About</NavLink></li>
            <li className="nav-item"><NavLink to="/services" className="nav-link">Services</NavLink></li>
            <li className="nav-item"><NavLink to="/ideas" className="nav-link">Ideas</NavLink></li>
            <li className="nav-item"><NavLink to="/careers" className="nav-link">Careers</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
