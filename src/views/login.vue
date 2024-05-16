<template>

  <div class="container col w-100">
  <h2 class="row">Hi, Welcome Back!</h2>
    <p class="row">
      Still do not have an account?
      <a href="/register">Sign up</a>
    </p>
    <div class="row">
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
     <img class="col w-50"
              style="width: 90%"
              src="../assets/logo.png"
            />
    </div>
  </div>
  
</template>

<script>
import AuthService from '../services/AuthService';

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
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loggedUser', response.data.user.name);
          localStorage.setItem('role', response.data.user.role);

          if (response.data.user.role == 'admin') {
            this.$router.push('/admin');
          } else if (response.data.user.role == 'employer' || response.data.user.role == 'candidate') {
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

.container h2 {
  text-align: center;
  margin-bottom: 20px;
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
  border-bottom: 2px solid #00000063;
  margin-bottom: 20px !important;
  border-radius: 5px !important;
}

button {
  border: 1px solid#0D6EFD !important;
  color: #0d6efd !important;
  cursor: pointer !important;
  padding: 5px 15px;
  margin-top: 10px;
}
button:hover {
  background-color: #0d6efd;
  color: white !important;
  cursor: pointer !important;
}
.form-control:focus {
  background-color: transparent;
  outline: none;
}

@media screen and (max-width: 400px) {
  .container {
    width: 90%;
  }
}
</style>