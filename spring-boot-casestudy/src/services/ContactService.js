import axios from 'axios';

const API_BASE_URL = '/api/contacts';

const ContactService = {
  addContact: (userId, contactData) => {
    return axios.post(`${API_BASE_URL}/${userId}`, contactData);
  },

  getAllContacts: (userId) => {
    return axios.get(`${API_BASE_URL}/${userId}`);
  },

  searchContacts: (userId, name) => {
    return axios.get(`${API_BASE_URL}/${userId}/search?name=${name}`);
  },

  getContactCount: (userId) => {
    return axios.get(`${API_BASE_URL}/${userId}/count`);
  },

  deleteContact: (contactId) => {
    return axios.delete(`${API_BASE_URL}/${contactId}`);
  }
};

export default ContactService;