import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserstore = defineStore('users', {
  state: () => ({
    allusers: [],
    Candidates:[],
    Admins:[],
    Employers:[],
    Adminscount:0,
    Employerscount:0,
    Candidatescount:0,

  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all-users');
  
        this.allusers = response.data.data;
        this.Admins = this.allusers.filter(user => user.role === 'admin');
        this.Candidates = this.allusers.filter(user => user.role === 'candidate');
        this.Employers = this.allusers.filter(user => user.role === 'employer');
        this.Adminscount = this.Admins.length;
        this.Candidatescount = this.Candidates.length;
        this.Employerscount = this.Employers.length;
      } catch (error) {
        throw error;
      }
    },
  },
});
