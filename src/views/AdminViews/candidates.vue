<template>
  <div class="w-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold mx-auto">Candidates</h2>
    </div>
    <Spinner v-if="loading" />
    <div v-else class="table-container">
      <table class="w-full bg-gray table-head">
        <thead class="">
         <tr>
            <th class="py-2 px-2 border-b border-gray-200">ID</th>
            <th class="py-2 px-2 border-b border-gray-200">Image</th>
            <th class="py-2 px-2 border-b border-gray-200">Name</th>
            <th class="py-2 px-2 border-b border-gray-200">Email</th>
            <th class="py-2 px-2 border-b border-gray-200">Phone</th>
            <th class="py-2 px-2 border-b border-gray-200">Address</th>
            <th class="py-2 px-2 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
      </table>
      <div class="table-body">
        <table class="w-full bg-gray">
          <tbody>
             <tr v-for="candidate in candidates" :key="candidate.id">
            <td class="py-2 px-2 border-b border-gray-200">{{candidate.id}} </td>
            <td class="py-2 px-2 border-b border-gray-200"><img :src="'http://127.0.0.1:8000/images/users/' + candidate.image" alt="candidate image" class="w-10 h-10 rounded-full"></td>
            <td class="py-2 px-2 border-b border-gray-200">{{candidate.name}} </td>
            <td class="py-2 px-2 border-b border-gray-200">{{candidate.email}}</td>
            <td class="py-2 px-2 border-b border-gray-200">{{candidate.profile.phone}} </td>
            <td class="py-2 px-2 border-b border-gray-200">{{candidate.profile.address}} </td>
            <td class="py-2 px-2 border-b border-gray-300">
              <svg 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-yellow-500"  @click="deactivate(candidate)">
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>
import { useCandidateStore } from '@/stores/candidates';  
import Swal from 'sweetalert2';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Candidates',
  components: {
    Spinner
  },
  data() {
    return {
      candidates: [],
      loading: true
    }
  },
  async created() {
    try {
      const candidatestore = useCandidateStore();
      this.candidates = await candidatestore.fetchCandidates();
      console.log(this.candidates);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
     async deactivate(candidate) {
      const candidatestore = useCandidateStore();
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to deactivate this employer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await candidatestore.deactivateCandidate(candidate.id);
            this.candidates = this.candidates.filter(c => c.id !== candidate.id);

} catch (error) {
console.error('Error deactivating candidate:', error);
}
}
});
console.log('Deactivating candidate', candidate);
}
}
}
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.table-head {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}
tr:hover{
    background-color: rgb(170, 234, 197);
}
</style>
