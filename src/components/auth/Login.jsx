import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
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
    console.log('Login submitted:', { email, password });
  };

  return (
    <div 
      className="login-container"
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
            alt="Login Illustration"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '90vh'
            }}
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
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
            <h2 style={{ 
              fontSize: '1rem', 
              fontWeight: '400', 
              color: '#6b7280', 
              marginBottom: '0.5rem' 
            }}>
              Welcome to
            </h2>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#124591',
              margin: 0
            }}>
              Bharatham Admin Panel
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '0.25rem'
              }}>
                Email
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
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
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

            {/* Password Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="password" style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '0.25rem'
              }}>
                Password
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
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="************"
                  required
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

            {/* Remember Me and Forgot Password */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginTop: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="remember"
                  type="checkbox"
                  style={{
                    width: '1rem',
                    height: '1rem',
                    accentColor: '#2563eb',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                />
                <label htmlFor="remember" style={{ 
                  fontSize: '0.875rem', 
                  color: '#374151', 
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  Remember me
                </label>
              </div>
              <button
                type="button"
                style={{
                  fontSize: '0.875rem',
                  color: '#2563eb',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#1d4ed8';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#2563eb';
                  e.target.style.textDecoration = 'none';
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
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
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .login-container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

