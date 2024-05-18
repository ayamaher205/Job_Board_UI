import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admins: [],
    admin: {},
    count:0,
  }),
  actions: {
    async addAdmin(adminData) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/admins', adminData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        console.log(response);
        this.addAdminLocally(response.data); 
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async fetchAdmins() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admins', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        this.admins = response.data.data;
        // this.count = response.data.count;
        console.log(this.admins);
        return this.admins;
      } catch (error) {
        console.log(error.response.data.data)
        if (error.response.data.data) {
            this.errorMessage = error.response.data.data.name[0];
        } else {
          this.errorMessage = 'An error occurred while fetching candidates.';
          console.error('Error:', error.response.data);
        }
      }
    },
 
     
    
    async deactivateAdmin(adminId) {
      try {
        console.log(candidateId)
        await axios.delete(`http://127.0.0.1:8000/api/users/${adminId}/deactivate`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            }
        );
        const admin = this.admins.find(c => c.id === adminId);
        if (admin) {
          admin.active = false;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error deactivating candidate`
        });
      }
    },
  },
  mutations: {
    addAdminLocally(admin) {
      this.admins.push(admin);
    },
  },
  getters: {
    allAdmins() {
      return this.admins;
    },
    getAdmin(id) {
      return this.admins.find((admin) => admin.id === id);
    },
  },
});
