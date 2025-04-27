import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Settings = () => {
  const { userId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div>
      <Navbar />
      <div className="container dashboard-container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h3 className="mb-4">Settings</h3>
            
            <div className="card">
              <div className="card-header">
                Account Information
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>User ID:</strong> {user?.userId}
                </div>
                <div className="mb-3">
                  <strong>Name:</strong> {user?.firstName} {user?.lastName}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {user?.email}
                </div>
                <div className="mb-3">
                  <strong>Mobile:</strong> {user?.mobile}
                </div>
                <div className="mb-3">
                  <strong>Birthday:</strong> {user?.birthday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;