import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(res => {
  if (['post', 'delete', 'put'].includes(res.method)) {
    const token = localStorage.getItem("Token");
    if (token) {
      res.headers.Authorization = `Bearer ${token}`;
    }
  }
  return res;
}, error => {
  return Promise.reject(error);
});

export default {
    getPosts(){
      return axiosInstance.get(`/posts`);
    },

    getPost(postId){
      return axiosInstance.get(`/posts/${postId}`);
    },

    createPost(postData){
      return axiosInstance.post(`/posts`, postData);
    },

    deletePost(postId){
      return axiosInstance.delete(`/posts/${postId}`);
    },

    updatePost(postId, postData){
      return axiosInstance.put(`/pos
      ChatGPT
      It is not mandatory to use .then() and .catch() directly within the API service methods if you plan to handle promises in your components. If you return the promises from the API methods, you can chain .then() and .catch() in the components where these methods are called. This approach allows for greater flexibility in handling responses and errors in different components according to specific requirements.ts/${postId}`, postData);
    },
};


