import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(config => {
  if (['post', 'delete', 'put'].includes(config.method)) {
    const token = localStorage.getItem("token");
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
  getAllPosts() {
    return axiosInstance.get('/allposts');
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
    return axiosInstance.put(`/update-status/${postId}`, postData);
  },

  updatePostStatus(postId, postData) {
    return axiosInstance.put(`/post-update/${postId}`, postData);
  }
};
