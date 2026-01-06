import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft, Key } from 'lucide-react';
import { API_BASE_URL } from '../../config';
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

  // Get email from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      alert('Please enter a valid OTP');
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

    try {
      // Step 1: Verify OTP
      const verifyResponse = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otpCode: otp
        }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        alert(verifyResult.message || 'OTP verification failed.');
        setIsLoading(false);
        return;
      }

      const { resetToken } = verifyResult.data;

      // Step 2: Reset Password
      const resetResponse = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          resetToken,
          newPassword: password
        }),
      });

      const resetResult = await resetResponse.json();

      if (resetResult.success) {
        setIsSubmitted(true);
      } else {
        alert(resetResult.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="reset-password-input reset-password-otp-input"
                      placeholder="0000"
                      maxLength={4}
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

