import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  const { userId } = useParams();

  return (
    <div className="sidebar">
      <div className="profile-summary">
        <h5>Profile summary!</h5>
        <div className="mb-2">
          <strong>Birthday:</strong> 
          <span className="ms-2">
            {JSON.parse(sessionStorage.getItem('user'))?.birthday || 'N/A'}
          </span>
        </div>
        <div>
          <strong>Mobile:</strong> 
          <span className="ms-2">
            {JSON.parse(sessionStorage.getItem('user'))?.mobile || 'N/A'}
          </span>
        </div>
      </div>
      
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to={`/profile/${userId}/dashboard`} className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to={`/profile/${userId}/add-contact`} className="nav-link">Add contacts</Link>
        </li>
        <li className="nav-item">
          <Link to={`/profile/${userId}/contacts`} className="nav-link">Show all contacts</Link>
        </li>
        <li className="nav-item">
          <Link to={`/profile/${userId}/search`} className="nav-link">Search contacts</Link>
        </li>
        <li className="nav-item dropdown settings-dropdown">
          <Link to={`/profile/${userId}/settings`} className="nav-link d-flex align-items-center">
            Settings
            <span className="ms-1">▼</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;