import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useUserstore = defineStore('users', {
  state: () => ({
    allusers: [],
    Candidates: [],
    activatedusers: [],
    deactivatedusers: [],
    Admins: [], 
    Employers: [], 
    errorMessage: ""
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all-users');
        this.allusers = response.data.data;
        this.Candidates = this.allusers.filter(user => user.role === 'candidate');
      } catch (error) {
        this.errorMessage = error.message;
        throw error;
      }
    },

    async fetchUsersWithRole(role) {
      try {
        if (role === 'candidate') {
          const response = await axios.get('http://127.0.0.1:8000/api/usersprofile', {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          this.Candidates = response.data.data.data;
          return this.Candidates;
        } else if (role === 'admin') {
          const response = await axios.get('http://127.0.0.1:8000/api/admins');
          this.Admins = response.data.data;
          return this.Admins;
        } else {
          const response = await axios.get('http://127.0.0.1:8000/api/allemployers', {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          this.Employers = response.data.data;
          return this.Employers;
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching users'
        });
      }
    },

    async deactivateuser(userId) {
      console.log(userId)
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}/deactivate`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const user = this.Candidates.find(u => u.id === userId);
        if (user) {
          user.deleted_at = new Date().toISOString();
          this.activatedusers = this.activatedusers.filter(u => u.id !== userId);
          this.deactivatedusers.push(user);
          console.log(this.deactivatedusers)
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Deactivating'
        });
        console.error('Error deactivating', error);
      }
    },

    async activateCandidate(userId) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/candidates/${userId}/activate`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const user = this.Candidates.find(c => c.id === userId);
        if (user) {
          user.deleted_at = null;
          this.deactivatedusers = this.deactivatedusers.filter(c => c.id !== userId);
          this.activatedusers.push(user);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Activating'
        });
        console.error('Error activating', error);
      }
    }
  }
});
