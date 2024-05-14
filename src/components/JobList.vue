<template>
  <div class="col-xl-9 col-lg-9 col-md-8">
    <!-- Featured_job_start -->
    <section class="featured-job-area">
        <div class="container">
            <!-- Count of Job list Start -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="count-job mb-35">
                        <span class="pretty-jobs-count">{{jobs.length}} jobs found</span>
                        <!-- Select job items start -->
                        <div class="select-job-items">
                            <span>Sort by</span>
                            <select v-model="selectedSort" @change="sortJobs" class="pretty-select">
                              <option value="">None</option>
                              <option value="title">Title</option>
                              <option value="salary">Salary</option>
                              <option value="date">Date</option>
                            </select>
                        </div>
                        <!--  Select job items End-->
                    </div>
                </div>
            </div>
            <!-- Count of Job list End -->
            <!-- single-job-content -->
            <div v-for="job in sortedJobs" :key="job.id" class="single-job-items mb-30">
                <div class="job-items">
                    <div class="company-img">
                        <a href="#"> <img v-if="job.employer.logo" :src="job.employer.logo" width="70px" height="70px" alt="Employer Logo" />
                            <img v-else src="https://5.imimg.com/data5/SELLER/Default/2023/9/340980630/YL/AL/SM/59465795/company-logo-design-service-500x500.jpg" width="70px" height="70px" alt="Default Logo" /></a>
                    </div>
                    <div class="job-tittle job-tittle2">
                        <a href="#">
                            <h4 >{{ job.title }}</h4>
                        </a>
                        <ul>
                            <li>{{ job.employer.name }}</li>
                            <li><i class="bi bi-geo-alt-fill"></i>{{ job.location }}</li>
                            <li>Salary: {{ job.salary_range }}</li>
                        </ul>
                    </div>
                </div>
                <div class="items-link items-link2 f-right">
                    <a href="job_details.html">{{ job.work_type }}</a>
                    <span class="job-deadline">Deadline: {{ job.deadline }}</span>
                </div>
            </div>
            
            <!-- single-job-content -->
         <!--Pagination Start  -->
<div class="pagination-area pb-115 text-center">
  <div class="container">
  <div class="row">
  <div class="col-xl-12">
      <div class="single-wrap d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-start">
              <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
                <a class="page-link" @click.prevent="search(pagination.currentPage - 1)">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in pagination.lastPage"
                :key="page"
                :class="{ active: pagination.currentPage === page }"
              >
                <a class="page-link" @click.prevent="search( page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.lastPage }">
                <a class="page-link" @click.prevent="search( pagination.currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
      </div>
  </div>
  </div>
  </div>
  </div>
<!--Pagination End  -->


            </div>
            </section>
          
          </div>
            

 
 
<!-- Job List Area End -->
 

  </template>
  
  <script>
  import JobService from '../services/JobService.js';
  export default {
    props: {
      jobs: {
        type: Array,
        required: true
      },
      pagination: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },

    },
     data() {
    return {
      selectedSort: '',  
    };
  },
  computed: {
    sortedJobs() {
       
      if (this.selectedSort) {
         
        return this.jobs.sort((a, b) => {
           
          if (this.selectedSort === 'title') {
            return a.title.localeCompare(b.title);
          } else if (this.selectedSort === 'salary') {
            return a.salary_range - b.salary_range;
          } else if (this.selectedSort === 'date') {
            return new Date(a.deadline) - new Date(b.deadline);
          }
        });
      } else {
        // If no sort option selected, return the original jobs array
        return this.jobs;
      }
    }
  },
  methods:{
    async search(page = 1) {
        try {
          const response = await JobService.searchJobs(this.filters, page);
          console.log(response);
           this.$emit('search-results', response , this.filters);
         } catch (error) {
           console.error('Error fetching jobs:', error);
         }
    },
  },
  };
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  .items-link a {
    color: #244034 !important;
    border: 1px solid #d2f34c !important;
  }

  .items-link a:hover {
    color: #244034 !important;
    background-color: #d2f34c !important;
  }
  img{
    border: 1px solid #244034 !important;
  }


  .pretty-jobs-count {
    color: #4a4a4a; /* Dark gray for good visibility */
    font-size: 16px; /* Moderate text size */
    padding: 5px 10px; /* Smaller padding for a compact look */
    border: 1px solid #ddd; /* Subtle border for definition */
    border-radius: 5px; /* Slight rounding of corners */
    font-family: 'Helvetica', sans-serif; /* Clean and professional font */
    display: inline-block; /* Keeps background and padding effective */
    margin: 5px; /* Minimal spacing from other elements */
  }


  .select-job-items {
    display: flex;
    align-items: center;
    font-family: 'Arial', sans-serif;
    margin-bottom: 10px; /* Adjusts spacing below the container */
}

.select-job-items span {
    margin-right: 10px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
}

.pretty-select {
    padding: 8px 12px;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: border-color 0.3s ease-in-out;
}

.pretty-select:focus {
    outline: none;
    border-color: #d2f34c; /* Focus color that indicates active element */
}

.pretty-select:hover {
    border-color: #d2f34c; /* Slightly lighter blue on hover for visual feedback */
}

.job-deadline {
  font-size: 14px;
  color: #888;
  font-style: italic;
  /* Add any additional styling you want */
}



  
  </style>
  