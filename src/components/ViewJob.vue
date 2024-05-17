<template>
    <main>

        <!-- Hero Area Start-->
        <div class="slider-area head">
        <div class="single-slider section-overly slider-height2 d-flex align-items-center">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="hero-cap text-center">
                            <h2>{{post.category}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- Hero Area End -->
        <!-- job post company Start -->
        <div class="job-post-company pt-120 pb-120 body">
            <div class="container">
                <div class="row justify-content-between">
                    <!-- Left Content -->
                    <div class="col-xl-7 col-lg-8">
                        <!-- job single -->
                        <div class="single-job-items mb-50">
                            <div class="job-items">
                                <div class="job-tittle">
                                    <a href="#">
                                        <h4>{{post.title}}</h4>
                                    </a>
                                    <ul>
                                        <li>{{editDate(post.created_at)}} by {{post.employer.name}}</li>
                                        <li><i class="fas fa-map-marker-alt"></i>{{post.location}}</li>
                                        <li>${{post.salary_range}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                          <!-- job single End -->
                        <div class="job-post-details">
                            <div class="post-details1 mb-50">
                                <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                    <h4>Job Description</h4>
                                </div>
                                <p>{{post.description}}</p>
                            </div>
                            <div class="post-details2  mb-50">
                              <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                  <h4>Responsibilities</h4>
                                </div>
                                <ul>
                                  <li v-for="(responsibility, index) in post.responsibilities" :key="index">{{ responsibility }}</li>
                                </ul>
                            </div>
                            <div class="post-details2  mb-50">
                              <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                  <h4>Skills</h4>
                                </div>
                                <ul>
                                  <li v-for="(skill, index) in post.skills" :key="index">{{ skill }}</li>
                                </ul>
                            </div>
                            <div class="post-details2  mb-50">
                              <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                  <h4>Qualifications</h4>
                                </div>
                                <ul>
                                  <li v-for="(qualification, index) in post.qualifications" :key="index">{{ qualification }}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <!-- Right Content -->
                    <div class="col-xl-4 col-lg-4">
                        <div class="post-details3  mb-50">
                            <!-- Small Section Tittle -->
                           <div class="small-section-tittle">
                               <h4>Job Overview</h4>
                           </div>
                          <ul>
                              <li>Posted date : <span>{{editDate(post.created_at)}}</span></li>
                              <li>Location : <span>{{post.location}}</span></li>
                              <li>Deadline : <span>{{post.deadline}}</span></li>
                              <li>Job nature : <span>{{post.work_type}}</span></li>
                              <li>Salary :  <span>${{post.salary_range}}</span></li>
                          </ul>
                         <div class="apply-btn2">
                            <a href="#" class="btn apply-btn">Apply Now</a>
                         </div>
                       </div>
                        <div class="post-details4  mb-50">
                            <!-- Small Section Tittle -->
                           <div class="small-section-tittle">
                               <h4>Employer Information</h4>
                           </div>
                              <span>{{post.employer.name}}</span>
                              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            <ul>
                              <li>Name: <span>{{post.employer.name}}</span></li>
                              <li>Email: <span>{{post.employer.email}}</span></li>
                            </ul>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- job post company End -->

    </main>    
</template>

<script>
import PostService from '@/services/PostService';

export default {
  data() {
    return {
      post: '',
    };
  },
  methods: {
    viewPost() {
      PostService.getPost(this.$route.params.id)
      .then(res => {
        let post = res.data.data;

        if (post.responsibilities || post.skills || post.qualifications) {
          post.responsibilities = post.responsibilities.split('\n');
          post.skills = post.skills.split('\n');
          post.qualifications = post.qualifications.split('\n');
        }
        this.post = post;
      })
      .catch(err => {
        console.error('Error fetching post:', err);
      });
    },

		editDate(date) {
      const datecreated = new Date(date);
      const year = datecreated.getUTCFullYear();
      const month = String(datecreated.getUTCMonth() + 1).padStart(2, '0');
      const day = String(datecreated.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  created() {
    this.viewPost();
  },
};
</script>

<style scoped>
  .head{
    background-color: #244034;
  }
  .body{
    background-color: #EFF6F3;
  }
</style>