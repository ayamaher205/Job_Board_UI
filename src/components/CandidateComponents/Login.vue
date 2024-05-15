<template>
  <div class="card" align="left">
    <div class="card-header">Candidate Login Form</div>
    <div class="card-body"> 
      <form @submit.prevent="saveData">
        <label>Email</label>
        <input type="email" v-model="student.email" name="email" id="email" class="form-control"/>
        <label>Password</label>
        <input type="password" v-model="student.password" name="password" id="password" class="form-control"/> <br>
        <input type="submit" value="Save" class="btn btn-success"> 
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data () {
    return {
      student: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    saveData() {
      console.log(this.student);
      axios.post("http://127.0.0.1:8000/api/user/login", this.student)
      .then(response => {
        console.log(response.data);
        alert("Data saved successfully!");
      })
      .catch(error => {
        console.error(error);
        alert("Failed to save data!");
      });
    }
  }
}
</script>
