<template>
  <header class="flex items-center justify-between text-dark-400 bg-gray-200 p-2 rounded-br-2xl">
    <img src="../../assets/logo.png" class="object-fit w-24 h-10 mx-2 rounded-full">
    <div class="hidden sm:block">
      <h1 class="text-lg font-bold">Admin Panel</h1>
    </div>
    <nav>
      <ul class="flex space-x-4 mx-5">
        <li>
          <img :src="user.avatar" class="object-cover w-10 h-10 mx-2 rounded-full" alt="avatar">
        </li>
        <li>
          <button @click="logout" class="border border-gray-400 border-solid border-1 px-3 py-1 rounded-md text-sm text-black hover:bg-gray-200">Logout</button>
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
      user: null 
    };
  },
  created() {
    this.user = useLoggedUser().user; 
    console.log(this.user);
  },
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
