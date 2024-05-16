<template>
    <div>
      <div v-if="application">
        <h2>Application Details</h2>
        <p><strong>ID:</strong> {{ application.id }}</p>
        <p><strong>User ID:</strong> {{ application.user_id }}</p>
        <p><strong>Post ID:</strong> {{ application.post_id }}</p>
        <p><strong>Contact Details:</strong> {{ application.contact_details }}</p>
        <p><strong>Applicant Email:</strong> {{ application.app_email }}</p>
        <p><strong>Applicant Phone:</strong> {{ application.app_phone }}</p>
        <!-- Add more fields as needed -->
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import ApplicationService from '@/services/ApplicationService';
  
  export default {
    name: 'showApplications',
    data() {
      return {
        application: null,
        error: null,
      };
    },
    created() {
      // Fetch application data when the component is created
      this.fetchApplication();
    },
    methods: {
      fetchApplication() {
        const id = this.$route.params.id; 
        ApplicationService.getApplication(id)
          .then(response => {
            this.application = response.data;
          })
          .catch(error => {
            console.error('Error fetching application:', error);
            this.error = 'Failed to fetch application data.';
          });
      },
    },
  };
  </script>
  