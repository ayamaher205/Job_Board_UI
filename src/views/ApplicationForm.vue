<template>
  <div style="background-color:#EFF6F3; background-size: cover; height:650px">
    <div class="flex justify-center items-center ">
      <div
        class=" my-4 rounded-lg p-10  max-w-xl shadow-box-circle bg-[#fafafae5] dark:bg-dark-1000 animate_animated animate_bounceIn">
        <form class="w-full" @submit.prevent="submitApplication">
          <div class="text-xl mb-4 col-span-12 text-green-800 dark:text-green-400">
            <div class="border-b border-gray-300 pb-2 dark:border-dark-600">Application Details</div>
          </div>

          <!-- User ID -->
          <!-- <div class="mb-4">
            <label for="user_id" class="block font-medium text-gray-700 dark:text-dark-200 w-64">User ID</label>
            <input type="text" v-model="formData.user_id" class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2" required>
            <span v-if="errors && errors.user_id" class="text-red-500">{{ errors.user_id[0] }}</span>
          </div> -->

          <!-- Post ID -->
          <!-- <div class="mb-4">
            <label for="post_id" class="block font-medium text-gray-700 dark:text-dark-200 w-64">Post ID</label>
            <input type="text" v-model="formData.post_id" class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2" required>
            <span v-if="errors && errors.post_id" class="text-red-500">{{ errors.post_id[0] }}</span>
          </div> -->

          <!-- Contact Details -->
          <div class="mb-4">
            <!-- <label for="contact_details" class="block font-medium text-gray-700 dark:text-dark-200 w-64">Contact Details</label> -->
            <input type="text" v-model="formData.contact_details"
              class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2"
              placeholder="Enter your contact details(optional)">
          </div>

          <!-- Applicant Email -->
          <div class="mb-4">
            <!-- <label for="app_email" class="block font-medium text-gray-700 dark:text-dark-200 w-64">Applicant Email</label> -->
            <input type="email" v-model="formData.app_email"
              class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2"
              placeholder="Enter your email" required>
            <span v-if="errors && errors.app_email" class="text-red-500">{{ errors.app_email[0] }}</span>
          </div>

          <!-- Applicant Phone -->
          <div class="mb-4">
            <!-- <label for="app_phone" class="block font-medium text-gray-700 dark:text-dark-200 w-64">Applicant Phone</label> -->
            <input type="text" v-model="formData.app_phone"
              class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2"
              placeholder="Enter your phone" required>
            <span v-if="errors && errors.app_phone" class="text-red-500">{{ errors.app_phone[0] }}</span>
          </div>

          <!-- Resume -->
          <div class="mb-4">
            <!-- <label for="resume" class="block font-medium text-gray-700 dark:text-dark-200 w-64">Resume</label> -->
            <input type="file" @change="onFileChange" name="resume"
              class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2">
            <span v-if="errors && errors.resume" class="text-red-500">{{ errors.resume[0] }}</span>
          </div>

          <!-- Submit button -->
          <button type="submit"
            class="vf-btn-primary px-4 py-2 bg-[#267912aa] text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 transition-colors duration-300">Submit
            Application</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import ApplicationService from '@/services/ApplicationService';
import Pusher from 'pusher-js';
import Swal from 'sweetalert2';

export default {
  name: 'ApplicationForm',
  props: ['postId'],
  data() {
    return {
      formData: {
        user_id: '',
        post_id: this.$route.query.postId,
        contact_details: '',
        app_email: '',
        app_phone: '',
        resume: null
      },
      newApplication: '',
      errors: null
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
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error submitting application:', error);
        }
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
      this.errors = null;
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
    const userId = localStorage.getItem('id');
    if (userId) {
      this.formData.user_id = userId;
    }
    Pusher.logToConsole = true;

    var pusher = new Pusher("5d052631cd1334c57a9d", {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      console.log(data);
      //this.newApplication = JSON.stringify(data.message); 
      Swal.fire({ text: 'Applied Succesfully' }),
        router.push({ path: '/get-applications' })
    });
  }
};
</script>
