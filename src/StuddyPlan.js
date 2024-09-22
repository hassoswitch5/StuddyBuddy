import React, { useState } from 'react';

const StudyPlan = () => {
    const [examDates, setExamDates] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');
    const [learningStyle, setLearningStyle] = useState('');
    const [currentUnderstanding, setCurrentUnderstanding] = useState('');
    const [resources, setResources] = useState('');
    const [studyPlan, setStudyPlan] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            exam_dates: examDates,
            time_commitment: timeCommitment,
            learning_style: learningStyle,
            current_understanding: currentUnderstanding,
            resources: resources
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
                setError(null);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred while generating the study plan.');
        }
    };

    return (
        <div>
            <h2>Create Personalized Study Schedule</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Exam Dates:
                    <textarea
                        placeholder="Provide exam dates for each subject (e.g., Math: Oct 1st, Physics: Oct 3rd)"
                        value={examDates}
                        onChange={(e) => setExamDates(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Time Commitment:
                    <input
                        type="text"
                        placeholder="e.g., 2 hours/day or 10 hours/week"
                        value={timeCommitment}
                        onChange={(e) => setTimeCommitment(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Learning Style:
                    <input
                        type="text"
                        placeholder="e.g., visual, auditory, kinesthetic"
                        value={learningStyle}
                        onChange={(e) => setLearningStyle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Current Understanding:
                    <textarea
                        placeholder="e.g., comfortable with Algebra but need help with Calculus"
                        value={currentUnderstanding}
                        onChange={(e) => setCurrentUnderstanding(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Available Resources:
                    <textarea
                        placeholder="e.g., textbooks, online courses, tutors"
                        value={resources}
                        onChange={(e) => setResources(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Generate Study Plan</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {studyPlan && (
                <div>
                    <h3>Your Personalized Study Plan:</h3>
                    <pre>{studyPlan}</pre>
                </div>
            )}
        </div>
    );
};

export default StudyPlan;
