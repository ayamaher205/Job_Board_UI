<template>
  <header class="flex items-center justify-between text-dark-400 bg-gray-100 p-2 h-25 rounded-br-2xl">
    <img src="../../assets/logo.png" class="object-fit w-24 h-10 mx-2 rounded-full">
    <div>
      <h1 class="text-lg font-bold">Admin Panel</h1>
    </div>
    <nav>
      <ul class="flex space-x-4">
        <li>
          <img :src="user.avatar" class="object-cover w-10 h-10  mx-2 rounded-full">
        </li>
        <li>
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useLoggedUser } from '@/stores/User.js';
import AuthService from '@/services/AuthService';


export default {
  data () {
    console.log(useLoggedUser().user)
    return {
      user: useLoggedUser().user 

    }
  },
  methods: {
    logout() {
      AuthService.logout();
    }
  }
};
</script>

<style scoped>
</style>
