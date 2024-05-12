<template>
    <div>
      <div v-if="jobs.length > 0">
        <h2>List of Jobs</h2>
        <ul>
          <li v-for="job in jobs" :key="job.id">{{ job.title }}</li>
        </ul>
      </div>
      <div v-else>
        <p>No jobs found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      jobs: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles if needed */
  </style>
  