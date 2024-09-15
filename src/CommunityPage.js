import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
const CommunityPage = () => {
  const { topic } = useParams();
  const gradientStyle = {
    background: '#a2d3e9',
    height: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
  };
  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
  };
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
  `Are you eager to study ${topic}`,
  `what do you know about ${topic}`,
  ]);
  const [usefulStates, setUsefulStates] = useState({});

  const handleSendClick = () => {
    if (commentText.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
    setComments([...comments, commentText]);
    setCommentText('');
  };

  const handleUsefulClick = (index) => {
    setUsefulStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="CommunityPage" style={gradientStyle}>
      <div style={mainContentStyle}>
        <h1 style={{ fontWeight: 'bold', fontSize: '60px' }}>
          Community for {topic}
        </h1>
        <div className="comments-container">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <button className="comment-button">
                {comment}
              </button>
              <button
                onClick={() => handleUsefulClick(index)}
                className="useful-button"
                style={{
                  backgroundColor: usefulStates[index] ? '#2c94cc' : 'initial',
                  color: usefulStates[index] ? 'black' : 'black',
                }}
              >
                useful
              </button>
            </div>
          ))}
        </div>
        <div className="comment-area-container">
          <textarea
            className="comment-textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment here..."
          />
          <button
            onClick={handleSendClick}
            className="send-button"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommunityPage;