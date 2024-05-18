import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import { usePostsstore } from '@/stores/posts';
import { useUserstore } from '@/stores/users';

export const useEmployerstore = defineStore('employers', {
  state: () => ({
    employers: [],
    deactivatedEmployers: [],
    activatedEmployers:[],
    errorMessage: ''
  }),
  actions: {
    async fetchEmployers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/allemployers', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        this.employers = response.data.data.data;
        // this.deactivatedEmployers = this.employers.filter(employer => !employer.active || employer.deleted_at);
        return this.employers;
      } catch (error) {
        console.error('Error fetching employers:', error);
        this.errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching employers'
        });
      }
    },
    async deactivateEmployer(employerId) {  
      try {
        console.log('Deactivating employer with ID:', employerId);
        await axios.delete(`http://127.0.0.1:8000/api/users/${employerId}/deactivate`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const employer = this.employers.find(c => c.id === employerId);
        if (employer) {
          employer.active = false;
          employer.deleted_at = Date.now();
          this.deactivatedEmployers.push(employer);
        }
      } catch (error) {
        console.error('Error deactivating employer:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error deactivating employer'
        });
      }
    },
    async fetchDeactivatedEmployers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/trashed-users', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    
        const deactivatedEmployers = response.data.filter(user => user.role === 'employer');
        console.log(deactivatedEmployers)
        return deactivatedEmployers;
      } catch (error) {
        console.error('Error fetching deactivated employers:', error);
        this.errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching deactivated employers'
        });
        return []; 
      }
    },
    async activateEmployer(employerId) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/users/${employerId}/activate`, null,{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const employer = this.employers.find(c => c.id === employerId);
        if (employer) {
          employer.active = TRUE;
          employer.deleted_at = NULL;
          this.activatedEmployers.push(employer);
          
        }      
      } catch (error) {
        console.error('Error activating employer:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error activating employer'
        });
      }
    }
  },

  getters: {
    employersWithPostsCount() {
      const postsStore = usePostsstore();
      const userStore = useUserstore();

      const employers = userStore.employers || [];
      const posts = postsStore.allposts || [];

      return employers.map(employer => {
        let postsCount = 0;
        posts.forEach(post => {
          if (post.user_id === employer.id) {
            postsCount++;
          }
        });
        return {
          ...employer,
          postsCount: postsCount
        };
      });
    }
  }
});
