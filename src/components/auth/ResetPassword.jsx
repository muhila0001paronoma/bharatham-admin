import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
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
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    console.log('Password reset completed for token:', token);
  };

  return (
    <div 
      className="auth-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#f5f5f5'
      }}
    >
      {/* Left Section - Illustration */}
      <div 
        style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src="/login/Illustration.png" 
            alt="Reset Password Illustration"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '90vh'
            }}
          />
        </div>
      </div>

      {/* Right Section - Reset Password Form */}
      <div 
        style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          padding: '2rem'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '450px',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '3rem'
          }}
        >
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: '700', 
                  color: '#124591',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  Reset Password
                </h1>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  margin: 0
                }}>
                  Enter your new password below.
                </p>
              </div>

              {/* Reset Password Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* New Password Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="password" style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ 
                      position: 'absolute', 
                      left: '1rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      width: '1.25rem', 
                      height: '1.25rem', 
                      color: '#9ca3af',
                      pointerEvents: 'none'
                    }} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '3rem',
                        paddingTop: '0.875rem',
                        paddingBottom: '0.875rem',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = '#e5e7eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(18, 69, 145, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Enter new password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#6b7280'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="confirmPassword" style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ 
                      position: 'absolute', 
                      left: '1rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      width: '1.25rem', 
                      height: '1.25rem', 
                      color: '#9ca3af',
                      pointerEvents: 'none'
                    }} />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '3rem',
                        paddingTop: '0.875rem',
                        paddingBottom: '0.875rem',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = '#e5e7eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(18, 69, 145, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#6b7280'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
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
                  style={{
                    width: '100%',
                    background: isLoading ? '#9ca3af' : '#124591',
                    color: '#ffffff',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Lock style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
                </div>
                <h1 style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: '700', 
                  color: '#124591',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  Password Reset Successful
                </h1>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  margin: 0
                }}>
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.location.href = '/login'}
                style={{
                  width: '100%',
                  background: '#124591',
                  color: '#ffffff',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .auth-container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

