<template>
    <div>
       
      <SearchBar @search-results="handleSearchResults" />
       
      <JobList v-if="jobs.length > 0" :jobs="jobs" :pagination="pagination" :filters="filters" @search-results="handleSearchResults" />
      <div v-else class="no-jobs">
        <p>No jobs found. Please try different filters.</p>
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from '../components/SearchBar.vue';
  import JobList from '../components/JobList.vue';
  
  export default {
    components: {
      SearchBar,
      JobList,
    },
    data() {
      return {
        jobs: [],
        pagination: {},
        filters:{},
      };
    },
    methods: {
      handleSearchResults(results,filters) {
        console.log('Search results:', results,filters);
        this.filters=filters;
        this.$router.push({ name: 'searchResult', query: { results: JSON.stringify(results) } });
      },
    },
    watch: {
    // '$route.query.results'(newValue) {
    //   if (newValue) {
    //     const results = JSON.parse(newValue);
    //     this.jobs = results.data;
    //     console.log( this.jobs);
    //   }
    // },

    '$route.query.results': {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const results = JSON.parse(newValue);
          this.jobs = results.data.data;

          this.pagination = {
          currentPage: results.data.current_page,
          lastPage: results.data.last_page,
          nextPageUrl: results.data.next_page_url,
          prevPageUrl: results.data.prev_page_url,
        };

          console.log( this.jobs);
          console.log( this.pagination);
        }
      },
    },
  },
  };
  </script>
  <style scoped>
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
  