 <template>
    <div>
      <h1>Welcome to Job Search</h1>
      <!-- Display the SearchBar component here -->
      <SearchBar @search-results="handleSearchResults" />
    </div>
  </template>
  
  <script>
  import SearchBar from '../components/SearchBar.vue';
  
  export default {
    components: {
      SearchBar,
    },
    methods: {
      handleSearchResults(results) {
        // Handle search results, e.g., display them on the page
        console.log('Search results:', results);
      },
    },
  };
  </script>
  