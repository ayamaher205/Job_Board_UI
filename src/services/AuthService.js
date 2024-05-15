import axios from 'axios';
import { useLoggedUser } from '@/stores/User.js'

const BASE_URL = 'http://127.0.0.1:8000/api';

class AuthService {
  login(credentials) {
    const user = axios.post(`${BASE_URL}/login`, credentials);
    //const userStore = useLoggedUser();
    return user;
    
  }
}

export default new AuthService();
