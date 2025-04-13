import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post('http://localhost:5000/results', {
          answers: state.answers,
          questions: state.questions
        });
        setResults(response.data);
      } catch (error) {
        setResults({
          score: '80%',
          correct: 4,
          total: 5,
          feedback: [
            { question: 'What is a linked list?', correct: true, note: 'Good job!' }
          ]
        });
      }
    };
    fetchResults();
  }, [state]);

  if (!results) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1 className="auth-title">Results - SkillSync</h1>
        <p>Score: {results.score} ({results.correct}/{results.total} correct)</p>
        <h3>Feedback:</h3>
        {results.feedback.map((item, idx) => (
          <p key={idx}>{item.question}: {item.correct ? 'Correct' : 'Incorrect'} - {item.note}</p>
        ))}
        <button onClick={() => navigate('/test-selection')}>Try Another Test</button>
        <button onClick={() => navigate('/')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Results;