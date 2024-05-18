import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admins';

const getUser =(id)=>{
    return axios.get(`http://127.0.0.1:8000/api/admins/${id}`,{headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }});
} 

export { getUser }