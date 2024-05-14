// src/services/JobService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default {
  searchJobs(filters, page = 1) {
    return axios.get(`${API_BASE_URL}/jobs/search`, {
      params: { ...filters, page }
    });
  }
  // searchJobs(filters) {
  //   return axios.get(`${API_BASE_URL}/jobs/search`, { params: filters });
  // }
 , getLocations() {
    return axios.get(`${API_BASE_URL}/locations`);
  },
  getCategories() {
    return axios.get(`${API_BASE_URL}/categories`);
  }
};
