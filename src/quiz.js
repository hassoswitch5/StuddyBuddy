import React, { useState } from 'react';

// Define styles in a separate object
const styles = {
    container: {
        margin: '0 auto',
        maxWidth: '800px',
        fontFamily: 'Open Sans, sans-serif',
        textAlign: 'center',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '12px 20px',
        borderRadius: '5px',
        backgroundColor: '#1877F2',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    summary: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    quizContainer: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left', // Align quiz items to the left for readability
    },
    questionCard: {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
    },
    question: {
        margin: '0',
        fontWeight: 'bold',
    },
    option: {
        margin: '5px 0',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#e9ecef',
        cursor: 'pointer',
    },

};

function Quiz() {
    const [userInput, setUserInput] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const generatedQuiz = generateQuiz(userInput);
        setQuiz(generatedQuiz);
    };

    const generateQuiz = (inputText) => {
        const sentences = inputText.split('. ').filter(sentence => sentence.trim() !== '');

        return sentences.map((sentence, index) => {
            const words = sentence.split(' ');
            const importantWords = words.filter(word => word.length > 3);

            return {
                question: `What is the main point of the sentence: "${sentence.trim()}"?`,
                options: importantWords.length > 0 ? importantWords.slice(0, 3) : ['Option 1', 'Option 2', 'Option 3'],
                answer: importantWords[0] || 'Option 1',
            };
        });
    };



    return (
        <div style={styles.container}>
            <h1>QuizBuddy</h1>
            <textarea
                style={styles.textarea}
                rows="12"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter text here..."
            />
            <button onClick={handleSubmit} disabled={loading} style={styles.button}>
                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>


            {quiz.length > 0 && (
                <div style={styles.quizContainer}>
                    <h2>Your Quiz</h2>
                    {quiz.map((q, index) => (
                        <div key={index} style={styles.questionCard}>
                            <p style={styles.question}>{q.question}</p>
                            <ul>
                                {q.options.map((option, idx) => (
                                    <li key={idx} style={styles.option}>{option}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Quiz;
