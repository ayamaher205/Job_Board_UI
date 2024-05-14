<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button type="submit">Login</button>
  </form>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
name: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      AuthService.login({ email: this.email, password: this.password })
        .then(response => {
            // console.log(response);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loggedUser',response.data.user.name);
          localStorage.setItem('role',response.data.user.role);

          if(response.data.user.role == 'admin'){
            this.$router.push('/admin');
          }
          else if(response.data.user.role == 'employer' || response.data.user.role == 'candidate'){
            this.$router.push('/');
          }

        })
        .catch(error => {
          console.error('Login failed:', error);
        });
    }
  }
}
</script>




