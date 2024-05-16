<template>
  <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
    <div class="p-6">
      <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        UI/UX Review Check
      </h5>
      <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
        and near to "Naviglio" where you can enjoy the main night life in
        Barcelona.
      </p>
    </div>
    <div v-for="application in applications.data" :key="application.id" class="p-6">
      <!-- Application Card -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Application Details -->
        <div class="p-4">
          <ul>
            <li><strong>ID:</strong> {{ application.id }}</li>
            <li><strong>Resume:</strong> {{ application.resume }}</li>
            <li><strong>Email:</strong> {{ application.app_email }}</li>
            <li><strong>Phone:</strong> {{ application.app_phone }}</li>
          </ul>
        </div>
        <!-- Buttons for Update, Delete, and Show -->
        <div class="flex justify-between px-4 pb-4">
          <button @click="goToUpdateComponent(application.id)"
            class="text-sm text-blue-500 hover:text-blue-700">
            Update
          </button>
          <button @click="deleteComponent(application.id)"
            class="text-sm text-red-500 hover:text-red-700">
            Delete
          </button>
          <button @click="showApplicationDetails(application.id)"
            class="text-sm text-gray-500 hover:text-gray-700">
            Show
          </button>
        </div>
      </div>
    </div>
    <div class="p-6 pt-0">
      <button
        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        type="button">
        Read More
      </button>
    </div>
  </div>
</template>
  
<script>
import ApplicationService from '../services/ApplicationService.js';
import Swal from 'sweetalert2';

export default {
  name: 'getApplications',

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
    },
    goToUpdateComponent(id) {
      this.$router.push({ path: `/edit-applications/${id}` });
    },
    deleteComponent(id) {
      // Display a confirmation dialog using SweetAlert
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this application.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          ApplicationService.deleteApplication(id)
            .then(response => {
              console.log('Application deleted successfully:', response.data.message);
              this.fetchApplications();
            })
            .catch(error => {
              console.error('Error deleting application:', error.response.data.error);
            });
        }
      });
    },
    showApplicationDetails(id) {

      this.$router.push({ path: `/show-applications/${id}` });
      console.log('Application Details:', application);
    }
  }
};
</script>
  
<style scoped>
/* Add your scoped styles here */
</style>
