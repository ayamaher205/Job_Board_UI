<template>

  <div class="container">
  <h2>Hi, Welcome Back!</h2>
    <p>
      Still do not have an account?
      <a href="/register">Sign up</a>
    </p>
  <form class="loginForm">
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" class="form-control" required>
    </div>
    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" class="form-control" required>
    </div>
    <div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <button type="submit" 
      class="btn"
      :disabled="!email || !password">Log In
    </button>
  </form>
</div>
  
</template>

<script>
export default {
  name: 'registeration'
}
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
}
.loginForm {
  background-color: #e4f4e5;
  color: rgb(78, 81, 83);
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
  width: 100%;
  padding: 10px;
 border: 0;
  background-color: transparent;
  border-bottom: 1px solid #00000063;
  margin-bottom: 20px !important;
  border-radius: 0 !important;
}

button {
  border: 1px solid#0D6EFD !important;
  color: #0d6efd !important;
  cursor: pointer !important;
  padding: 5px 15px;
  margin-top: 10px;
}
button:hover {
  background-color: #0d6efd;
  color: white !important;
  cursor: pointer !important;
}
.form-control:focus {
  background-color: transparent;
  outline: none;
}

@media screen and (max-width: 400px) {
  .container {
    width: 90%;
  }
}
</style>