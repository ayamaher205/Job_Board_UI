<template>

  <section class="contact-section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="contact-title"> Login to your account </h2>
            </div>
            
            <div>
              <p v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</p>
            </div>

            <div class="col-lg-8">
                <form class="form-contact contact_form" @submit.prevent="login"  action="" method="post">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input class="form-control valid" v-model="email" name="email" type="email" id="email" placeholder="Enter your Email">
                            </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                              <input class="form-control valid" v-model="password"  type="password"  name="password" placeholder="Enter your password">
                          </div>
                      </div>
                                           
                    </div>
                    <div class="form-group mt-3">
                        <button type="submit" class="button button-contactForm boxed-btn">Go</button>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 offset-lg-1">
                <div class="media contact-info">
                    <span class="contact-info__icon"><i class="ti-home"></i></span>
                    <div class="media-body">
                        <h3>Buttonwood, California.</h3>
                        <p>Rosemead, CA 91770</p>
                    </div>
                </div>
                <div class="media contact-info">
                    <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                    <div class="media-body">
                        <h3>+1 253 565 2365</h3>
                        <p>Mon to Fri 9am to 6pm</p>
                    </div>
                </div>
                <div class="media contact-info">
                    <span class="contact-info__icon"><i class="ti-email"></i></span>
                    <div class="media-body">
                        <h3>support@colorlib.com</h3>
                        <p>Send us your query anytime!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</template>

<script>
import AuthService from '@/services/AuthService';
import { useLoggedUser } from '@/stores/User.js';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      role: '',
      errorMessage: '',
    };
  },
 /*  created() {
    var isAdmin = prompt("are you an admin ? yes  | YES ");
    console.log(isAdmin);
    if (isAdmin == "yes") {
      this.$router.push('/admin/login');
    }
  }, */
  methods: {
    login() {
      
      if (!this.email) {
        this.errorMessage = 'Email is required';
        return;
      }

      if (!this.password) {
        this.errorMessage = 'Password is required';
        return;
      }
      
      AuthService.login({ email: this.email, password: this.password })
        .then(response => {
          
          const userStore = useLoggedUser();
          userStore.setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loggedUser', response.data.user.name);
          localStorage.setItem('role', response.data.user.role);
          localStorage.setItem('id', response.data.user.id);


          if (response.data.user.role == 'admin') {
            this.$router.push('/admin');
          }
          else if (response.data.user.role == 'employer' ) {
            this.$router.push('/employer');
          }
          if( response.data.user.role == 'candidate'){
            this.$router.push('/candidate/profile/store');
          }

        })
        .catch(error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        });
    },
    clearError() {
      this.errorMessage = '';
    }
  }
}
</script>
