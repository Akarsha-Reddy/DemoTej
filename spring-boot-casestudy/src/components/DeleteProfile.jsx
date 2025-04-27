import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import UserService from '../services/UserService';

const DeleteProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleDelete = async () => {
    try {
      await UserService.deleteProfile(userId);
      sessionStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete profile:', error);
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
            <h3>Delete Profile!</h3>
            
            <p className="mb-4">
              Hi, {user?.firstName} are you sure you want to delete your profile
            </p>
            
            <button 
              className="btn btn-warning"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;