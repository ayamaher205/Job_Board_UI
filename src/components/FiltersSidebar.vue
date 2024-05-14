<template>
   
            <!-- Left content -->
            <div class="col-xl-3 col-lg-3 col-md-4">
                <div class="row">
                    <div class="col-12">
                            <div class="small-section-tittle2 mb-45">
                            <div class="ion"> <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="20px" height="12px">
                            <path fill-rule="evenodd"  fill="rgb(27, 207, 107)"
                                d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"/>
                            </svg>
                            </div>
                            <h4>Filter Jobs</h4>
                        </div>
                    </div>
                </div>
                <!-- Job Category Listing start -->
                <div class="job-category-listing mb-50 ">
                    <!-- single one -->
                    <div class="single-listing">
                       <div class="small-section-tittle2">
                             <h4>Job Category</h4>
                       </div>
                        <!-- Select job items start -->
                        <div class="select-job-items2">
                            <select v-model="selectedCategory" name="select" class="pretty">
                                <option value="">All Categories</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <!--  Select job items End-->
                        <!-- select-Categories start -->
                        <div class="select-Categories pt-80 pb-50">
                            <div class="small-section-tittle2">
                                <h4>Job Type</h4>
                            </div>
                            <label class="container">Offline
                                <input type="checkbox" v-model="selectedWorkType" value="offline" >
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Remote
                                <input type="checkbox" checked="checked active" v-model="selectedWorkType" value="remote">
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Hybrid
                                <input type="checkbox" v-model="selectedWorkType" value="hybrid">
                                <span class="checkmark"></span>
                            </label>
                            
                        </div>
                        <!-- select-Categories End -->
                    </div>
                    <!-- single two -->
                    <div class="single-listing">
                       <div class="small-section-tittle2">
                             <h4>Job Location</h4>
                       </div>
                        <!-- Select job items start -->
                        <div class="select-job-items2">
                            <select v-model="selectedLocation" name="select" class="pretty">
                                <option value="">Anywhere</option>
                                <option v-for="location in locations" :key="location" :value="location" name="location">{{ location }}</option>
                            </select>
                        </div>
                        <!--  Select job items End-->
                        <!-- select-Categories start -->
                        <div class="select-Categories pt-80 pb-50">
                            <div class="small-section-tittle2">
                                <h4>Skills</h4>
                            </div>
                            <input type="text" v-model="selectedSkills" placeholder="Enter skills" class="pretty">
                        </div>
                        <!-- select-Categories End -->
                    </div>
                    <!-- single three -->
                    <div class="single-listing">
                        <!-- select-Categories start -->
                        <div class="select-Categories pb-50">
                            <div class="small-section-tittle2">
                                <h4>Deadline</h4>
                            </div>
                            <input type="date" v-model="selectedDeadline" class="pretty">
                        </div>
                        <!-- select-Categories End -->
                    </div>
                    <div class="single-listing">
                        <!-- Range Slider Start -->
                        <aside class="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow">
                            <div class="small-section-tittle2">
                                <h4>Salary Range</h4>
                            </div>
                            <div class="widgets_inner">
                                <div class="range_item">
                                    <input  class="js-range-slider colorful-slider" type="range" v-model="salaryRange" min="0" max="100000" step="1000" >
                                    <span>{{ salaryRange }}</span>
                                </div>
                            </div>
                        </aside>
                      <!-- Range Slider End -->
                    </div>
                    <button class="pretty-button" @click="applyFilters">Apply Filters</button>
                </div>
                <!-- Job Category Listing End -->
            </div>
           
            
  </template>
  
  <script>
  import JobService from '../services/JobService.js';
  export default {
    data() {
      return {
        selectedCategory: '',
        categories: [], 
        selectedLocation:'',
        locations: [], 
        selectedWorkType: [],
        skills: '',  
        selectedSkills: '',
        selectedDeadline: '',
        salaryRange: 0
      };
    },
    
    created() {
       
      this.fetchCategories();
      this.fetchLocations();
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
       
      applyFilters() {
      
        this.$emit('apply-filters', { 
          category: this.selectedCategory, 
          location: this.selectedLocation,
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
  .pretty {
    width: 200px !important;
    max-width: 200px;
    padding: 8px;  
    border: 1px solid #ccc;  
    border-radius: 5px;  
    box-sizing: border-box; 
    font-size: 14px; 
  }

  .container input:checked ~ .checkmark {
    background-color: #d2f34c !important; /* Change to a different background color when checked */
}


.colorful-slider {
  -webkit-appearance: none; 
  appearance: none;
  width: 100%;  
  height: 8px; 
  background:  #d2f34c;  
  outline: none;  
  opacity: 0.9; 
  transition: opacity 0.2s; 
}

/* Hover effect */
.colorful-slider:hover {
  color: #244034 !important;
  opacity: 1;
}

.pretty-button {
  background-image: linear-gradient(to right, #244034 0%, #496709 100%); /* Gradient background */
  border: none; /* No border */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding around the text */
  font-size: 16px; /* Text size */
  font-weight: bold; /* Font weight */
  border-radius: 30px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: transform 0.2s, box-shadow 0.2s; /* Smooth transitions for hover effects */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); /* Subtle shadow for depth */
}

.pretty-button:hover {
  transform: translateY(-2px); /* Slightly raise the button when hovered */
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2); /* Increase shadow for lifting effect */
}

.pretty-button:active {
  transform: translateY(1px); /* Slightly press the button when clicked */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Decrease shadow to mimic pressing */
}

 
  </style>
  