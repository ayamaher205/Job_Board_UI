import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default {
  registerCandidate(candidateData) {
    return axios.post(`${API_BASE_URL}/user/register`, candidateData, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   'Content-Type': 'multipart/form-data'
    //  }
    });
  },
};
