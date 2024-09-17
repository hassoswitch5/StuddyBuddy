import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
const CommunityPage = () => {
  const { topic } = useParams();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    //{ text: `Are you eager to study ${topic}?`, replies: [], showReplies: false },
    //{ text: `What do you know about ${topic}?`, replies: [], showReplies: false },
  ]);
  const [usefulStates, setUsefulStates] = useState({});
  const [isCommentAreaVisible, setCommentAreaVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSendClick = () => {
    if (commentText.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    if (replyingTo !== null) {
      if (commentText.trim() === '') {
        alert('Reply cannot be empty');
        return;
      }
      const updatedComments = [...comments];
      updatedComments[replyingTo].replies.push(commentText);
      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      setComments([...comments, { text: commentText, replies: [], showReplies: false }]);
    }
    setCommentText('');
    setCommentAreaVisible(false);
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
    setCommentAreaVisible(true);
  };
  const handleWritePostClick = () => {
    setReplyingTo(null);
    setCommentText('');
    setCommentAreaVisible(true);
  };
  const handleCloseClick = () => {
    setCommentAreaVisible(false);
    setReplyingTo(null);
    setCommentText('');
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
      </div>
      {comment.showReplies && (
        <div className="replies-container">
          {comment.replies.map((reply, replyIndex) => renderComment({ text: reply, replies: [] }, `${index}-${replyIndex}`))}
        </div>
      )}
    </div>
  );
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
        )}
      </div>
    </div>
    
  );
};
export default CommunityPage;