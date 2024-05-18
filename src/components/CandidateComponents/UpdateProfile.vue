<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error">Error: {{ error }}</div>
      <div v-else>
        <h1>Resource Details</h1>

        <label>Summary</label>
        <input type="text" v-model="profile.summary" name="summary" class="form-control"/>

        <label>Experience</label>
        <input type="text" v-model="profile.experience" name="experience" class="form-control"/>

        <!-- <label>Resume</label>
        <input type="file" name="resume" class="form-control"/> -->

        <label>Skills <i> (comma-separated) </i> </label>
        <input type="text" v-model="profile.skills" name="skills" class="form-control"/>
        
        <label>Phone</label>
        <input type="text" v-model="profile.phone" name="phone" class="form-control"/>
        
        <label>Address</label>
        <input type="text" v-model="profile.address" name="address" class="form-control"/>


        <!-- <input type="hidden" name="_method" value="PUT" /> -->

        <label>Personal Website</label>
        <input type="text" v-model="profile.personal_website" name="personal_website" id="personal_website" class="form-control"/>
        <!-- Add other editable fields here -->
        <br />
        <button class="btn btn-success" @click="saveChanges">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      error: null,
      profile: {}
    };
  },
  mounted() {
    this.fetchResourceDetails();
  },
  methods: {
    fetchResourceDetails() {
      axios.get("http://127.0.0.1:8000/api/profiles/1", {
        headers: { 
          'Authorization': `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60`,
          'Accept': 'application/json' 
        }
      })
        .then(response => {
          this.loading = false;
          console.log(response);
          this.profile = response;
        })
        .catch(error => {
          this.loading = false;
          this.error = "Failed to fetch profile details";
          console.error(error);
        });
    },



    saveChanges() {
    //   axios.put(`http://127.0.0.1:8000/api/profiles/1`, this.profile, {
    //   headers: { Authorization: `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60` }
    // })
    
    fetch(`http://127.0.0.1:8000/api/bbb`, {
    method: 'PUT',
    // headers: {
    //   'Authorization': `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60`,
    //   'Content-Type': 'application/json' // Specify the content type
    // },
    // body: JSON.stringify(this.profile)
    })
    .then(response => {
    // Handle success response
    console.log('PUT request successful:', response);
    })
    .catch(error => {
    // Handle error
    console.error('Error making PUT request:', error);
    });


    // .then(response => {
    // console.log('PUT request successful:', response);
    // })
    // .catch(error => {
    // console.error('Error making PUT request:', error);
    // });
    //   axios.put("http://127.0.0.1:8000/api/profiles", this.profile,{
    //   headers: { 
    //       'Authorization': `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60`,
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // })

    // axios.put('http://127.0.0.1/api/profiles/3',  this.profile, {
    // Additional configuration, such as headers
    // headers: {
      // 'Accept': 'application/json',
      // Authorization: 'Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60',
      // 'Content-Type': 'application/json', // Adjust content type if needed
      // 'Access-Control-Allow-Origin': "*"
    // },
    // })
    

    }
  }
};
</script>
