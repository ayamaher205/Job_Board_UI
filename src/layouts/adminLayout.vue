<template>
  <div class="admin-layout">
    <header>
    <SideBar/>
    </header>
    <nav>
        <button @click="logout">Logout</button>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 Admin Panel</p>
    </footer>
  </div>
</template>

<script>
import SideBar from '@/components/AdminComponenets/SideBar.vue';
import AuthService from '../services/AuthService';
export default {
  name: 'AdminLayout',
  components: {
    SideBar
  },
   methods: {
    logout() {
      AuthService.logout();
    }
  }
}
</script>

<style scoped>

</style>