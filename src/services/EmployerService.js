import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const getEmployer = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/employers/${id}`, {
    headers: { Accept: "application/json" },
  });
};
const updateEmployer = (id, data) => {
 // console.log(`form data is: ${data.values().toArray()}`);
  return axios.post(`http://127.0.0.1:8000/api/employers/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept:'application/json',
    'Content-Type': 'multipart/form-data'
   }
  });
};
const deleteEmployer = (id)=>{
return axios.delete(`http://127.0.0.1:8000/api/employers/${id}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
 }
});
}

export { getEmployer, updateEmployer,deleteEmployer};
