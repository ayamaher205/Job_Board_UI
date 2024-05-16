<template>
    <div class="container col-lg-12 col-xl-11 w-auto">
      <h2>Add Admin</h2>
    <form @submit.prevent="addAdmin" class="adminform">
      <div class="input-group">
        <label for="profile-photo">Profile Photo:</label>
        <input type="file" id="profile-photo" @change="handleFileUpload">
      </div>
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password"  required minlength="8">
      </div>
      <div class="input-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required minlength="8">
      </div>
      <p v-if="confirmPassword && confirmPassword !== password" class="error-message">Passwords do not match</p>
      <div class="input-group">
        <label for="role">Role:</label>
        <input type="text" id="role" v-model="role" disabled>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" class="btn" :disabled="!formIsValid">Add</button>
    </form>
    </div>
</template>



<script>
import { useAdminStore } from '@/stores/admin';
export default {
    data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      errorMessage: ''
    };
  },
   computed: {
    formIsValid() {
      return this.name && this.email && this.password && this.password === this.confirmPassword && this.role;
    }
  },
    methods: {
    async addAdmin() {
      const adminStore = useAdminStore();
      try {
        const adminData = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        };
        await adminStore.addAdmin(adminData);
        console.log('Admin added successfully!');
        this.$router.push('/admins');
      } catch (error) {
       console.log(error.response.data.data)
          if(error.response.data.data) {
            if (error.response && error.response.data && error.response.data.data.password)
                this.errorMessage = error.response.data.data.password[0];
            if (error.response && error.response.data && error.response.data.data.email)
                this.errorMessage = error.response.data.data.email[0];

          }else{
            this.errorMessage = 'An error occurred while adding the admin.';
            console.error('Error adding admin:', error.response.data);
          }
      }
    },
  },
};
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: hsla(154, 92%, 10%, 0.692);
}
.adminform {
  color: rgb(75, 73, 73);
  padding: 25px;
  border-radius: 5%;
  -webkit-border-radius: 5%;
  -moz-border-radius: 5%;
  -ms-border-radius: 5%;
  -o-border-radius: 5%;
}
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  background-color: rgba(193, 199, 196, 0.301);
  width: 100%;
  padding: 5px;
  border: 0;
  border-bottom: 2px solid hsl(154, 42%, 33%);
  margin-bottom: 20px !important;
  border-radius: 5px !important;
}

button {
  border: 1px solid hsl(154, 42%, 33%) !important;
  color: hsl(154, 42%, 33%) !important;
  cursor: pointer !important;
  padding: 5px 15px;
  border-radius: 5px;
  margin-top: 10px;
}
button:hover {
  background-color: hsl(154, 42%, 33%);
  color: white !important;
  cursor: pointer !important;
}
.form-control:focus {
  background-color: transparent;
  outline: none;
}
.error-message{
  text-transform: capitalize;
 color: rgba(255, 0, 0, 0.74);
}
@media screen and (max-width: 400px) {
  .container {
    width: 90%;
  }
}
</style>