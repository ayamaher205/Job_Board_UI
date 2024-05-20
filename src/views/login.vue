<template>
  <div class="container col-lg-12 col-xl-11 w-50 mx-auto">
  <h2 class="col p-3">Hi, Welcome Back!</h2>
    <p class="row mx-auto">
      Still do not have an account?
      <a href="/register">Sign up</a>
    </p>
     <img class="row w-25 mx-auto object-full"
              style="width: 90%"
              src="../assets/logo.png"
          />
    <div class="row w-100 h-100" >
<form @submit.prevent="login" class="loginForm col w-100">
      <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" class="form-control"  v-model="email" required>
    </div>
    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" class="form-control"  v-model="password" required>
    </div>
    <div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
      <button type="submit" 
      class="btn"
      :disabled="!email || !password">Log In
      </button>
  </form>
    </div>
  
  </div>
  
</template>

<script>
import AuthService from '../services/AuthService';
import { useLoggedUser } from '@/stores/User.js'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',

    };
  },
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
          // console.log(response);
          const userStore = useLoggedUser();
          // console.log(response.data.user);
          userStore.setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loggedUser', response.data.user.name);
          localStorage.setItem('role', response.data.user.role);
          localStorage.setItem('id', response.data.user.id);

          if (response.data.user.role == 'admin') {
            this.$router.push('/admin/dashboard');
          }
          else {
            this.$router.push('/');
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
<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.container h2 , p {
  text-align: center;
  margin-bottom: 20px;
  color: hsla(154, 92%, 10%, 0.692);
}
a{
  color: hsl(154, 42%, 38%);
  text-decoration: under-line;
}
.loginForm {
  color: rgb(75, 73, 73);
  padding: 25px;
  border-radius: 5%;
  -webkit-border-radius: 5%;
  -moz-border-radius: 5%;
  -ms-border-radius: 5%;
  -o-border-radius: 5%;
}
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  background-color: rgba(193, 199, 196, 0.301);
  width: 100%;
  padding: 5px;
  border: 0;
  border-bottom: 2px solid hsla(154, 92%, 10%, 0.692);
  margin-bottom: 20px !important;
  border-radius: 5px !important;
}

button {
  border: 1px solid hsl(154, 42%, 33%) !important;
  color: hsl(154, 42%, 33%) !important;
  cursor: pointer !important;
  padding: 5px 15px;
  margin-top: 10px;
}
button:hover {
  background-color: hsl(154, 42%, 33%);
  color: white !important;
  cursor: pointer !important;
}
.form-control:focus {
  background-color: transparent;
  outline: none;
}
.error-message{
 color: rgba(255, 0, 0, 0.74);
}
@media screen and (max-width: 400px) {
  .container {
    width: 90%;
  }
}
</style>