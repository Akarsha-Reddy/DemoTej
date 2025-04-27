import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import UserService from '../services/UserService';

const ChangePassword = () => {
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    try {
      await UserService.updatePassword(userId, newPassword);
      setSuccess(`Hi, ${user.firstName} your password is updated`);
      setNewPassword('');
    } catch (error) {
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container dashboard-container">
        <div className="row">
          <div className="col-md-3">
            <div className="profile-summary">
              <h5>Profile summary!</h5>
              <div className="mb-2">
                <strong>Birthday:</strong> 
                <span className="ms-2">{user?.birthday}</span>
              </div>
              <div>
                <strong>Mobile:</strong> 
                <span className="ms-2">{user?.mobile}</span>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h3>Update Password</h3>
            
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password below"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <button type="submit" className="btn btn-secondary">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;