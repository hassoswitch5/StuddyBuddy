import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

const CommunityPage = () => {
    const { topic } = useParams();
    const [commentText, setCommentText] = useState('');
    const [file, setFile] = useState(null);
    const [comments, setComments] = useState([]);
    const [replyTexts, setReplyTexts] = useState({});

    useEffect(() => {
        fetchComments();
    }, [topic]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/comments/${topic}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            alert('Could not fetch comments. Please try again later.');
        }
    };

    const handleSendClick = async () => {
        const formData = new FormData();
        formData.append('topic', topic);

        if (commentText.trim() !== '') {
            formData.append('text', commentText);
        }

        if (file) {
            formData.append('file', file);
        }

        if (!commentText.trim() && !file) {
            alert('You must add either a comment or an image.');
            return;
        }

        const response = await fetch('http://localhost:5000/comments', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            setCommentText('');
            setFile(null);
            fetchComments();
        } else {
            const errorText = await response.text();
            alert(`Error adding comment: ${errorText}`);
        }
    };

    const handleReplyChange = (commentId, text) => {
        setReplyTexts((prev) => ({ ...prev, [commentId]: text }));
    };

    const handleReplySend = async (commentId) => {
        const replyText = replyTexts[commentId];
        if (!replyText || replyText.trim() === '') {
            alert('Reply cannot be empty');
            return;
        }

        const response = await fetch(`http://localhost:5000/comments/${commentId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: replyText }),
        });

        if (response.ok) {
            setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
            fetchComments();
        } else {
            const errorText = await response.text();
            alert(`Error adding reply: ${errorText}`);
        }
    };

    const handleDeleteComment = async (id) => {
        const response = await fetch(`http://localhost:5000/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchComments();
        } else {
            alert('Error deleting comment');
        }
    };

    const renderComment = (comment) => (
        <div key={comment._id} className="comment-item">
            <div className="comment-content">
                <span className="comment-text">{comment.text}</span>
                {comment.file && (
                    <div className="comment-file">
                        <img src={`http://localhost:5000${comment.file}`} alt="Uploaded" className="uploaded-image" />
                    </div>
                )}
                <button onClick={() => handleDeleteComment(comment._id)} className="delete-button">
                    Delete
                </button>
                <div className="reply-container">
                    <textarea
                        className="reply-textarea"
                        value={replyTexts[comment._id] || ''}
                        onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                        placeholder="Write a reply..."
                    />
                    <button onClick={() => handleReplySend(comment._id)} className="send-reply-button">
                        Send Reply
                    </button>
                </div>
                {comment.replies && comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="reply-item">
                        <span className="reply-text">{reply.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="CommunityPage">
            <div className="main-content">
                <h1 className="header">Community for {topic}</h1>
                <div className="comments-container">
                    {comments.map(renderComment)}
                </div>
            </div>
            <div className="input-area">
                <textarea
                    className="comment-textarea"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Type your comment here..."
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="button-container">
                    <button onClick={handleSendClick} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
