import React, { useState } from 'react';
import axios from 'axios';
import TestPage from './TestPage';
import './App.css';

function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleToggle = () => {
    setIsLoginView(!isLoginView);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginView
      ? 'http://localhost:5000/login'
      : 'http://localhost:5000/signup';
    const data = isLoginView
      ? { email, password }
      : { username, email, password };

    try {
      const response = await axios.post(url, data);
      localStorage.setItem('token', response.data.token); // Store token
      setIsLoggedIn(true); // Redirect to TestPage
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  if (isLoggedIn) {
    return <TestPage />;
  }

  return (
    <div className="login-container">
      <div className={`auth-card ${isLoginView ? 'slide-up' : ''}`}>
        <h1 className="auth-title">{isLoginView ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginView && (
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLoginView ? 'Login' : 'Create Account'}
          </button>
          <p className="auth-toggle" onClick={handleToggle}>
            {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;