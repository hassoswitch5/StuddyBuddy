import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topic from './topic'; // Import the Topic component

const TopicsPage = () => {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/topics');
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
                setMessage('Error fetching topics');
            }
        };
        fetchTopics();
    }, []);

    const handleAddTopic = async () => {
        if (!newTopic.trim()) {
            setMessage('Please enter a topic');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/topic/add', { topic: newTopic });
            setMessage(response.data.message);
            setTopics((prevTopics) => [...prevTopics, { topic: newTopic }]);
            setNewTopic('');
        } catch (error) {
            console.error('Error adding topic:', error);
            setMessage('Error adding topic');
        }
    };

    const handleDeleteTopic = async (topicName) => {
        try {
            const response = await axios.delete(`http://localhost:5000/topic/${topicName}`);
            setMessage(response.data.message);
            setTopics((prevTopics) => prevTopics.filter((topic) => topic.topic !== topicName));
        } catch (error) {
            console.error('Error deleting topic:', error);
            setMessage('Error deleting topic');
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

    const buttonStyle = {
        marginTop: '20px',
        fontSize: '20px',
        backgroundColor: '#2c94cc',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const topicContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
        width: '100%',
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
                {message && <div style={{ marginTop: '10px', fontSize: '16px', color: '#2c94cc' }}>{message}</div>}
                <div style={topicContainerStyle}>
                    {topics.map((topicObj, index) => (
                        <Topic
                            key={index}
                            topic={topicObj.topic}
                            onClick={handleTopicClick}
                            onDelete={handleDeleteTopic}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopicsPage;
