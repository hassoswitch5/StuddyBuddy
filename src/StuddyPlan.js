import React, { useState } from 'react';
import "./StuddyBuddy.css";

const StudyPlanGenerator = () => {
    const [examDates, setExamDates] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');
    const [learningStyle, setLearningStyle] = useState('');
    const [currentUnderstanding, setCurrentUnderstanding] = useState('');
    const [resources, setResources] = useState('');
    const [studyPlan, setStudyPlan] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const requestData = {
            exam_dates: examDates,
            time_commitment: timeCommitment,
            learning_style: learningStyle,
            current_understanding: currentUnderstanding,
            resources: resources,
        };

        try {
            const response = await fetch('http://localhost:5000/generate-personalized-study-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                setStudyPlan(result.study_plan);
            } else {
                setError(result.error || 'Something went wrong');
            }
        } catch (error) {
            setError('Failed to generate study plan. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="study-plan-container">
            <h2>Personalized Study Plan Generator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Exam Dates:</label>
                    <textarea
                        value={examDates}
                        onChange={(e) => setExamDates(e.target.value)}
                        placeholder="e.g., Math: October 10, Science: October 12"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time Commitment:</label>
                    <input
                        type="text"
                        value={timeCommitment}
                        onChange={(e) => setTimeCommitment(e.target.value)}
                        placeholder="e.g., 2 hours/day"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Learning Style:</label>
                    <input
                        type="text"
                        value={learningStyle}
                        onChange={(e) => setLearningStyle(e.target.value)}
                        placeholder="e.g., visual, auditory, kinesthetic"
                    />
                </div>
                <div className="form-group">
                    <label>Current Understanding:</label>
                    <textarea
                        value={currentUnderstanding}
                        onChange={(e) => setCurrentUnderstanding(e.target.value)}
                        placeholder="e.g., Good with Algebra, need help with Calculus"
                    />
                </div>
                <div className="form-group">
                    <label>Available Resources:</label>
                    <textarea
                        value={resources}
                        onChange={(e) => setResources(e.target.value)}
                        placeholder="e.g., Textbooks, online videos"
                    />
                </div>
                <button type="submit" className="submit-button">Generate Study Plan</button>
            </form>

            {loading && <p>Generating your study plan...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {studyPlan && (
                <div className="study-plan-result">
                    <h3>Your Personalized Study Plan:</h3>
                    <pre>{studyPlan}</pre>
                </div>
            )}
        </div>
    );
};

export default StudyPlanGenerator;
