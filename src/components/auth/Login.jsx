import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Set authentication status and redirect
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left Section - Illustration */}
      <div className="login-illustration-section">
        <div className="login-illustration-container">
          <img
            src="/login/Illustration.png"
            alt="Login Illustration"
            className="login-illustration"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-form-section">
        <div className="login-form-container">
          {/* Header */}
          <div className="login-header">
            <h2 className="login-subtitle">
              Welcome to
            </h2>
            <h1 className="login-title">
              Bharatham Admin Panel
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <div className="login-input-group">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <div className="login-input-container">
                <Mail className="login-input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-input-group">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <div className="login-input-container">
                <Lock className="login-input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input login-password-input"
                  placeholder="************"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                  ) : (
                    <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="login-options">
              <div className="login-remember-me">
                <input
                  id="remember"
                  type="checkbox"
                  className="login-checkbox"
                />
                <label htmlFor="remember" className="login-checkbox-label">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="login-forgot-password"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-button"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

