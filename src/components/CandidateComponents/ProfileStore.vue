<template>

	<div class="whole-wrap">
		<div class="container box_1170">
			<div class="section-top-border">
				<div class="row">
					<div class="col-lg-8 col-md-8">
						<h3 class="mb-30"> Candidate | Profile info </h3>

            <form @submit.prevent="handleUpdateSubmit" enctype="multipart/form-data">

              <input type="text" v-model="profile.summary" name="summary" class="single-input" :placeholder="profile.summary"/>            <br>
                   
              <input type="text" v-model="profile.experience" name="experience" class="single-input" placeholder="Experience"/>              <br>

              <label>Upload your resume: </label>  &nbsp; &nbsp;
              <input type="file" name="resume" id="resumeFile"/>           <br>  <br>
      
              <input type="text" v-model="profile.skills" name="skills" class="single-input" placeholder="Skills (comma-separated)"/>            <br>
              
              <input type="text" v-model="profile.phone" name="phone" class="single-input" placeholder="Phone"/>            <br>
              
              <input type="text" v-model="profile.address" name="address" class="single-input" placeholder="Address"/>              <br>
              <input type="hidden" value="PUT" name="_method"/>
              
              <input type="text" v-model="profile.personal_website" name="personal_website" id="personal_website" class="single-input" placeholder="Personal Website"/>              <br>              <br />
              <div class="form-group mt-3">
                <button type="submit" class="button button-contactForm boxed-btn">Save My Data</button>
            </div>
              </form>
					</div>
				</div>
			</div>
		</div>
	</div>

  
</template>

<script>

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

export default {
  name: "Profile",

  setup() {
    const route = useRoute();
    const profile = ref({
        summary: '',
        experience: '',
        resume: '',
        skills: '',
        phone: '',
        address: '',
        personal_website: '',
    });

    onMounted(async () => {
      var profileResult = await axios.get("http://127.0.0.1:8000/api/profiles/1", {
                          headers: { 
                              'Authorization': `Bearer ${localStorage.getItem('token')}`,
                              'Accept': 'application/json',
                            }
                        });
                        
      // console.log(profileResult);
      // console.log(profileResult.data.summary);
      profile.value.summary = profileResult.data.summary;
      profile.value.experience = profileResult.data.experience;
      profile.value.skills = profileResult.data.skills;
      profile.value.phone = profileResult.data.phone;
      profile.value.address = profileResult.data.address;
      profile.value.personal_website = profileResult.data.personal_website;
    });

    const handleUpdateSubmit = async () => {
      
      const resumeFile = document.getElementById("resumeFile").files[0];
      
      try {
        await axios.put("http://127.0.0.1:8000/api/profiles/1", 
          { 
            summary: profile.value.summary,
            experience: profile.value.experience,
            resume: resumeFile,
            skills: profile.value.skills,
            phone: profile.value.phone,
            address: profile.value.address,
            personal_website: profile.value.personal_website, 
          }, 
          {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
              }
          });

        alert('updated');
      } catch (error) {
        alert(error)
      }
      

    };

    return {
      profile,
      handleUpdateSubmit,
    };

  },
};

</script>
