<template>
    <div style="background-color:#EFF6F3; background-size: cover;">
      <div class="typing-animation flex justify-center items-center h-full">
      <div class="p-6">

        <h1 id="typing-text" class="p-6 text-2xl font-bold text-[#180a0af6]" style="color:#180a0af6"> 
        </h1>

  <div class="row w-full mx-auto">
    <div v-for="application in applications.data" :key="application.id" class="p-6 col-12 col-md-6 col-lg-4">
    <!-- Application Card -->
    <div class=" bg-[#fafafae5] shadow-lg rounded-lg overflow-hidden">
      <!-- Application Details -->
      <div class="p-4">
        <ul>
          <li><strong>ID:</strong> {{ application.id }}</li>
          <li><strong>Email:</strong> {{ application.app_email }}</li>
          <li><strong>Phone:</strong> {{ application.app_phone }}</li>
        </ul>
      </div>
    </div>      
    <div class="row w-full mx-auto">
      <div v-for="application in applications.data" :key="application.id" class="p-6 col-12 col-md-6 col-lg-4">
      <!-- Application Card -->
      <div class=" bg-[#fafafae5] shadow-lg rounded-lg overflow-hidden">
        <!-- Application Details -->
        <div class="p-4">
          <ul>
            <li><strong>ID:</strong> {{ application.id }}</li>
            <li><strong>Email:</strong> {{ application.app_email }}</li>
            <li><strong>Phone:</strong> {{ application.app_phone }}</li>
            <li><strong>Status:</strong> {{ application.status }}</li>

          </ul>
        </div>
        <!-- Buttons for Update, Delete, and Show -->
        <div class="flex justify-between px-6 pb-4">
  <!-- Update Button -->
  <!-- <button @click="goToUpdateComponent(application.id)"
    class="text-sm text-blue-500 hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md">
    Update
  </button> -->

  <!-- Delete Button -->
  <button @click="deleteComponent(application.id)"
    class="text-sm text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md">
    Delete
  </button>

  <!-- Show Button -->
  <button @click="showApplicationDetails(application.id)"
    class="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">
    Show
  </button>
</div>

      </div>
    </div>
  </div>
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
  this.fetchApplications(),
  this.typingEffect();

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
    this.$router.push({path:`/edit-applications/${id}`});
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

    this.$router.push({ path:`/show-applications/${id}` });
    console.log('Application Details:', application);
  }, typingEffect() {
    const text = "Candidate applications you can receive, edit, or delete.";
    let index = 0;
    const speed = 50; 

    const typeWriter = () => {
      if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();}
}
};
</script>

<style scoped>
.typing-animation {
position: relative;
}

.typing-text {
border-right: 2px solid transparent; 
white-space: nowrap;
overflow: hidden;
animation: typing 5s steps(40, end); 
margin: auto; 
width: fit-content; 
}

@keyframes typing {
from {
  width: 0;
}
to {
  width: 100%;
}
}
</style>