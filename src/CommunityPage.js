import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Importing the styling
import './index.css';

const CommunityPage = () => {
  const { topic } = useParams();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [usefulStates, setUsefulStates] = useState({});
  const [isCommentAreaVisible, setCommentAreaVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [file, setFile] = useState(null);

  // Handle sending comment or reply
  const handleSendClick = () => {
    if (commentText.trim() === '' && !file) {
      alert('Comment cannot be empty');
      return;
    }

    const updatedComments = [...comments];
    if (replyingTo !== null) {
      if (commentText.trim() === '' && !file) {
        alert('Reply cannot be empty');
        return;
      }
      updatedComments[replyingTo].replies.push({ text: commentText, file });
      setReplyingTo(null);
    } else {
      updatedComments.push({
        text: commentText,
        file,
        replies: [],
        showReplies: false,
      });
    }

    setComments(updatedComments);
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(false);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle marking comments as useful
  const handleUsefulClick = (index) => {
    setUsefulStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle reply functionality
  const handleReplyClick = (index) => {
    setReplyingTo(index);
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(true);
  };

  // Handle opening the comment area
  const handleWritePostClick = () => {
    setReplyingTo(null);
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(true);
  };

  // Handle closing the comment area
  const handleCloseClick = () => {
    setCommentAreaVisible(false);
    setReplyingTo(null);
    setCommentText('');
    setFile(null);
  };

  // Handle deleting comments or replies
  const handleDeleteCommentClick = (index, isReply = false, replyIndex = null) => {
    const updatedComments = [...comments];
    if (isReply && replyIndex !== null) {
      updatedComments[index].replies.splice(replyIndex, 1);
    } else {
      updatedComments.splice(index, 1);
    }
    setComments(updatedComments);
  };

  // Toggle visibility of replies
  const toggleRepliesVisibility = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].showReplies = !updatedComments[index].showReplies;
    setComments(updatedComments);
  };

  // Render each comment
  const renderComment = (comment, index) => (
    <div key={index} className="comment-item">
      <div className="comment-content">
        <div className="comment-container">
          {comment.file && (
            <div className="comment-file" onClick={() => toggleRepliesVisibility(index)}>
              {comment.file.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(comment.file)} 
                  alt={comment.file.name} 
                  className="uploaded-image" 
                  onClick={() => toggleRepliesVisibility(index)} // Click handler for image
                />
              ) : (
                <a 
                  href={URL.createObjectURL(comment.file)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggling replies when clicking the link
                    toggleRepliesVisibility(index);
                  }}
                >
                  Open {comment.file.name}
                </a>
              )}
            </div>
          )}
          <div className="comment-text" onClick={() => toggleRepliesVisibility(index)}>
            {comment.text}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={() => handleUsefulClick(index)}
          className={`useful-button ${usefulStates[index] ? 'active' : ''}`}
          style={{
            backgroundColor: usefulStates[index] ? '#2c94cc' : 'initial',
            color: 'black',
          }}
        >
          useful
        </button>
        <button onClick={() => handleReplyClick(index)} className="reply-button">
          reply
        </button>
        <button onClick={() => handleDeleteCommentClick(index)} className="delete-button">
          Delete
        </button>
      </div>
  
      {comment.showReplies && (
        <div className="replies-container">
          {comment.replies.map((reply, replyIndex) => renderReply(reply, index, replyIndex))}
        </div>
      )}
    </div>
  );
  

  // Helper function to render replies
  const renderReply = (reply, parentIndex, replyIndex) => (
    <div key={`${parentIndex}-${replyIndex}`} className="reply-item">
      <div className="reply-container">
        {reply.file && (
          <div className="reply-file">
            {reply.file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(reply.file)} alt={reply.file.name} className="uploaded-image" />
            ) : (
              <a href={URL.createObjectURL(reply.file)} target="_blank" rel="noopener noreferrer">
                Open {reply.file.name}
              </a>
            )}
          </div>
        )}
        <span className="reply-text">{reply.text}</span>
      </div>
      <div className="button-container">
        <button
          onClick={() => handleUsefulClick(`${parentIndex}-${replyIndex}`)}
          className={`useful-button ${usefulStates[`${parentIndex}-${replyIndex}`] ? 'active' : ''}`}
          style={{
            backgroundColor: usefulStates[`${parentIndex}-${replyIndex}`] ? '#2c94cc' : 'initial',
            color: usefulStates[`${parentIndex}-${replyIndex}`] ? 'white' : 'black',
          }}
        >
          useful
        </button>
        <button onClick={() => handleDeleteCommentClick(parentIndex, true, replyIndex)} className="delete-reply-button">
          Delete Reply
        </button>
      </div>
    </div>
  );

  // Render the component
  return (
    <div className="CommunityPage">
      <div className="main-content">
        <h1 className="header">
          Community for {topic}
          <button onClick={handleWritePostClick} className="comment-input-button">
            Write your post
          </button>
        </h1>
      </div>
      {isCommentAreaVisible && (
        <div className="comment-area-container">
          <textarea
            className="comment-textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment here..."
          />
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="button-container">
            <button
              onClick={() => document.getElementById('file-input').click()}
              className="file-upload-button"
            >
              +
            </button>
            <button onClick={handleSendClick} className="send-button">
              Send
            </button>
            <button onClick={handleCloseClick} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
      {comments.length > 0 && !isCommentAreaVisible && (
        <div className="comments-container" style={{ height: '430px', overflowY: 'auto' }}>
          {comments.map((comment, index) => renderComment(comment, index))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;