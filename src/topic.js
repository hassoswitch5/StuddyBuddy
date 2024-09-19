import React from 'react';

const Topic = ({ topic, onDelete, onClick }) => {
    const topicButtonStyle = {
        flex: 1,
        margin: '10px',
        fontSize: '18px',
        backgroundColor: '#e0f7fa',
        color: '#00796b',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const deleteButtonStyle = {
        marginLeft: '10px',
        fontSize: '16px',
        backgroundColor: '#ff5252',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '5px 10px',
        cursor: 'pointer',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => onClick(topic)} style={topicButtonStyle}>
                {topic}
            </button>
            <button onClick={() => onDelete(topic)} style={deleteButtonStyle}>
                Delete
            </button>
        </div>
    );
};

export default Topic;
