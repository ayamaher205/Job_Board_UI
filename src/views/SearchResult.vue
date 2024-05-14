<template>
    <div>
       
      <SearchBar @search-results="handleSearchResults" />
      <!-- <JobList  :jobs="jobs" /> -->
      <JobList :jobs="jobs" :pagination="pagination" :filters="filters" @search-results="handleSearchResults" />
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
  