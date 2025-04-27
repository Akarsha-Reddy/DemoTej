import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContactService from '../services/ContactService';

const ShowContacts = () => {
  const { userId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await ContactService.getAllContacts(userId);
      setContacts(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await ContactService.deleteContact(contactId);
      setSuccess('Contact Deleted');
      fetchContacts();
    } catch (error) {
      setError('Failed to delete contact');
    }
  };

  if (loading) {
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
            <div className="col-md-9 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h3>All Contacts</h3>
            
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}
            
            {contacts.length === 0 ? (
              <div>
                <div className="alert alert-info">
                  Sorry Contacts not available
                </div>
                {success && (
                  <div className="success-message">
                    Contact Deleted
                  </div>
                )}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>X</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={contact.id}>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.mobile}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(contact.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowContacts;