 
 <template>  
 <main>  
  
 <div class="slider-area ">
    <div class="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="hero-cap text-center">
                        <h2>{{ post.title }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  
    <div class="job-post-company pt-120 pb-120">
        <div class="container">
            <div class="row justify-content-between">
              
                <div class="col-xl-7 col-lg-8">
                 
                    <div class="single-job-items mb-50">
                        <div class="job-items">
                            <div class="company-img company-img-details">
                                <!-- <a href="#"><img src="assets/img/icon/job-list1.png" alt=""></a> -->
                            </div>
                            <div class="job-tittle">
                                <a href="#">
                                    <h4>{{ post.title }}</h4>
                                </a>
                                <ul>
                                    <li>{{ post.employer.name }}</li>
                                    <li><i class="bi bi-geo-alt-fill"></i>{{ post.location }}</li>
                                    <li>Salary: {{ post.salary_range }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                      
                   
                    <div class="job-post-details">
                        <div class="post-details1 mb-50">
                       
                            <div class="small-section-tittle">
                                <h4>Job Description</h4>
                            </div>
                            <p> {{ post.description }}</p>
                        </div>
                        <div class="post-details2  mb-50">
                             
                            <div class="small-section-tittle">
                                <h4>Required Knowledge, Skills, and Qualifications</h4>
                            </div>
                           <ul>
                               <li> {{ post.qualifications }}</li>
                               <li>{{ post.skills }}</li>
                               
                           </ul>
                        </div>
                      
                    </div>

                </div>
                
                <div class="col-xl-4 col-lg-4">
                    <div class="post-details3  mb-50">
                         
                       <div class="small-section-tittle">
                           <h4>Job Overview</h4>
                       </div>
                      <ul>
                          <li>Deadline : <span>{{ post.deadline }}</span></li>
                          <li>Location : <span>{{ post.location }}</span></li>
                          <li>Job nature : <span>{{ post.work_type }}</span></li>
                          <li>Salary :  <span>{{ post.salary_range }}</span></li>
                      
                      </ul>
                     <div class="apply-btn2">
                        
                        <router-link @click="apply" to="/applications" class="btn">Apply Now</router-link>
                     </div>
                   </div>
                    <div class="post-details4  mb-50">
                        
                       <div class="small-section-tittle">
                           <h4>Company Information</h4>
                       </div>
                          <span>{{post.industry}}</span>
                        <ul>
                            <li>Name: <span>{{post.employer}} </span></li>
                            <li>Web : <span> {{post.image}}</span></li>
                            <li>Email: <span>{{post.email}}</span></li>
                        </ul>
                   </div>
                </div>
            </div>
        </div>
    </div>
   

</main>
</template>
<script>  
import axios from 'axios';
import { useRouter } from 'vue-router';


export default {
  data() {
    return {
      post: null,
    };
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`);
        console.log(response);
        this.post = response.data.data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
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
  created() {
    this.fetchPost();
  },
};
</script>

<style scoped>
 
.section-overly::before {
   
    background-color: rgba(36, 64, 52, 0.8) !important;
  }
  .btn {
    background-image: linear-gradient(to right, #244034 0%, #496709 100%);  
    border: none;  
    color: white;  
    padding: 10px 20px;  
    font-size: 16px;  
    font-weight: bold;  
    border-radius: 30px; 
    cursor: pointer;  
    transition: transform 0.2s, box-shadow 0.2s;  
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);  
  }
  
  .btn:hover {
    transform: translateY(-2px);  
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2); 
  }
  
  .btn:active {
    transform: translateY(1px);  
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  
  }
  .btn::before {
    background: #b9d640;
    color:#244034;
  }
</style>
