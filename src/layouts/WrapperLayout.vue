<template>
  <component :is="currentLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import CandidateLayout from './CandidateLayout.vue';
import AdminLayout from './adminLayout.vue';

export default {
  data() {
    return {
      isAdmin: window.location.pathname.substring(0, 6) == "/admin" // Change this based on your condition
    }
  },
  computed: {
    currentLayout() {
      return this.isAdmin ? AdminLayout : CandidateLayout;
    }
  }
}
</script>
