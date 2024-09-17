import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
const CommunityPage = () => {
  const { topic } = useParams();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
     //{ text: `Are you eager to study ${topic}?`, replies: [], showReplies: false },
     // { text: `What do you know about ${topic}?`, replies: [], showReplies: false },
  ]);
  const [usefulStates, setUsefulStates] = useState({});
  const [isCommentAreaVisible, setCommentAreaVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [file, setFile] = useState(null);
  const handleSendClick = () => {
    if (commentText.trim() === '' && !file) {
      alert('Comment cannot be empty');
      return;
    }
    if (replyingTo !== null) {
      if (commentText.trim() === '' && !file) {
        alert('Reply cannot be empty');
        return;
      }
      const updatedComments = [...comments];
      updatedComments[replyingTo].replies.push({
        text: commentText,
        file,
      });
      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      setComments([
        ...comments,
        { text: commentText, file, replies: [], showReplies: false },
      ]);
    }
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(false);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUsefulClick = (index) => {
    setUsefulStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleReplyClick = (index) => {
    setReplyingTo(index);
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(true);
  };
  const handleWritePostClick = () => {
    setReplyingTo(null);
    setCommentText('');
    setFile(null);
    setCommentAreaVisible(true);
  };
  const handleCloseClick = () => {
    setCommentAreaVisible(false);
    setReplyingTo(null);
    setCommentText('');
    setFile(null);
  };
  const handleDeleteCommentClick = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };
  const toggleRepliesVisibility = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].showReplies = !updatedComments[index].showReplies;
    setComments(updatedComments);
  };
  const renderComment = (comment, index) => (
    <div key={index} className="comment-item">
      <div className="comment-content">
        <button
          className="comment-button"
          onClick={() => toggleRepliesVisibility(index)}
        >
          {comment.text}
        </button>
        {comment.file && (
          <div className="comment-file">
            <div className="file-link">
              <a href={URL.createObjectURL(comment.file)} target="_blank" rel="noopener noreferrer">
                Open {comment.file.name}
              </a>
            </div>
          </div>
        )}
        <button
          onClick={() => handleUsefulClick(index)}
          className={`useful-button ${usefulStates[index] ? 'active' : ''}`}
          style={{
            backgroundColor: usefulStates[index] ? '#2c94cc' : 'initial',
            color: usefulStates[index] ? 'white' : 'black',
          }}
        >
          useful
        </button>
        <button
          onClick={() => handleReplyClick(index)}
          className="reply-button"
        >
          reply
        </button>
        <button
          onClick={() => handleDeleteCommentClick(index)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
      {comment.showReplies && (
        <div className="replies-container">
          {comment.replies.map((reply, replyIndex) =>
            renderComment({ text: reply.text, file: reply.file, replies: [] }, `${index}-${replyIndex}`)
          )}
        </div>
      )}
    </div>
  );
  const handleFileButtonClick = () => {
    document.getElementById('file-input').click();
  };
  return (
    <div className="CommunityPage">
      <div className="main-content">
        <h1 className="header">Community for {topic}</h1>
        <button
          onClick={handleWritePostClick}
          className="comment-input-button"
        >
          Write your post
        </button>
        <div className="comments-container">
          {comments.map((comment, index) => renderComment(comment, index))}
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
                onClick={handleFileButtonClick}
                className="file-upload-button"
              >
                +
              </button>
              <button
                onClick={handleSendClick}
                className="send-button"
              >
                Send
              </button>
              <button
                onClick={handleCloseClick}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommunityPage;