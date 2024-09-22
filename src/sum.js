import React, { useState } from 'react';
import axios from 'axios';
import './Summarize.css'; // Import your CSS file for styling

const Summarize = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset any previous errors

        try {
            const response = await axios.post('http://localhost:5000/summarize-text', { text });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error summarizing text:', error);
            setError('Failed to summarize text. Please try again.');
        }
    };

    return (
        <div className="summarize-container">
            <br></br>
            <br></br>
            <h1>Text Summarization</h1>
            <form onSubmit={handleSubmit} className="summarize-form">
            <br></br>
            <br></br>
            <br></br>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here..."
                                    rows="12"
                cols="170"
                    className="summarize-textarea"
                />
                            <br></br>
                            <br></br>
                <button type="submit" className="summarize-button">Summarize</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {summary && (
                <div className="summary-output">
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default Summarize;
