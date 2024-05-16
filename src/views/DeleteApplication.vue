<template>
    <div>
      <!-- Display application details here -->
      
      <button @click="deleteApplication">Delete Application</button>
    </div>
  </template>
  
  <script>
  import ApplicationService from '@/services/ApplicationService';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ShowApplications',
    data() {
      return {
        applicationId: this.$route.params.id,
      };
    },
    methods: {
      deleteApplication() {
        ApplicationService.deleteApplication(this.applicationId)
          .then(response => {
            console.log('Application deleted successfully:', response.data.message);
            // Redirect to a different route or perform other actions after deletion
            this.$router.push('/get-applications');
          })
          .catch(error => {
            console.error('Error deleting application:', error.response.data.error);
            // Handle error, show notification, etc.
          });
      },
    },
  };
  </script>
  