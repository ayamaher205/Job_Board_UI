import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(config => {
  if (['post', 'delete', 'put'].includes(config.method)) {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  getPosts() {
    return axiosInstance.get('/posts');
  },

  getPost(postId) {
    return axiosInstance.get(`/posts/${postId}`);
  },

  createPost(postData) {
    return axiosInstance.post('/posts', postData);
  },

  deletePost(postId) {
    return axiosInstance.delete(`/posts/${postId}`);
  },

  updatePost(postId, postData) {
    return axiosInstance.put(`/posts/${postId}`, postData);
  },
};
