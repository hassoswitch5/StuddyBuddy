// ko/TopicsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicsPage = () => {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const navigate = useNavigate();

    const handleAddTopic = () => {
        if (newTopic.trim()) {
            setTopics([...topics, newTopic]);
            setNewTopic('');
        }
    };

    const handleTopicClick = (topic) => {
        navigate(`/community/${topic}`);
    };

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

    const buttonStyle = {
        marginTop: '20px',
        fontSize: '20px',
        backgroundColor: '#2c94cc',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'inline-block'
    };

    const topicButtonStyle = {
        margin: '10px',
        fontSize: '18px',
        backgroundColor: '#e0f7fa',
        color: '#00796b',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'inline-block'
    };

    return (
        <div className="TopicsPage" style={gradientStyle}>
            <div style={mainContentStyle}>
                <h1 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '60px' }}>
                    Topics
                </h1>
                <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter new topic"
                    style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <button onClick={handleAddTopic} style={buttonStyle}>
                    Add Topic
                </button>
                <div>
                    {topics.map((topic, index) => (
                        <button key={index} onClick={() => handleTopicClick(topic)} style={topicButtonStyle}>
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopicsPage;
