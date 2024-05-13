<template>
    <div>
      <!-- Sidebar filters -->
      <!-- Category -->
      <label>Category:</label>
      <select v-model="selectedCategory">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <!-- Work type -->
      <label>Work Type:</label>
      <select v-model="selectedWorkType">
        <option value="">Select Work Type</option>
        <option value="offline">Offline</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
      </select>
      <!-- Skills -->
      <label>Skills:</label>
      <input type="text" v-model="selectedSkills" placeholder="Enter skills">
       <!-- deadline -->
       <label for="deadline">Deadline:</label>
       <input type="date" v-model="selectedDeadline">
      <!-- Salary range -->
      <label>Salary Range:</label>
      <input type="range" v-model="salaryRange" min="0" max="100000" step="1000">
      <span>{{ salaryRange }}</span>
      <!-- Apply button -->
      <button @click="applyFilters">Apply Filters</button>
    </div>
  </template>
  
  <script>
  import JobService from '../services/JobService.js';
  export default {
    data() {
      return {
        selectedCategory: '',
        categories: [],  
        selectedWorkType: '',
        skills: '',  
        selectedSkills: '',
        selectedDeadline: '',
        salaryRange: 0
      };
    },
    
    created() {
       
      this.fetchCategories();
       
    },
    methods: {
        
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
       
      applyFilters() {
      
        this.$emit('apply-filters', { 
          category: this.selectedCategory, 
          work_type: this.selectedWorkType,
          skills: this.selectedSkills,
          salary_range: this.salaryRange ,
          deadline: this.selectedDeadline
        });
      }
    }
  };
  </script>
  
  <style scoped>
   
  </style>
  