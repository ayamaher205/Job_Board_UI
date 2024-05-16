<template>

  <section class="contact-section">
      <div class="container">
          <div class="row">
              <div class="" role="alert" id="alertDiv">
              </div>
              <div class="col-12">
                  <h2 class="contact-title"> Register your account </h2>
              </div>
              <div class="col-lg-8">
                  <form class="form-contact contact_form"  @submit.prevent="saveData" action="" method="post" id="contactForm" novalidate="novalidate">
                      <div class="row">
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <input class="form-control valid" type="text" name="name" v-model="candidate.name" id="name" placeholder="Enter your name">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <input class="form-control valid" name="email" type="email" v-model="candidate.email" id="email" placeholder="Enter your Email">
                              </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                                <input class="form-control valid"  type="password"  name="password" v-model="candidate.password" placeholder="Enter your password">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input class="form-control valid" type="password" v-model="candidate.password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="Re-type your password">
                            </div>
                        </div>
                        
                        <!-- <div class="single-element-widget mt-30"> -->
                          <div class="default-select" id="default-select">
                            <label>Role: </label> &nbsp; &nbsp; 
                            <select v-model="candidate.role" name="role">
                              <option value="candidate" selected>Candidate</option>
                              <option value="employer">Employer</option>
                            </select>
                          </div>
                        <!-- </div>   -->
                        
                          <br> <br><br>
                          <div class="col-sm-6">
                              <div class="form-group">
                                <label>Upload your image  | (Optional )</label>  <br />
                                <input @change="handleFileChange" type="file" name="image" id="imageFile" />
                              </div>
                          </div>
                          <div class="col-sm-6">
                            <img v-if="previewImage" :src="previewImage" style="width: 65%; height: 110%; border-radius: 10%;" alt="Profile Picture">
                          </div>

                      </div>
                      <div class="form-group mt-3">
                          <button type="submit" class="button button-contactForm boxed-btn">Save</button>
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
import axios from 'axios';

export default {
  name: 'Register',
  data () {
    return {
      previewImage: '',
      candidate: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'candidate',
      }
    }
  },
  methods: {
    async saveData() {
      
      var AlertContainer = document.getElementById('alertDiv');

      const imageFile = document.getElementById("imageFile");        
      
      if(imageFile.files.length)
      {
        this.candidate.realimage =  imageFile.files[0];
      }
      
      try {
        console.log(this.candidate);
        await axios.post("http://127.0.0.1:8000/api/user/register", this.candidate,
        {headers: {
           'Content-Type': 'multipart/form-data', // Set content type header for FormData
        }})
        AlertContainer.removeAttribute('style');
        AlertContainer.removeAttribute('class');
        AlertContainer.setAttribute('class', 'alert alert-success');
        AlertContainer.innerHTML = "Your data is saved ✅";
      } catch (error) {
        AlertContainer.removeAttribute('style');
        AlertContainer.innerHTML = "";
        AlertContainer.setAttribute('class', 'alert alert-danger');
        
        // Cast error object to array
        const errorsArray = Object.entries(error.response.data);
        
        errorsArray.forEach(([key, value]) => {
            AlertContainer.innerHTML += value + "<br>";
        });
      }

      setTimeout(function () {
        AlertContainer.setAttribute('style', 'display: none;');
      }, 3050);

    },

    handleFileChange(event){
      const imageFile = document.getElementById("imageFile");        
      const imageContent = imageFile.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageContent);
      reader.onload = (e) => {
        console.log(e);
        this.previewImage = e.target.result;
      };
    }
  }
}
</script>
