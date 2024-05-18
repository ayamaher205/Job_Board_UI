<template>
  <div>
    <button @click="toggleShowDeactivated" class="px-4 py-2 bg-blue-500 text-white rounded">
      {{ showDeactivated ? 'Show Active' : 'Show Deactivated' }}
    </button>
    <div v-if="!showDeactivated">
      <CandidatesTable :candidates="activatedCandidates" @updateCandidates="fetchCandidates"/>
    </div>
    <div v-if="showDeactivated">
      <CandidatesTable :candidates="deactivatedCandidates" @updateCandidates="fetchCandidates"/>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useUserstore } from '@/stores/users';
import CandidatesTable from '@/components/AdminComponenets/CandidatesTable.vue';

export default {
  name: 'Candidates',
  components: {
    CandidatesTable
  },
  setup() {
    const userstore = useUserstore();
    const showDeactivated = ref(false);

    const fetchCandidates = async () => {
      const role = 'candidate';
      try {
        await userstore.fetchUsersWithRole(role);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    const activatedCandidates = computed(() =>
      userstore.Candidates.filter(candidate => !candidate.deleted_at)
    );

    const deactivatedCandidates = computed(() =>
      userstore.Candidates.filter(candidate => candidate.deleted_at)
    );

    return {
      showDeactivated,
      fetchCandidates,
      activatedCandidates,
      deactivatedCandidates,
      toggleShowDeactivated: () => {
        showDeactivated.value = !showDeactivated.value;
      }
    };
  },
  mounted() {
    this.fetchCandidates();
  }
};
</script>

<style scoped>
/* Add any styles for the Candidates component here */
</style>
