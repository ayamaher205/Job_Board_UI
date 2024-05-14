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

      <!-- Submit button -->
      <button type="submit" class="vf-btn-primary px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Submit Application</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ApplicationForm',
  data() {
    return {
      formData: {
        user_id: '',
        post_id: '',
        contact_details: '',
        app_email: '',
        app_phone: ''
      }
    };
  },
  methods: {
    async submitApplication() {

      try {
        console.log(this.formData);
        const response = await axios.post('http://127.0.0.1:8000/api/applications', this.formData);
        console.log('Application submitted successfully:', response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error submitting application:', error);
      }
    },

  }
};
</script>
