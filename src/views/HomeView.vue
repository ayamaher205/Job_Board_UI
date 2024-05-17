<template>
  <div>
    <SearchBar @search-results="handleSearchResults" />
    <RecentPosts :jobs="jobs" :categories="categories" />
    
    
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import JobService from '../services/JobService.js';
  import RecentPosts from '../components/RecentPosts.vue';
 

export default {
  components: {
    SearchBar,
    RecentPosts,
    
     
  },
  data() {
    return {
      jobs: [],
      categories:[],
    };
  },
  methods: {
    handleSearchResults(results) {
      console.log('Search results:', results);
       this.$router.push({ name: 'searchResult', query: { results: JSON.stringify(results) } });
    },

    async fetchRecentPosts() {
      try {
        const response = await JobService.getRecentPosts();
        console.log(response);
        this.jobs = response.data;
     
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await JobService.getCategories();
        console.log(response);
        this.categories = response.data;
        this.categories = response.data.map(category => category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  },
},
  created() {
    this.fetchRecentPosts({}); 
    this.fetchCategories() 
    
  }
};
</script>
