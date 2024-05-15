<template>
  <div class="card" align="left">
    <div class="card-header">Candidate | Profile info </div>
    <div class="card-body"> 
      <form @submit.prevent="saveData">

        <label>Summary</label>
        <input type="text" v-model="candidate.summary" name="summary" class="form-control"/>

        <label>Experience</label>
        <input type="text" v-model="candidate.experience" name="experience" class="form-control"/>

        <label>Resume</label>
        <input type="file" name="resume" class="form-control"/>

        <label>Skills <i> (comma-separated) </i> </label>
        <input type="text" v-model="candidate.skills" name="skills" class="form-control"/>
        
        <label>Phone</label>
        <input type="text" v-model="candidate.phone" name="phone" class="form-control"/>
        
        <label>Address</label>
        <input type="text" v-model="candidate.address" name="address" class="form-control"/>

        <label>Personal Website</label>
        <input type="text" v-model="candidate.personal_website" name="personal_website" id="personal_website" class="form-control"/>
        <br />
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
        summary: '',
        experience: '',
        skills: '',
        phone: '',
        address: '',
        personal_website: '',
      }
    }
  },
  methods: {
    saveData() {
      console.log(this.candidate);
      axios.post("http://127.0.0.1:8000/api/profiles", this.candidate, {
        headers: { 
          'Authorization': `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60`,
          'Accept': 'application/json' 
        }
      })
      .then(response => {
        console.log(response.data);
        alert("Data saved successfully!");
      })
      .catch(error => {
        console.error(error);
        alert("Data already saved before!");
      });
    }
  }
}
</script>
