<template>
  <main>   
  <div class="job-listing-area pt-120 pb-120">
    <div class="container">
        <div class="row">
   
    <!-- Filters sidebar for selecting job criteria -->
    <filters-sidebar @apply-filters="fetchJobs" />
    <job-list v-if="jobs.length > 0" :jobs="jobs" :pagination="pagination" :filters="filters" @search-results="fetchJobsResults" />
    
  </div>
  </div>
  </div>
</main>
  
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
      pagination: {},
      filters:{},
    };
  },
  methods: {
    async fetchJobs(filters) {
      this.isLoading = true;
      this.errorMessage = '';  
      try {
        const response = await JobService.searchJobs(filters);
        this.filters=filters;
        console.log(this.filters);
        console.log(response.data.data);
        this.jobs = response.data.data;
        this.pagination = {
          currentPage: response.data.current_page,
          lastPage:  response.data.last_page,
          nextPageUrl:  response.data.next_page_url,
          prevPageUrl:  response.data.prev_page_url,
        };
       
        this.isLoading = false;
      } catch (error) {
        this.errorMessage = 'Failed to fetch jobs. Please try again later.';
        this.jobs = [];  
        this.isLoading = false;
        console.error('Error fetching jobs:', error);
      }
    },
    fetchJobsResults(results,filters) {
        console.log('Search results:', results,filters);
        this.filters=filters;
        this.jobs=results.data.data;
        this.pagination = {
          currentPage: results.data.current_page,
          lastPage: results.data.last_page,
          nextPageUrl: results.data.next_page_url,
          prevPageUrl: results.data.prev_page_url,
        };
      },
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
