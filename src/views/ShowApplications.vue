<template>
  <div style="background-color:#EFF6F3; background-size: cover;">

<div class="flex justify-center items-center h-screen">
  <div v-if="application">
    <div class="relative flex flex-col mt-6 text-gray-700 bg-[#fafafae5] shadow-md bg-clip-border rounded-xl w-96">
      <div class="p-6">
        <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Application Details
        </h5>
        <p><strong>ID:</strong> {{ application.data.id }}</p>
        <p><strong>Contact Details:</strong> {{ application.data.contact_details }}</p>
        <p><strong>Applicant Email:</strong> {{ application.data.app_email }}</p>
        <p><strong>Applicant Phone:</strong> {{ application.data.app_phone }}</p>
      </div>
      <div class="p-6 pt-0">
        <a
        :href="`http://127.0.0.1:8000/${application.data.resume}`"
          download="resume.pdf"
          class="font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-green-500 text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">
          Show Resume
        </a>
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
