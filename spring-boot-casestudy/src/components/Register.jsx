import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    
    if (!birthday) newErrors.birthday = 'Birthday is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const userData = {
          firstName,
          lastName,
          email,
          password,
          mobile,
          birthday
        };
        
        const response = await UserService.registerUser(userData);
        const { userId } = response.data;
        
        // Redirect to login page with userId as a query parameter
        navigate(`/login?userId=${userId}`);
      } catch (error) {
        if (error.response && error.response.data.error) {
          setApiError(error.response.data.error);
        } else {
          setApiError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="container login-container">
      <h2>Registration Form</h2>
      
      <div className="login-form">
        {apiError && (
          <div className="error-message">
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">Birthday (MM/DD/YYYY)</label>
            <input
              type="text"
              className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="MM/DD/YYYY"
            />
            {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
          </div>
          
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;