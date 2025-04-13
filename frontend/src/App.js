import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import TestPage from './TestPage';
import TestSelection from './TestSelection';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start as false
  const [isLoginView, setIsLoginView] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Only set true if token exists
    }
  }, []); // Run once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginView ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
    const data = isLoginView ? { email, password } : { username, email, password };
    console.log('Sending to:', url, 'with:', data);
    try {
      const response = await axios.post(url, data);
      console.log('Success:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setUsername(''); setEmail(''); setPassword('');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="app-container">
          <div className="auth-card">
            <h1 className="auth-title">{isLoginView ? 'Login - SkillSync' : 'Sign Up - SkillSync'}</h1>
            <form onSubmit={handleSubmit}>
              {!isLoginView && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLoginView}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">{isLoginView ? 'Login' : 'Create Account'}</button>
            </form>
            <p onClick={() => setIsLoginView(!isLoginView)}>
              {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </p>
          </div>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/test-selection" />} />
            <Route path="/test-selection" element={<TestSelection />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/test-selection" />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;