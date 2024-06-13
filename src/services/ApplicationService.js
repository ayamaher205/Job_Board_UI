import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default {
  submitApplication(applicationData) {
    return axios.post(`${API_BASE_URL}/applications`, applicationData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'

     }
    });
  },
  getApplications() {
    return axios.get(`${API_BASE_URL}/applications/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  showApplication(id) {
    return axios.get(`${API_BASE_URL}/applications/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  updateApplication(id, applicationData) {
    return axios.put(`${API_BASE_URL}/applications/${id}`,{ status: applicationData}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  deleteApplication(id) {
    return axios.delete(`${API_BASE_URL}/applications/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
};
