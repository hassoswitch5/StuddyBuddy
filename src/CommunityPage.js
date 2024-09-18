import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Importing the styling
import './index.css';
const CommunityPage = () => {
  // Extract the topic parameters
  const { topic } = useParams();
  // Manage the text of the comment being typed
  const [commentText, setCommentText] = useState('');
  // Store the list of comments and their replies
  const [comments, setComments] = useState([]);
  // Track which comments have been marked as useful
  const [usefulStates, setUsefulStates] = useState({});
  // Control visibility of the comment area
  const [isCommentAreaVisible, setCommentAreaVisible] = useState(false);
  // Which comment is being replied to
  const [replyingTo, setReplyingTo] = useState(null);
  // Manage file uploads with comments
  const [file, setFile] = useState(null)
  // Handle sending comment or reply
  const handleSendClick = () => {
    if (commentText.trim() === '' && !file) {
      // Ensure comments are not empty
      alert('Comment cannot be empty');
      return;
    }
    const updatedComments = [...comments];
    // Check if replying to an existing comment
    if (replyingTo !== null) {
      // Ensure replies are not empty
      if (commentText.trim() === '' && !file) {
        alert('Reply cannot be empty');
        return;
      }
      // Push the reply into the correct comment's replies array
      updatedComments[replyingTo].replies.push({
        text: commentText,
        file,
      });
      setReplyingTo(null);
    } else {
      updatedComments.push({
        text: commentText,
        file,
        replies: [],
        showReplies: false,
      });
    }
    // Update state with new comments
    setComments(updatedComments);
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
  const handleDeleteCommentClick = (index, isReply = false, replyIndex = null) => {
    const updatedComments = [...comments];
    if (isReply && replyIndex !== null) {
      updatedComments[index].replies.splice(replyIndex, 1);
    } else {
      updatedComments.splice(index, 1);
    }
    setComments(updatedComments);
  };
  const toggleRepliesVisibility = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].showReplies = !updatedComments[index].showReplies;
    setComments(updatedComments);
  };
//buttons
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
            color: 'black',
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
          {comment.replies.map((reply, replyIndex) => (
            <div key={`${index}-${replyIndex}`} className="reply-item">
              <div className="reply-background">
                <span>{reply.text}</span>
              </div>
              <div className="reply-actions">
                {reply.file && (
                  <div className="reply-file">
                    <div className="file-link">
                      <a href={URL.createObjectURL(reply.file)} target="_blank" rel="noopener noreferrer">
                        Open {reply.file.name}
                      </a>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => handleUsefulClick(`${index}-${replyIndex}`)}
                  className={`useful-button ${usefulStates[`${index}-${replyIndex}`] ? 'active' : ''}`}
                  style={{
                    backgroundColor: usefulStates[`${index}-${replyIndex}`] ? '#2c94cc' : 'initial',
                    color: usefulStates[`${index}-${replyIndex}`] ? 'white' : 'black',
                  }}
                >
                  useful
                </button>
                <button
                  onClick={() => handleDeleteCommentClick(index, true, replyIndex)}
                  className="delete-reply-button"
                >
                  Delete Reply
                </button>
              </div>
            </div>
          ))}
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