<template>
  <div class="admin-layout bg-gray-100">
      <Header/>
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
hr{
  width: 68%;
}

</style>