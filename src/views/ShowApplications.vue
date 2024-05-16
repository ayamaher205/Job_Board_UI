<template>
  <div>
    <div v-if="application">
      <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div class="p-6">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Application Details
          </h5>
          <p><strong>ID:</strong> {{ application.id }}</p>
          <p><strong>User ID:</strong> {{ application.user_id }}</p>
          <p><strong>Post ID:</strong> {{ application.post_id }}</p>
          <p><strong>Contact Details:</strong> {{ application.contact_details }}</p>
          <p><strong>Applicant Email:</strong> {{ application.app_email }}</p>
          <p><strong>Applicant Phone:</strong> {{ application.app_phone }}</p>
        </div>
        <div class="p-6 pt-0">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            Read More
          </button>
        </div>
      </div>
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
      ApplicationService.showApplication(id)
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
