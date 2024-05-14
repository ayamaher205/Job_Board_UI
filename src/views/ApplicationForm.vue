<template>
  <div class="bg-white rounded-lg p-10 max-w-lg shadow-box-circle dark:bg-dark-1000">
    <form class="w-full" @submit.prevent="submitApplication">
      <div class="text-xl mb-4 col-span-12">
        <div class="border-b border-gray-300 pb-2 dark:border-dark-600">Application Details</div>
      </div>

      <!-- User ID -->
      <div class="mb-4">
        <label for="user_id" class="block font-medium text-gray-700 dark:text-dark-200">User ID</label>
        <input type="text" v-model="formData.user_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
      </div>

      <!-- Post ID -->
      <div class="mb-4">
        <label for="post_id" class="block font-medium text-gray-700 dark:text-dark-200">Post ID</label>
        <input type="text" v-model="formData.post_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
      </div>

      <!-- Contact Details -->
      <div class="mb-4">
        <label for="contact_details" class="block font-medium text-gray-700 dark:text-dark-200">Contact Details</label>
        <input type="text" v-model="formData.contact_details" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter your contact details">
      </div>

      <!-- Applicant Email -->
      <div class="mb-4">
        <label for="app_email" class="block font-medium text-gray-700 dark:text-dark-200">Applicant Email</label>
        <input type="email" v-model="formData.app_email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
      </div>

      <!-- Applicant Phone -->
      <div class="mb-4">
        <label for="app_phone" class="block font-medium text-gray-700 dark:text-dark-200">Applicant Phone</label>
        <input type="text" v-model="formData.app_phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
      </div>

      <!-- Resume -->
      <div class="mb-4">
        <label for="resume" class="block font-medium text-gray-700 dark:text-dark-200">Resume</label>
        <input type="file" @change="onFileChange" name="resume" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>

      <!-- Submit button -->
      <button type="submit" class="vf-btn-primary px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Submit Application</button>
    </form>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Application Received</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Display application details here -->
          <p>{{ newApplication }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script>
import ApplicationService from '@/services/ApplicationService';

export default {
  name: 'ApplicationForm',
  data() {
    return {
      formData: {
        user_id: '',
        post_id: '',
        contact_details: '',
        app_email: '',
        app_phone: '',
        resume: null 
      },
      newApplication: '' 
    };
  },
  methods: {
    async submitApplication() {
      try {
        console.log(this.formData);
        const response = await ApplicationService.submitApplication(this.formData);
        console.log('Application submitted successfully:', response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error submitting application:', error);
      }
    },
    resetForm() {
      this.formData = {
        user_id: '',
        post_id: '',
        contact_details: '',
        app_email: '',
        app_phone: '',
        resume: null
      };
    },
    onFileChange(event) {
      try {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
          this.formData.resume = event.target.files[0];
        } else {
          console.error('Event object or its properties are undefined.');
        }
      } catch (error) {
        console.error('Error in onFileChange:', error);
      }
    }
  },
  mounted() {
    Pusher.logToConsole = true;

    var pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    encrypted: true 
  });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      console.log(data);
      this.newApplication = JSON.stringify(data); 
      $('#exampleModal').modal('show'); 
    });
  }
};
</script>
