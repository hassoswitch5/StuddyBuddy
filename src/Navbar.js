// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MyNavbar = () => {
    const navbarStyle = {
        backgroundColor: '#95cde6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000
    };

    const brandStyle = {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black'
    };

    const navLinksStyle = {
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0
    };

    const navLinkStyle = {
        margin: '0 15px',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black'
    };

    const buttonStyle = {
        backgroundColor: '#2c94cc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        margin: '0 5px',
        textDecoration: 'none',
        fontWeight: 'bold'
    };

    return (
        <div style={navbarStyle}>
            <Link to="/" style={brandStyle}>
                <img
                    src="logo.png"
                    width="80"
                    height="60"
                    alt="Logo"
                    style={{ marginRight: '10px' }}
                />
                <span style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                    StudyBuddy
                </span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ul style={navLinksStyle}>
                    <li><Link to="/" style={navLinkStyle}>Home</Link></li>
                    <li><Link to="/about-us" style={navLinkStyle}>About Us</Link></li>
                    <li><a href="#ContactUs" style={navLinkStyle}>Contact Us</a></li>
                    <li><a href="#Product" style={navLinkStyle}>Product</a></li>
                </ul>
                <Link to="/signup" style={buttonStyle}>Sign Up</Link>
                <Link to="/login" style={{ ...buttonStyle, marginLeft: '10px' }}>Login</Link>
            </div>
        </div>
    );
};

export default MyNavbar;
