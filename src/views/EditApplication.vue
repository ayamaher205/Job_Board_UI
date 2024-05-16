<template>
    <div class="h-screen flex justify-center items-center" style="background-image: url('/shapes.jpg')">
      <div class="rounded-lg p-10 max-w-lg shadow-box-circle dark:bg-dark-1000">
        <form class="w-full" @submit.prevent="submitApplication">
          <div class="text-xl mb-4 col-span-12 text-green-800 dark:text-green-400">
            <div class="border-b border-gray-300 pb-2 dark:border-dark-600">Application Details</div>
          </div>
  
          <!-- Application ID -->
          <div class="mb-4">
            <label for="application_id" class="block font-medium text-gray-700 dark:text-dark-200">Application ID</label>
            <input type="text" v-model="formData.id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" required>
          </div>
  
          <!-- Status -->
          <div class="mb-4">
            <label for="status" class="block font-medium text-gray-700 dark:text-dark-200">Status</label>
            <input type="text" v-model="formData.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" required>
          </div>
  
          <!-- Submit button -->
          <button type="submit" class="vf-btn-primary px-4 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">Update Status</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import ApplicationService from '@/services/ApplicationService';
  import Pusher from 'pusher-js';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'editApplication',
    data() {
      return {
        formData: {
          id: '',
          status: ''
        },
        newApplication: '' 
      };
    },
    methods: {
      async submitApplication() {
        try {
          const response = await ApplicationService.updateApplication(this.formData.id, { status: this.formData.status });
          console.log('Status updated successfully:', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error updating status:', error);
        }
      },
      resetForm() {
        this.formData.id = '';
        this.formData.status = '';
      },
      initializePusher() {
        Pusher.logToConsole = true;
        var pusher = new Pusher("5d052631cd1334c57a9d", {
    cluster: 'eu',
    encrypted: true 
  });
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', (data) => {
          console.log(data);
          this.newApplication = JSON.stringify(data.message); 
          Swal.fire({ text: this.newApplication });
        });
      }
    },
    mounted() {
      this.initializePusher();
    }
  };
  </script>
  