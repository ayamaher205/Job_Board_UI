<template>
  <div class="admin-layout bg-gray-100">
    <header>
      <Header/>
      <hr class =" h-1 m-0 mx-auto bg-gray-900" >
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
hr{
  width: 68%;
}

</style>