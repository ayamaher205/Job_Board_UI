<template>
  <div class="jobs-page">
    <!-- Filters sidebar for selecting job criteria -->
    <filters-sidebar @apply-filters="fetchJobs" />
    <!-- Displays a loading indicator when data is being fetched -->
    <div v-if="isLoading" class="loading">
      Loading jobs...
    </div>
    <!-- Handles job list display or shows an error message -->
    <div v-else>
      <job-list v-if="jobs.length > 0" :jobs="jobs" />
      <div v-else class="no-jobs">
        No jobs found. Try adjusting your filters.
      </div>
    </div>
    <div v-if="errorMessage" class="error">
      Error: {{ errorMessage }}
    </div>
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
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async fetchJobs(filters) {
      this.isLoading = true;
      this.errorMessage = '';  
      try {
        const response = await JobService.searchJobs(filters);
        console.log(response.data.data);
        this.jobs = response.data.data;
       
        this.isLoading = false;
      } catch (error) {
        this.errorMessage = 'Failed to fetch jobs. Please try again later.';
        this.jobs = [];  
        this.isLoading = false;
        console.error('Error fetching jobs:', error);
      }
    }
  },
  created() {
    this.fetchJobs({});  
  }
};
</script>

<style scoped>
.loading, .no-jobs, .error {
  text-align: center;
  margin-top: 20px;
}
</style>
