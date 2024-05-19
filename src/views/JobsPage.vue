<template>
  <main>   
       <div class="slider-area ">
        <div class="single-slider section-overly slider-height2 d-flex align-items-center" data-background="../..assets/img/hero/about.jpg">
          <!-- <div class="single-slider section-overly slider-height2 d-flex align-items-center" :style="{ backgroundImage: `url(${require('@/assets/img/hero/about.jpg')})` }">  -->
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="hero-cap text-center">
                            <h2>Get your job</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
  <div class="job-listing-area pt-120 pb-120">
    
    <div class="container">
        <div class="row">
   
    
    <filters-sidebar @apply-filters="fetchJobs" />
    <job-list v-if="jobs.length > 0" :jobs="jobs" :pagination="pagination" :filters="filters" @search-results="fetchJobsResults" />
      <div v-else class="no-jobs">
        <p>No jobs found. Please try different filters.</p>
      </div>
    
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
.section-overly::before {
   
  background-color: rgba(36, 64, 52, 0.8) !important;
}

.no-jobs {
  text-align: center;
  padding: 50px;
  background-color: #f8f9fa;
  border: 2px dashed #6c757d;
  border-radius: 10px;
  color: #343a40;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  transition: all 0.3s ease;
}

.no-jobs p {
  margin: 0;
}

.no-jobs:hover {
  background-color: #e9ecef;
  border-color: #495057;
  color: #212529;
}

</style>