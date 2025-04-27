import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContactService from '../services/ContactService';

const Dashboard = () => {
  const { userId } = useParams();
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchContactCount = async () => {
      try {
        const response = await ContactService.getContactCount(userId);
        setContactCount(response.data.count);
      } catch (error) {
        console.error('Error fetching contact count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactCount();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container dashboard-container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="welcome-message">
              <h3>Hi, {user?.firstName}</h3>
            </div>
            
            <div className="contact-stat">
              <h5>Total contacts: {contactCount}</h5>
            </div>
            
            <div className="dashboard-content">
              <p>Welcome to your contact management dashboard. Here you can manage your contacts, add new ones, or search for existing contacts.</p>
              <p>Use the navigation links on the left to access different features of the system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;