import React, { useState } from 'react';
import axios from 'axios';
import './Quizz.css'; // Import a CSS file for styles

const Quiz = () => {
    const [text, setText] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset any previous errors

        try {
            const response = await axios.post('http://localhost:5000/generate-quiz', { text });
            setQuiz(response.data);
        } catch (error) {
            console.error('Error generating quiz:', error);
            setError('Failed to generate quiz. Please try again.');
        }
    };

    return (
        <div className="quiz-container">
            <h1>Quiz Generator</h1>
            <form onSubmit={handleSubmit} className="quiz-form">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here..."
                    rows="4"
                    cols="50"
                    className="quiz-textarea"
                />
                <button type="submit" className="quiz-button">Generate Quiz</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {quiz.length > 0 && (
                <div className="quiz-output">
                    <h2>Generated Quiz</h2>
                    <ul className="quiz-list">
                        {quiz.map((question, index) => (
                            <li key={index} className="quiz-item">{question}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Quiz;
