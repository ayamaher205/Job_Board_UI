 <template>

  <header>
    <!-- Header Start -->
    <div class="header-area header-transparrent">
      <div class="headder-top header-sticky">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-2">
              <!-- Logo -->
              <div class="logo">
                <!-- <a href="index.html"><img src="assets/img/logo/logo.png"></a> -->
              </div>
            </div>
            <div class="col-lg-9 col-md-9">
              <div class="menu-wrapper">
                <!-- Main-menu -->
                <div class="main-menu">
                  <nav class="d-none d-lg-block">
                    <ul id="navigation">
                      <li> <router-link :to="'/'"> Home </router-link> </li>
                      <li> <router-link :to="'/jobs'"> Find a Job </router-link> </li>
                      <li><a href="#">Page</a>
                        <ul class="submenu">
                          <li><a href="blog.html">Blog</a></li>
                          <li><a href="single-blog.html">Blog Details</a></li>
                          <li><a href="elements.html">Elements</a></li>
                          <li><a href="job_details.html">job Details</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </nav>
                </div>
                <!-- Header-btn -->
                <div class="header-btn d-none f-right d-lg-block">
                    <router-link class="btn head-btn2" :to="'/register'"> Register </router-link>
                    <router-link class="btn head-btn2" :to="'/login'"> Login </router-link>
                    <a @click.prevent="showAlert()"  class="btn head-btn2" href="logout">job Details</a>
                </div>
              </div>
            </div>
            <!-- Mobile Menu -->
            <div class="col-12">
              <div class="mobile_menu d-block d-lg-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header End -->
  </header>

 </template>

 <script>
import { RouterLink } from 'vue-router';
import AuthService from '../services/AuthService';
export default{
  methods:{
    showAlert(){
      this.$swal({
        title: "You Logged out Succefully!!",
        //text: "That thing is still around?",
        icon: "info"
      }).then((result) => {
        if (result.isConfirmed) {
          AuthService.logout();
        }
      });
    },
  }
}
</script>