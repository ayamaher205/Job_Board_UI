<template>
  <div class="container col-lg-12 col-xl-11 w-auto">
    <h2>Add Admin</h2>
    <form @submit.prevent="addAdmin" class="adminform" enctype="multipart/form-data">
      <div class="input-group">
        <div class="flex items-center py-4">
          <div class="w-20 h-20 mr-4 flex-none rounded-lg border overflow-hidden">
            <img class="mr-4 object-cover" :src="imageUrl" alt="Avatar Upload" />
          </div>
          <label class="cursor-pointer">
            <span class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-900 hover:bg-green-600 hover:shadow-lg">Browse</span>
            <input type="file" class="hidden" accept="image/*" name="image" @change="handleImageSelected" />
          </label>
        </div>
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
        <input type="password" id="password" v-model="password" required minlength="8">
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
import { useImageUpload } from "@/Helpers/useImageUpload.js";

export default {
  data() {
    const { imageFile, imageUrl, handleImageSelected } = useImageUpload();
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      errorMessage: '',
      ...useImageUpload(), 
    };
  },
  computed: {
    formIsValid() {
      return this.name && this.email && this.password && this.password === this.confirmPassword && this.role;
    }
  },
  methods: {
    handleImageChange(event) {
            const selectedFile = event.target.files[0];
            this.employer.image = selectedFile;
        },

    async addAdmin() {
      const adminStore = useAdminStore();
      try {
         let formData = new FormData();
            formData.append("image", this.imageFile);
            formData.append("name", this.name)
            formData.append("email", this.email)
            formData.append("password",  this.password)
            formData.append("role",  this.role)
            formData.append("_method", 'post')

                console.log(formData.values().toArray());
                await adminStore.addAdmin(formData);

        console.log('Admin added successfully!');
        this.$router.push('/admins');
      } catch (error) {
        console.log(error.response.data.data)
        if (error.response.data.data) {
          if (error.response && error.response.data && error.response.data.data.password)
            this.errorMessage = error.response.data.data.password[0];
          if (error.response && error.response.data && error.response.data.data.email)
            this.errorMessage = error.response.data.data.email[0];
        } else {
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