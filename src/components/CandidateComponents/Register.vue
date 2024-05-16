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
                            <select>
                              <option value="1" selected>Candidate</option>
                              <option value="1">Employer</option>
                            </select>
                          </div>
                        <!-- </div>   -->
                        
                            <br> <br><br>
                          <div class="col-12">
                              <div class="form-group">
                                <label>Upload your image  | (Optional )</label>  <br />
                                <input type="file" name="image" id="imageFile" />
                              </div>
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
      candidate: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async saveData() {
      
      var ErrorContainer = document.getElementById('alertDiv');

      try {
        
        await axios.post("http://127.0.0.1:8000/api/user/register", this.candidate)
        ErrorContainer.removeAttribute('class');
        ErrorContainer.setAttribute('class', 'alert alert-success');
        ErrorContainer.innerHTML = "Your data is saved ✅";

      } catch (error) {
        
        ErrorContainer.removeAttribute('style');
        ErrorContainer.innerHTML = "";
        ErrorContainer.setAttribute('class', 'alert alert-danger');
        
        // Cast error object to array
        const errorsArray = Object.entries(error.response.data);
        console.log(errorsArray);
        errorsArray.forEach(([key, value]) => {
            ErrorContainer.innerHTML += value + "<br>";
        });
      }

      setTimeout(function () {
        ErrorContainer.setAttribute('style', 'display: none;');
      }, 3000);

    }
  }
}
</script>
