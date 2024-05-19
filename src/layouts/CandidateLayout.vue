<template>
  <Header></Header>  
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'CandidateLayout',
  components: {
    Header,
    Footer
  }
}

</script>

<style scoped>

</style>
