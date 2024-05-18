 
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default {
  searchJobs(filters, page = 1) {
    return axios.get(`${API_BASE_URL}/jobs/search`, {
      params: { ...filters, page }
    });
  },
   getRecentPosts() {
     return axios.get(`${API_BASE_URL}/jobs/recent`);
   }
 , getLocations() {
    return axios.get(`${API_BASE_URL}/locations`);
  },
  getCategories() {
    return axios.get(`${API_BASE_URL}/categories`);
  }
};
