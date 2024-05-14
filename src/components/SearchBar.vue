<template>
 


  <div class="slider-area ">
    <!-- Mobile Menu -->
    <div class="slider-active">
        <div class="single-slider slider-height d-flex align-items-center" data-background="assets/img/hero/h1_hero.jpg">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-9 col-md-10">
                        <div class="hero__caption">
                            <h1>Find the most exciting startup jobs</h1>
                        </div>
                    </div>
                </div>
                <!-- Search Box -->
                <div class="row">
                    <div class="col-xl-8">
                        <!-- form -->
                        <form action="#" class="search-box">
                            <div class="input-form">
                                <input v-model="filters.keywords" placeholder="Job Tittle or keyword">
                            </div>
                            <div class="select-form">
                              <div class="select-fix">  
                                <div class="select-itms">
                                    <select v-model="filters.location" name="select" id="select1" class="loc">
                                        <option value="">Select Location</option>
                                        <option v-for="location in locations" :key="location" :value="location" name="location">{{ location }}</option>
                                    </select>
                                </div>
                                <div class="select-itms">
                                  <select v-model="filters.category" name="select" id="select1" class="loc">
                                      <option value="">Select Category</option>
                                      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                  </select>
                              </div>
                            </div>
                          </div>
                            <div class="search-form">
                                <a @click="search">Search</a>
                            </div>	
                        </form>	
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- slider Area End-->
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
      // async search() {
      //   try {
      //     const response = await JobService.searchJobs(this.filters);
      //     this.$emit('search-results', response.data);
      //   } catch (error) {
      //     console.error('Error fetching jobs:', error);
      //   }
      // },

      async search(page = 1) {
        try {
          const response = await JobService.searchJobs(this.filters, page);
           this.$emit('search-results', response, this.filters);
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

  <style scoped>
  

  form.search-box .search-form a {
    background: #d2f34c !important;
    color: #000 ;
 
  }

  form.search-box .search-form a:hover {
   
    background: #20c997 !important;
    color: #fff ;
  }
  .slider-area .hero__caption h1 {
    font-size: 80px;
    font-weight: 900;
    margin-bottom: 78px;
    color: #fff;
    
  }
  .slider-area{
    background: #244034;
  }

  

 .select-fix{
  height: 70px;
  width: 100%;
  color: #777777;
  font-size: 18px;
  font-weight: 400;
  padding: 9px 33px 9px 32px;
  border: none;
  border-radius: 0px;
  position: relative;
  background-color: #fff;
 }

 .select-itms .loc{
  width: 200px !important;
    max-width: 200px;
     
    border: 1px solid #ccc;  
    border-radius: 5px;  
    box-sizing: border-box; 
    font-size: 14px; 
 }
  
  
</style>