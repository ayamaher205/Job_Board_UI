<template>
    <div>  
         
         <div class="our-services section-pad-t30">
            <div class="container">
              
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>FEATURED TOURS Packages</span>
                            <h2> Top Categories </h2>
                        </div>
                    </div>
                </div>
              
                <div class="row d-flex justify-contnet-center" >
                    <div  v-for="category in categories.slice(0, 8)" :key="category.id"  class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="services-cap">
                               <h5> {{ category.name }} </h5>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                 
                <div class="row">
                    <div class="col-lg-12">
                        <div class="browse-btn2 text-center mt-50">
                             
                            <router-link to="/jobs" class="border-btn2">Browse All Jobs</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
     <div class="online-cv cv-bg section-overly pt-90 pb-120"  data-background="assets/img/gallery/cv_bg.jpg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <div class="cv-caption text-center">
                        <p class="pera1">FEATURED TOURS Packages</p>
                        <p class="pera2"> Make a Difference with Your Online Resume!</p>
                        
                        <router-link @click="apply" to="/applications" class="border-btn2 border-btn4">Upload your cv</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
     
    <section class="featured-job-area feature-padding">
        <div class="container">
             
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-tittle text-center">
                        <span>Recent Job</span>
                        <h2>Featured Jobs</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-xl-10">
                   
               
              <div v-for="job in jobs" :key="job.id" class="single-job-items mb-30">
                  <div class="job-items">
                      <div class="company-img">
                          <router-link :to="{ name: 'job-details', params: { id: job.id } }"> <img v-if="job.employer.profile_photo_url" :src="job.employer.logo" width="70px" height="70px" alt="Employer Logo" />
                              <img v-else src="https://5.imimg.com/data5/SELLER/Default/2023/9/340980630/YL/AL/SM/59465795/company-logo-design-service-500x500.jpg" width="70px" height="70px" alt="Default Logo" /></router-link>
                      </div>
                      <div class="job-tittle job-tittle2">
                        <router-link :to="{ name: 'job-details', params: { id: job.id } }">
                              <h4 >{{ job.title }}</h4>
                        </router-link>
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
              </div>
              </div>
              
              </div>
              </section>

               
        <div class="apply-process-area apply-bg pt-150 pb-150" data-background="assets/img/gallery/how-applybg.png">
            <div class="container">
              
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle white-text text-center">
                            <span>Apply process</span>
                            <h2> How it works</h2>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-search"></span>
                            </div>
                            <div class="process-cap">
                               <h5>1. Search a job</h5>
                               <p>Research companies, tailor your resume, and apply through job sites and networks. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-curriculum-vitae"></span>
                            </div>
                            <div class="process-cap">
                               <h5>2. Apply for job</h5>
                               <p>Tailor your resume , then submit your application through the company’s portal or via email.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="process-cap">
                               <h5>3. Get your job</h5>
                               <p>Prepare for interviews, follow up with employers, and negotiate your offer. Celebrate your success!</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
         
            
            </div>
         
  
   
   
  
   
  
    </template>
    
    <script>
    import { RouterLink, useRouter } from 'vue-router';
   
    export default {
      props: {
        jobs: {
          type: Array,
          required: true
        } ,
        categories: {
          type: Array,
          required: true
        }
      },
       data() {
      return {
        
      };
    },
    methods: {
     
    async apply() {
      console.log(localStorage.getItem('token'));
      if (this.isAuthenticated()) {
 
        this.$router.push('/applications');
      } else {
        
        this.$router.push('/login');
      }
    },
    isAuthenticated() {
      console.log(localStorage.getItem('token'));
      return localStorage.getItem('token') !== null; 
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
        color: #4a4a4a;  
        font-size: 16px;  
        padding: 5px 10px;  
        border: 1px solid #ddd;  
        border-radius: 5px; 
        font-family: 'Helvetica', sans-serif;  
        display: inline-block; 
        margin: 5px;  
      }
    
    
      .select-job-items {
        display: flex;
        align-items: center;
        font-family: 'Arial', sans-serif;
        margin-bottom: 10px;  
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
        border-color: #d2f34c;  
    }
    
    .pretty-select:hover {
        border-color: #d2f34c; 
    }
    
    .job-deadline {
      font-size: 14px;
      color: #888;
      font-style: italic;
      
    }
    
    
    .our-services .single-services .services-ion span {
        font-size: 60px;
        margin-bottom: 13px;
        color: #244034;
    }
    .our-services .single-services .services-ion span:hover {
        font-size: 60px;
        margin-bottom: 13px;
        color: #b9d640 ;
    }
    .our-services .single-services .services-cap h5 a {
        font-weight: 600;
        font-size: 18px;
        color: #244034;
    }
    
  
    .section-tittle h2 {
        color: #244034;
    }


.section-tittle span {
    color: #20c997 !important;
    
}

.border-btn2 {
    border: 1px solid #20c997;
    color: #20c997;
}
 

.border-btn2::before {
    border: 1px solid transparent;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 101%;
    height: 101%;
    background: #d2f34c ;
}

.section-overly::before {
    position: absolute;
    content: "";
    background-color: #f2f9d8;
}

.online-cv .cv-caption .pera2 {
    font-family: "Muli", sans-serif;
    color: #20c997;
}

.online-cv .cv-caption .pera1 {
    font-family: "Muli", sans-serif;
    color: #20c997;
}
#scrollUp {
    background: #244034 !important;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: #244034 !important;
}

.apply-process-area .single-process {
    padding: 44px 28px;
    background: #244034 !important;
}

.our-services .single-services:hover {
    background:#d2f34c ;
    color:#244034;
}
    
    </style>
    