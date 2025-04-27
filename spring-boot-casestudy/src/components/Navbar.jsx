import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

const Navbar = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
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
            <li className="nav-item dropdown position-relative">
              <button
                className="nav-link btn btn-link"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                Settings▼
              </button>
              
              <Transition
                show={isSettingsOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="settings-dropdown-menu">
                  <Link to={`/profile/${userId}/change-password`} className="dropdown-item">
                    Change Password
                  </Link>
                  <Link to={`/profile/${userId}/delete-profile`} className="dropdown-item">
                    Delete Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </Transition>
            </li>
          </ul>
          <span className="navbar-text me-3">
            Welcome, {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;