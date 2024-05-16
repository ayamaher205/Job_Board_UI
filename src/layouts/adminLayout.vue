<template>
  <div class="admin-layout bg-gray-100">
    <header>
      <Header/>
      <hr class ="w-75 m-0 mx-auto color-black">
    </header>
    <main>
    <SideBar/>
    </main>
    <footer>
      <p>&copy; 2024 Admin Panel</p>
    </footer>
  </div>
</template>

<script>
import SideBar from '@/components/AdminComponenets/SideBar.vue';
import Header from '@/components/AdminComponenets/Header.vue';
export default {
  name: 'AdminLayout',
  components: {
    SideBar,
    Header
  },
}
</script>

<style scoped>

</style>