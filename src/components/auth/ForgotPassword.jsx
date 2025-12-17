import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    console.log('Password reset requested for:', email);
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
            alt="Forgot Password Illustration"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '90vh'
            }}
          />
        </div>
      </div>

      {/* Right Section - Forgot Password Form */}
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
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#124591',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              Forgot Password?
            </h1>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              margin: 0
            }}>
              {isSubmitted 
                ? 'If an account exists with that email, we\'ve sent password reset instructions.' 
                : 'Enter your email address and we\'ll send you instructions to reset your password.'}
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Forgot Password Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Email Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ 
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
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',
                        paddingRight: '1rem',
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
                      placeholder="example@gmail.com"
                      required
                    />
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
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              {/* Back to Login */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  style={{
                    fontSize: '0.875rem',
                    color: '#124591',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0f3a7a';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#124591';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                  Back to Login
                </button>
              </div>
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
                  <Mail style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.history.back()}
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
                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                Back to Login
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

