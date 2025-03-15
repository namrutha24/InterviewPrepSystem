import React, { useState } from 'react';
import TestPage from './TestPage';
import './App.css';

function App() {
  const [isLoginView, setIsLoginView] = useState(false); // Toggle between Sign Up and Login views
  const [isLoggedIn, setIsLoggedIn] = useState(false);   // Track if user is logged in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For Sign Up only

  const handleToggle = () => {
    setIsLoginView(!isLoginView); // Switch views without logging in
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      alert(`Logging in with Email: ${email}`);
    } else {
      alert(`Signing up with Username: ${username}, Email: ${email}`);
    }
    setIsLoggedIn(true); // Redirect to TestPage after submission
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