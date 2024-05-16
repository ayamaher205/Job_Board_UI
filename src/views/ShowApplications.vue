<template>
    <div>
        {{ applications }}

      <!-- Display application data here -->
      <div v-for="application in applications" :key="application.id">
        <!-- Display application details -->
        <ul>
          <li>{{ application.id }}</li>
          <li>{{ application.resume }}</li>
          <li>{{ application.app_email }}</li>
          <li>{{ application.app_phone }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import ApplicationService from '../services/ApplicationService.js';
  
  export default {
    data() {
      return {
        applications: []
      };
    },
    mounted() {
      this.fetchApplications();
    },
    methods: {
      async fetchApplications() {
        try {
          const response = await ApplicationService.getApplications();
          this.applications = response.data;
          console.log(this.applications.data);
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  