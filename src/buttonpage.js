// Page.js
import React from 'react';
import './Buttonpage.css';
import { FaRegFileAlt, FaQuestionCircle, FaCogs, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link

const Page = () => {
    const cardData = [
        { title: "Text-Summarizer", text: "Instantly Summarize Text with Our AI-Powered Tool!", icon: <FaRegFileAlt />, link: "/sum" },
        { title: "AI Quiz Generator", text: "Transform Text into Quizzes Instantly with Our AI Quiz Generator!", icon: <FaQuestionCircle />, link: "/Quiz" },
        { title: "Studying Community", text: "Connect, Share, and Grow with Our Engaging Studying Community!", icon: <FaCogs />, link: "/topics" },
        { title: "To do List", text: "Stay Organized and Achieve More with Our Simple To-Do List Tool!", icon: <FaChartBar />, link: "/todo-list" }
    ];

    return (
        <div className="pageContainer">
            {cardData.map((card, index) => (
                <div className="cardContainer" key={index}>
                    <div className="iconContainer">
                        {card.icon}
                    </div>
                    <h3 className="cardTitle">{card.title}</h3>
                    <p className="cardText">{card.text}</p>
                    <Link to={card.link}>
                        <button className="cardButton">Learn More</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Page;
