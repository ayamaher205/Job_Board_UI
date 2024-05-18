import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admins';

const getUser = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/admins/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

const updateAdmin = (id, data) => {
    return axios.post(`http://127.0.0.1:8000/api/admins/${id}`, data,
      {  headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    }})
}
export { getUser, updateAdmin }