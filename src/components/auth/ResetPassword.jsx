import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft, Key } from 'lucide-react';
import './ResetPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get token from URL params (in real app, you'd extract this from the route)
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    // Simulate API call - verify OTP and reset password
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    console.log('Password reset completed with OTP:', otp, 'for token:', token);
  };

  return (
    <div className="auth-container">
      {/* Left Section - Illustration */}
      <div className="reset-password-illustration-section">
        <div className="reset-password-illustration-container">
          <img
            src="/login/Illustration.png"
            alt="Reset Password Illustration"
            className="reset-password-illustration"
          />
        </div>
      </div>

      {/* Right Section - Reset Password Form */}
      <div className="reset-password-form-section">
        <div className="reset-password-form-container">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="reset-password-header">
                <h1 className="reset-password-title">
                  Reset Password
                </h1>
                <p className="reset-password-description">
                  Enter the OTP sent to your email and set your new password.
                </p>
              </div>

              {/* Reset Password Form */}
              <form onSubmit={handleSubmit} className="reset-password-form">
                {/* OTP Input */}
                <div className="reset-password-input-group">
                  <label htmlFor="otp" className="reset-password-label">
                    OTP Code
                  </label>
                  <div className="reset-password-input-container">
                    <Key className="reset-password-input-icon" />
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="reset-password-input reset-password-otp-input"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                {/* New Password Input */}
                <div className="reset-password-input-group">
                  <label htmlFor="password" className="reset-password-label">
                    New Password
                  </label>
                  <div className="reset-password-input-container">
                    <Lock className="reset-password-input-icon" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="reset-password-input reset-password-password-input"
                      placeholder="Enter new password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="reset-password-password-toggle"
                    >
                      {showPassword ? (
                        <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="reset-password-input-group">
                  <label htmlFor="confirmPassword" className="reset-password-label">
                    Confirm Password
                  </label>
                  <div className="reset-password-input-container">
                    <Lock className="reset-password-input-icon" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="reset-password-input reset-password-password-input"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="reset-password-password-toggle"
                    >
                      {showConfirmPassword ? (
                        <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="reset-password-submit-button"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <div className="reset-password-success">
              <div className="reset-password-success-icon-container">
                <Lock className="reset-password-success-icon" />
              </div>
              <h1 className="reset-password-title">
                Password Reset Successful
              </h1>
              <p className="reset-password-description">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="reset-password-success-button"
              >
                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

