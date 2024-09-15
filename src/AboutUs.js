import React from 'react';
import { mainContentStyle, textStyle, imageStyle } from './styles';

const AboutUs = () => {
    return (
        <div style={mainContentStyle}>
            <div style={textStyle}>
                <h2>About Us</h2>
                <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    Welcome to StuddyBuddy! We are a passionate team dedicated to helping students achieve their academic goals. Our platform provides a supportive community and useful tools to enhance your study habits and productivity.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    Our mission is to create a space where students can collaborate, share resources, and stay motivated. Whether you're looking to organize your study schedule, find study partners, or simply get inspired, StuddyBuddy is here to help.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    Thank you for being a part of our community. We look forward to supporting you on your academic journey!
                </p>
            </div>

            <div style={imageStyle}>
                <img src='team.jpg' alt='Our Team' style={{ width: '75%', maxWidth: '500px', height: 'auto' }}/>
            </div>
        </div>
    );
};

export default AboutUs;
