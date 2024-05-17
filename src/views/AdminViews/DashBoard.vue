<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Admins" :number="adminCount" color="#40916c" backgroundColor="#d8f3dc" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Employers" :number="Employerscount" color="#2d6a4f" backgroundColor="#b7e4c7" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Candidates" :number="Candidatescount" color="#1b4332" backgroundColor="#95d5b2" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Posts" :number="100" color="#081c15" backgroundColor="#74c69d" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Card from '@/components/AdminComponenets/Card.vue';
import { useUserstore } from '@/stores/users';
export default {
  name: 'Dashboard',
  components: {
    Card
  },
  setup() {
    const userstore = useUserstore();
    onMounted(async () => {
      try {
        const users = await userstore.fetchUsers();
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    });
    const adminCount = computed(() => userstore.Adminscount);
    const candidateCount = computed(() => userstore.Candidatescount);
    const employerCount = computed(() => userstore.Employerscount);

    return {
      adminCount,
      candidateCount,
      employerCount


    };
  }
}
</script>
