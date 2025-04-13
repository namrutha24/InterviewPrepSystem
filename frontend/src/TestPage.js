import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function TestPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds

  // Check if state is null or missing required properties
  if (!state || !state.field || !state.company || !state.mode) {
    console.error('Invalid state in TestPage:', state);
    return (
      <div className="app-container">
        <div className="auth-card">
          <h1 className="auth-title">Error - SkillSync</h1>
          <p>No test configuration provided. Please select a test from the Test Selection page.</p>
          <button onClick={() => navigate('/test-selection')}>Go to Test Selection</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    console.log('TestPage mounted, state:', state); // Debug
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions from:', 'http://localhost:5000/questions', 'with params:', {
          field: state.field,
          company: state.company
        });
        const response = await axios.get('http://localhost:5000/questions', {
          params: { field: state.field, company: state.company }
        });
        console.log('Questions fetched:', response.data); // Debug
        setQuestions(response.data);
      } catch (error) {
        console.error('Fetch error:', error.message); // Debug
        setQuestions([
          { id: 1, text: 'What is a linked list?', options: ['A', 'B', 'C', 'D'], correct: 'B' }
        ]);
      }
    };
    fetchQuestions();

    if (state.mode === 'Timed') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, { questionId: questions[currentQuestion].id, answer }]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', { state: { answers, questions } });
    }
  };

  console.log('Rendering with questions:', questions); // Debug
  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1 className="auth-title">Test - SkillSync</h1>
        {state.mode === 'Timed' && <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>}
        <p>Question {currentQuestion + 1}/{questions.length}: {questions[currentQuestion].text}</p>
        {questions[currentQuestion].options.map((opt) => (
          <button key={opt} onClick={() => handleAnswer(opt)}>{opt}</button>
        ))}
        <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Quit Test</button>
      </div>
    </div>
  );
}

export default TestPage;