import axios from 'axios';

const API_BASE_URL = '/api/users';

const UserService = {
  registerUser: (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData);
  },

  loginUser: (credentials) => {
    return axios.post(`${API_BASE_URL}/login`, credentials);
  },

  getUserProfile: (userId) => {
    return axios.get(`${API_BASE_URL}/${userId}`);
  },

  updatePassword: (userId, newPassword) => {
    return axios.put(`${API_BASE_URL}/${userId}/password`, { password: newPassword });
  },

  deleteProfile: (userId) => {
    return axios.delete(`${API_BASE_URL}/${userId}`);
  }
};

export default UserService;