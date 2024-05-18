<template>
  <div>
    <table class="w-full bg-gray">
      <thead class="table-head">
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
      <tbody class="table-body">
        <tr v-for="candidate in candidates" :key="candidate.id">
          <td class="py-2 px-2 border-b border-gray-200">{{candidate.id}} </td>
          <td class="py-2 px-2 border-b border-gray-200"><img :src="'http://127.0.0.1:8000/images/users/' + candidate.image" alt="candidate image" class="w-10 h-10 rounded-full"></td>
          <td class="py-2 px-2 border-b border-gray-200">{{candidate.name}} </td>
          <td class="py-2 px-2 border-b border-gray-200">{{candidate.email}}</td>
          <td class="py-2 px-2 border-b border-gray-200">{{candidate.profile.phone}} </td>
          <td class="py-2 px-2 border-b border-gray-200">{{candidate.profile.address}} </td>
          <td class="py-2 px-4 border-b">
            <svg v-if="candidate.active"  @click="activate(candidate)"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
            <svg v-else @click="deactivate(candidate)"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-yellow-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useUserstore } from '@/stores/users'
import Swal from 'sweetalert2';
export default {
  name: 'CandidatesTable',
  props: {
    candidates: {
      required: true
    }
  },
 methods: {
  deactivate(candidate) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to deactivate this candidate!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userstore = useUserstore();
        try {
          await userstore.deactivateuser(candidate.id); 
          this.$emit('updateCandidates');
        } catch (error) {
          console.error('Error deactivating candidate', error);
        }
      }
    });
  },

    async activate(candidateId) {
      try {
        const userstore = useUserstore();
        await userstore.activateCandidate(candidateId);
        this.$emit('updateCandidates');
      } catch (error) {
        console.error('Error activating candidate', error);
      }
    }
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
