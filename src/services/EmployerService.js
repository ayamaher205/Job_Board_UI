import axios from 'axios'

const url = import.meta.env.VITE_API_URL

const getEmployer = ()=>{
 return axios.get('http://127.0.0.1:8000/api/employers',{headers:{Accept:"application/json"}})   
}

export  {getEmployer};