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
                    </ul>
                  </nav>
                </div>
                <!-- Header-btn -->
                <div class="header-btn d-none f-right d-lg-block">
                    <div v-if="isAuthenticated">
                      <router-link class="btn head-btn2" :to="'/candidate/profile/store'"> Profile </router-link>
                      <a @click.prevent="showAlert()"  class="btn head-btn2" href="logout"> Logout </a>
                    </div>
                    <div v-else>
                      <router-link class="btn head-btn2" :to="'/register'"> Register </router-link>
                      <router-link class="btn head-btn2" :to="'/login'"> Login </router-link>
                    </div>
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
  data () {
    return {
      isAuthenticated: !!localStorage.getItem("token"),
    }
  },
  methods:{
    showAlert(){
      this.$swal({
        title: "You Logged out Succefully!!",
        icon: "info"
      }).then((result) => {
        if (result.isConfirmed) {
          AuthService.logout();
        }
      });
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem("token");
    }
  },
  watch: {
    // Watch the $route to react to changes in the route
    '$route'() {
      this.checkAuth();
    }
  },
  created() {
    // Ensure the auth status is correct on component creation
    this.checkAuth();
  }
}
</script>