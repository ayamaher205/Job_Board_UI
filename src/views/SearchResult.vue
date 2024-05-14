<template>
    <div>
      <h1>Welcome to Job Search</h1>
      <SearchBar @search-results="handleSearchResults" />
      <JobList :jobs="jobs" />
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
      };
    },
    methods: {
      handleSearchResults(results) {
        console.log('Search results:', results);
        this.$router.push({ name: 'searchResult', query: { results: JSON.stringify(results) } });
      },
    },
    watch: {
    '$route.query.results'(newValue) {
      if (newValue) {
        const results = JSON.parse(newValue);
        this.jobs = results.data;
      }
    },
  },
  };
  </script>
  