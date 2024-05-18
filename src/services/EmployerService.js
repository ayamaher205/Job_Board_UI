import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const getEmployer = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/employers/${id}`, {
    headers: { Accept: "application/json" },
  });
};
const updateEmployer = (id, data) => {
  // console.log(`form data is: ${data.values().toArray()}`);
  let config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data'
    },
    'content-type':'multipart/form-data',
  }
  return axios.put(`http://127.0.0.1:8000/api/employers/${id}`, data, config);
};

export { getEmployer, updateEmployer };
