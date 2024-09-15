// src/CommunityPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'
const CommunityPage = () => {
  const { topic } = useParams();

  const gradientStyle = {
    background: 'linear-gradient(to right, #a2d3e9, #ffffff)',
    height: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column'
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px'
  };

  const [commentText, setCommentText] = useState('');
  const handleSendClick = () => {
    alert('Comment sent: ' + commentText);
    setCommentText('');
  };
  const comments = [
    "This is the first comment.",
    "This is the second comment."
  ];

  return (
    <div className="CommunityPage" style={gradientStyle}>
      <div style={mainContentStyle}>
        <h1 style={{ fontWeight: 'bold', fontSize: '60px' }}>
          Community for {topic}
        </h1>
        {comments.map((comment, index) => (
          <div key={index} className="comment-container">
            <button className="comment-button">
              {comment}
            </button>
            <button className="useful-button">Useful</button>
          </div>
        ))}
        <div className="comment-area-container">
          <textarea
            className="comment-textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment here..."
          />
          <button className="send-button" onClick={handleSendClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
