<template>
    <div class="jobs-page">
      <filters-sidebar @apply-filters="fetchJobs" />
      <job-list :jobs="jobs" />
    </div>
  </template>
  
  <script>
  import JobList from '../components/JobList.vue';
  import FiltersSidebar from '../components/FiltersSidebar.vue';
  import JobService from '../services/JobService.js';
  
  export default {
    components: { JobList, FiltersSidebar },
    data() {
      return {
        jobs: [],
      };
    },
    methods: {
      async fetchJobs(filters) {
        try {
          const response = await JobService.searchJobs(filters);
          this.jobs = response.data;
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      }
    }
  };
  </script>
  