import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        // Navigate to reset password page with email
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        alert(result.message || 'Error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Section - Illustration */}
      <div className="forgot-password-illustration-section">
        <div className="forgot-password-illustration-container">
          <img
            src="/login/Illustration.png"
            alt="Forgot Password Illustration"
            className="forgot-password-illustration"
          />
        </div>
      </div>

      {/* Right Section - Forgot Password Form */}
      <div className="forgot-password-form-section">
        <div className="forgot-password-form-container">
          {/* Header */}
          <div className="forgot-password-header">
            <h1 className="forgot-password-title">
              Forgot Password?
            </h1>
            <p className="forgot-password-description">
              {isSubmitted
                ? 'If an account exists with that email, we\'ve sent password reset instructions.'
                : 'Enter your email address and we\'ll send you instructions to reset your password.'}
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {/* Email Input */}
            <div className="forgot-password-input-group">
              <label htmlFor="email" className="forgot-password-label">
                Email Address
              </label>
              <div className="forgot-password-input-container">
                <Mail className="forgot-password-input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="forgot-password-input"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="forgot-password-submit-button"
            >
              {isLoading ? 'Sending...' : 'Send OTP Code'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="forgot-password-back-section">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="forgot-password-back-button"
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

