

import React, { useState } from 'react';
import {blue} from "@mui/material/colors";


const summarizeText = (text) => {
    const sentences = text.split('.').filter(sentence => sentence.length > 0);
    const wordFrequency = {};


    sentences.forEach(sentence => {
        const words = sentence.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (word.length > 0) {
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            }
        });
    });


    const sentenceScores = sentences.map(sentence => {
        const words = sentence.toLowerCase().split(/\s+/);
        const score = words.reduce((acc, word) => acc + (wordFrequency[word] || 0), 0);
        return { sentence, score };
    });


    sentenceScores.sort((a, b) => b.score - a.score);
    const topSentences = sentenceScores.slice(0, 3).map(item => item.sentence); // Adjust number of sentences as needed

    return topSentences.join('. ') + '.';
};


const Summarize = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSummarize = () => {
        setLoading(true);
        setError('');
        try {
            const summarized = summarizeText(text);
            setSummary(summarized);
        } catch (err) {
            setError('Failed to summarize text.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={div}>
            <h1>SummBuddy</h1>
            <textarea

                rows="12"
                cols="170"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
            />
            <br/><br/>

            <button onClick={handleSummarize} disabled={loading} style={div2}>
                {loading ? 'Summarizing...' : 'Summarize'}
            </button>
            <div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {summary && (
                    <div>
                        <h2>Summary</h2>
                        <p>{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
const div = {
    margin: '0 20px',
    fontFamily: 'Open Sans, sans-serif',
    textAlign : "center"

};
const div2 = {
    padding:' 12px 10px' ,
    shape : 'circle',
    backgroundColor: "#1877F2",
  
};


export default Summarize;
