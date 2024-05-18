<template>
  <div style="background-color:#EFF6F3; background-size: cover;">

<div class="h-screen flex justify-center items-center" >
<div class="my-4 rounded-lg p-10  max-w-xl shadow-box-circle bg-[#fafafae5] dark:bg-dark-1000 animate_animated animate_bounceIn">
  <form class="w-full" @submit.prevent="submitApplication">
    <div class="text-xl mb-4 col-span-12 text-green-800 dark:text-green-400">
      <div class="border-b border-gray-300 pb-2 dark:border-dark-600">Application Details</div>
    </div>

    <!-- Status dropdown -->
    <div class="mb-4">
      <label for="status" class="block font-medium text-gray-700 dark:text-dark-200">Status</label>
      <select v-model="formData.status" class="mt-1 block w-full rounded-md border-black border-t-0 border-l-0  focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 outline-none px-4 py-2" required>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <!-- Submit button -->
    <button type="submit" class="font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-green-500 text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">Update Status</button>
  </form>
</div>
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
    status: ''
  },
  newApplication: '' 
};
},
methods: {
async submitApplication() {
  try {
    const response = await ApplicationService.updateApplication(this.$route.params.id, { status: this.formData.status });
    console.log('Status updated successfully:', response.data);
    this.resetForm();
  } catch (error) {
    console.error('Error updating status:', error);
  }
},
resetForm() {
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