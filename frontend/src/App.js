import React, { useState } from 'react';
import TestPage from './TestPage';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For Sign Up

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in with Email: ${email}`);
    } else {
      alert(`Signing up with Username: ${username}, Email: ${email}`);
    }
    setIsLogin(true); // Simulate login success after sign-up
  };

  if (isLogin) {
    return <TestPage />;
  }

  return (
    <div className="login-container">
      <div className={`auth-card ${isLogin ? 'slide-up' : ''}`}>
        <h1 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
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
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <p className="auth-toggle" onClick={handleToggle}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;