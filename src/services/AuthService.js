import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

class AuthService {
  login(credentials) {
    return axios.post(`${BASE_URL}/login`, credentials);
  }
}

export default new AuthService();
