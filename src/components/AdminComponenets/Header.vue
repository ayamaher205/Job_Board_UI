<template>
  <header class="flex items-center justify-between text-dark-400 bg-white p-1 rounded-br-2xl">
    <img src="../../assets/logo.png" class="object-fit w-24 h-10 mx-2">
    <div class="hidden sm:block">
      <h1 class="text-lg font-bold">Admin Panel</h1>
    </div>
    <nav>
      <ul class="flex space-x-4 mx-5">
        <li>
          <img 
          :src="'http://127.0.0.1:8000/images/users/' + loggedadmin.user.image"
          class="object-cover w-10 h-10 mx-2 rounded-full" alt="avatar">
        </li>
        <li>
          <button @click="logout" class="border border-gray-500 border-solid border-2 px-3 py-1 mt-2 rounded-md text-sm text-black hover:bg-gray-200">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useLoggedUser } from '@/stores/User.js';
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
    loggedadmin: useLoggedUser()
   };
  },
  // created() {
  //   const loggedadmin = useLoggedUser().user
    
  //   console.log(loggedadmin);
  // },
  methods: {
    logout() {
      AuthService.logout();
    }
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  .flex-wrap-sm {
    flex-wrap: wrap;
  }
  .hidden {
    display: none;
  }
}
</style>
