import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './community.css';

const CommunityPage = () => {
    const { topic } = useParams();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isCommentAreaVisible, setCommentAreaVisible] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchComments();
    }, [topic]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/comments/${topic}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleSendClick = async () => {
        if (commentText.trim() === '' && !file) {
            alert('Comment cannot be empty');
            return;
        }

        const formData = new FormData();
        formData.append('topic', topic);
        formData.append('text', commentText);
        if (file) formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/comments', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            fetchComments(); // Refresh comments after adding a new one
            setCommentText('');
            setFile(null);
            setCommentAreaVisible(false);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleReplyClick = (index) => {
        setReplyingTo(index);
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

    const handleDeleteCommentClick = async (index) => {
        const commentId = comments[index]._id;
        try {
            const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            fetchComments(); // Refresh comments after deletion
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleReplySendClick = async () => {
        if (commentText.trim() === '' && !file) {
            alert('Reply cannot be empty');
            return;
        }

        if (replyingTo === null || replyingTo < 0 || replyingTo >= comments.length) {
            console.error("Invalid reply target:", replyingTo);
            alert('Invalid reply target');
            return;
        }

        const commentId = comments[replyingTo]._id; // Make sure this is defined
        const formData = new FormData();
        formData.append('commentId', commentId);
        formData.append('text', commentText);
        if (file) formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/comments/reply', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to add reply');
            }
            setCommentText('');
            setFile(null);
            setCommentAreaVisible(false);
            fetchComments(); // Refresh comments after adding a reply
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const toggleRepliesVisibility = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].showReplies = !updatedComments[index].showReplies;
        setComments(updatedComments);
    };

    const renderComment = (comment, index) => (
        <div key={comment._id} className="comment-item">
            <div className="comment-content">
                <div className="comment-container">
                    <div className="comment-text" onClick={() => toggleRepliesVisibility(index)}>
                        {comment.text}
                    </div>
                    {comment.file && (
                        <div className="comment-file">
                            <img
                                src={comment.file}
                                alt="Uploaded"
                                className="uploaded-image"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="button-container">
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

    const renderReply = (reply, parentIndex, replyIndex) => (
        <div key={`${parentIndex}-${replyIndex}`} className="reply-item">
            <div className="reply-container">
                <span className="reply-text">{reply.text}</span>
                {reply.file && (
                    <div className="reply-file">
                        <img
                            src={reply.file}
                            alt="Reply Image"
                            className="uploaded-image"
                        />
                    </div>
                )}
            </div>
            <div className="button-container">
                <button onClick={() => handleDeleteCommentClick(parentIndex)} className="delete-reply-button">
                    Delete Reply
                </button>
            </div>
        </div>
    );

    return (
        <div className="CommunityPage">
            <div className="main-content">
                <h1 className="header">
                    Community for {topic}
                    <button onClick={() => setCommentAreaVisible(true)} className="comment-input-button">
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
                        <button onClick={() => document.getElementById('file-input').click()} className="file-upload-button">
                            +
                        </button>
                        <button onClick={replyingTo !== null ? handleReplySendClick : handleSendClick} className="send-button">
                            {replyingTo !== null ? 'Send Reply' : 'Send'}
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

