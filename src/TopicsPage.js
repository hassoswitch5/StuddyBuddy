import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/topicspage.css';
import Topic from './topic';

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

    return (
        <div className="TopicsPage">
            <div>
                <h1>
                    Topics
                </h1>
                <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter new topic"
                    className='input'
                />
                <button onClick={handleAddTopic} className='buttonStyle'>
                    Add Topic
                </button>
                {message && <div>{message}</div>}
                <div className='topicContainerStyle'>
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