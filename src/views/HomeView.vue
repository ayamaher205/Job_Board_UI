<template>
  <div>
    <h1>Welcome to Job Search</h1>
    <SearchBar @search-results="handleSearchResults" />
    
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
 

export default {
  components: {
    SearchBar,
     
  },
  data() {
    return {
       
    };
  },
  methods: {
    handleSearchResults(results) {
      console.log('Search results:', results);
       this.$router.push({ name: 'searchResult', query: { results: JSON.stringify(results) } });
    },
  },
};
</script>
