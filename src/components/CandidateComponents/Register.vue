<template>
  <div class="card" align="left">
    <div class="card-header">Candidate Register Form</div>
    <div class="card-body"> 
      <form @submit.prevent="saveData">

        <label>Name</label>
        <input type="text" v-model="candidate.name" name="name" id="name" class="form-control"/>

        <label>Email</label>
        <input type="email" v-model="candidate.email" name="email" id="email" class="form-control"/>

        <label>Password</label>
        <input type="password" v-model="candidate.password" name="password" id="password" class="form-control"/>

        <label>Re-type Password</label>
        <input type="password" v-model="candidate.password_confirmation" name="password_confirmation" id="password_confirmation" class="form-control"/>

        <label>Image ( Optional )</label>
        <input type="file" name="image" id="image" class="form-control"/> <br>

        <input type="submit" value="Save" class="btn btn-success"> 
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data () {
    return {
      candidate: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    saveData() {
      console.log(this.candidate);
      axios.post("http://127.0.0.1:8000/api/user/register", this.candidate)
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
