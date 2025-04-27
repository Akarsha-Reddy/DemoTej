import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import UserService from '../services/UserService';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registeredUserId, setRegisteredUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user was redirected from registration page
    const params = new URLSearchParams(location.search);
    const regUserId = params.get('userId');
    if (regUserId) {
      setRegisteredUserId(regUserId);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }

    try {
      const response = await UserService.loginUser({ userId, password });
      const userData = response.data;
      
      // Store user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to dashboard
      navigate(`/profile/${userData.userId}/dashboard`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError('Username or Password is invalid');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container login-container">
      {registeredUserId && (
        <div className="registration-id">
          Registered with an User id {registeredUserId}
        </div>
      )}
      
      <h2>Login Form</h2>
      
      <div className="login-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
      
      <div className="mt-3">
        <Link to="/register" className="btn btn-info">Create Profile</Link>
      </div>
    </div>
  );
};

export default Login;