<template>
  
    <!-- ================ contact section start ================= -->
    <section class="contact-section">
      <div class="container">
          <div class="row">
              <div class="col-12">
                  <h2 class="contact-title">Get in Touch</h2>
              </div>
              <div class="col-lg-8">
                  <form class="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                      <div class="row">
                          <div class="col-12">
                              <div class="form-group">
                                  <textarea class="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <input class="form-control valid" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <input class="form-control valid" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email">
                              </div>
                          </div>
                          <div class="col-12">
                              <div class="form-group">
                                  <input class="form-control" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject">
                              </div>
                          </div>
                      </div>
                      <div class="form-group mt-3">
                          <button type="submit" class="button button-contactForm boxed-btn">Send</button>
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
<!-- ================ contact section end ================= -->
  <!-- <div class="card" align="left">
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
  </div> -->
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
