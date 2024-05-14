<template>
    <div>
      <input v-model="filters.keywords" placeholder="Job Title or Keywords">
      <select v-model="filters.location">
        <option value="">Select Location</option>
        <option v-for="location in locations" :key="location" :value="location" name="location">{{ location }}</option>
      </select>
      <select v-model="filters.category">
        <option  value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <button @click="search">Search</button>
    </div>
  </template>
  
  <script>
  import JobService from '../services/JobService.js';
  
  export default {
    data() {
      return {
        filters: {
          keywords: '',
          location: '',
          category: ''
        },
        locations: [],
        categories: []
      };
    },
    methods: {
        async fetchLocations() {
      try {
        const response = await JobService.getLocations();
        console.log(response);
        this.locations = response.data.map(location => location.location);
      } catch (error) {
        console.error('Error fetching locations:', error);
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
      async search() {
        try {
          const response = await JobService.searchJobs(this.filters);
          this.$emit('search-results', response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      },
   
    },
    created() {
    this.fetchLocations(); 
    this.fetchCategories(); 
    
  }
  };
  </script>
  