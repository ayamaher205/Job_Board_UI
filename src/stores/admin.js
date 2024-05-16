// stores/admin.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admins: [],
  }),
  actions: {
    async addAdmin(adminData) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/admins', adminData,
        {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        console.log(response)
        return response 
      } catch (error) {
        throw error;
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
  },
});

