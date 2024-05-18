import axios from 'axios';
import router from '@/router'; 
const BASE_URL = 'http://127.0.0.1:8000/api';

class AuthService {
  login(credentials) {
    return axios.post(`${BASE_URL}/login`, credentials);
  }

  isAuthenticated() {
    const authToken = localStorage.getItem('token');
    
    return !!authToken;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role');
    router.push('/');
  }
}

export default new AuthService();
