import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ContactService from '../services/ContactService';

const SearchContacts = () => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await ContactService.getAllContacts(userId);
        const sortedContacts = response.data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      } catch (error) {
        setError('Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, [userId]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setFilteredContacts(contacts);
      setError('');
      return;
    }

    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().startsWith(term.toLowerCase())
    );

    if (filtered.length === 0) {
      setError(`Sorry no matching records with ${term}`);
    } else {
      setError('');
    }

    setFilteredContacts(filtered);
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
            <h3>Search Contact</h3>
            
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <h4>All Contacts</h4>
            
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
                  {filteredContacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>{contact.name}</td>
                      <td>{contact.mobile}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContacts;