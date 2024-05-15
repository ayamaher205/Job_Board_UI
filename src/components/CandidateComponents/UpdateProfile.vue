<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error">Error: {{ error }}</div>
      <div v-else>
        <h1>Resource Details</h1>

        <label>Summary</label>
        <input type="text" v-model="profile.data.summary" name="summary" class="form-control"/>

        <label>Experience</label>
        <input type="text" v-model="profile.data.experience" name="experience" class="form-control"/>

        <label>Resume</label>
        <input type="file" name="resume" class="form-control"/>

        <label>Skills <i> (comma-separated) </i> </label>
        <input type="text" v-model="profile.data.skills" name="skills" class="form-control"/>
        
        <label>Phone</label>
        <input type="text" v-model="profile.data.phone" name="phone" class="form-control"/>
        
        <label>Address</label>
        <input type="text" v-model="profile.data.address" name="address" class="form-control"/>


        <input type="hidden" name="_method" value="PUT" />

        <label>Personal Website</label>
        <input type="text" v-model="profile.data.personal_website" name="personal_website" id="personal_website" class="form-control"/>
        <!-- Add other editable fields here -->
        <div>
          <button @click="saveChanges">Save Changes</button>
        </div>
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
          console.log(response.data);
          this.profile = response.data;
        })
        .catch(error => {
          this.loading = false;
          this.error = "Failed to fetch profile details";
          console.error(error);
        });
    },
    saveChanges() {
      
      axios.put("http://127.0.0.1:8000/api/profiles", this.profile,{
      headers: { 
          'Authorization': `Bearer 26|5xz2BggAA5ZJ5QetgtvwBSahH8UhTstmfBUtFUiU0458cd60`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
          console.log("Changes saved successfully");
        })
        .catch(error => {
          console.error("Failed to save changes:", error);
        });
    }
  }
};
</script>
