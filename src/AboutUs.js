import React from 'react';
import '../src/aboutus.css';
// import { mainContentStyle, textStyle, imageStyle } from './styles';

const AboutUs = () => {
    return (
        <div className='aboutus'>
            <table>
                <tr>
                    <td>
            <div >
                <h2>About Us</h2>
                <b>
                <p>
                    Welcome to StuddyBuddy! We are a passionate team dedicated to helping students achieve their academic goals. Our platform provides a supportive community and useful tools to enhance your study habits and productivity.
                </p>
                <p>
                    Our mission is to create a space where students can collaborate, share resources, and stay motivated. Whether you're looking to organize your study schedule, find study partners, or simply get inspired, StuddyBuddy is here to help.
                </p>
                <p>
                    Thank you for being a part of our community. We look forward to supporting you on your academic journey!
                </p>
                </b>
            </div>
            </td>
            <td>
            <div>
                <img src='team.jpg' alt='Our Team'/>
            </div>
            </td>
            </tr>
            </table>
        </div>
    );
};

export default AboutUs;
