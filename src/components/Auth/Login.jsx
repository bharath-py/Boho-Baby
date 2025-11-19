import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(formData.username, formData.password);
      console.log('Login response:', response);  // Debug: see what we get
      
      // Save JWT tokens
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('token', response.access);  // For backward compatibility
      localStorage.setItem('userRole', response.role);
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid username or password');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login attempt`);
    // Add social login logic here
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="login-header">
          <div className="login-logo">
  <img src="/src/assets/bohologo.jpg" alt="Boho Reports Logo" />
</div>
          <h1 className="login-title">Boho Baby</h1>
          <p className="login-subtitle">Sign in to your Boho Reports account</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>
          
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn btn-primary login-button">
            Sign In
          </button>
        </form>
        
        <div className="login-divider">
          <span>OR</span>
        </div>
        
        <div className="social-login">
          <button 
            type="button"
            className="social-button"
            onClick={() => handleSocialLogin('Google')}
          >
            🔍 Google
          </button>
          <button 
            type="button"
            className="social-button"
            onClick={() => handleSocialLogin('Microsoft')}
          >
            💼 Microsoft
          </button>
        </div>
        
        <div className="login-footer">
          Don't have an account? <a href="/create-account">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;