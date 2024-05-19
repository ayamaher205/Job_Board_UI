<template>
  <div class="w-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold mx-auto">Employers</h2>
      <button 
        @click="goToDeactivatedEmployers" 
        class="bg-red-400 text-white py-2 px-2 rounded">
        Deactivated Employers
      </button>
    </div>
    <Spinner v-if="loading" />
    <div v-else class="table-container">
      <table class="w-full bg-gray table-head">
        <thead class="">
         <tr>
            <th class="py-2 px-2 border-b border-gray-200">ID</th>
            <th class="py-2 px-2 border-b border-gray-200">Logo</th>
            <th class="py-2 px-2 border-b border-gray-200">Name</th>
            <th class="py-2 px-2 border-b border-gray-200">Email</th>
            <th class="py-2 px-2 border-b border-gray-200">Industry</th>
            <th class="py-2 px-2 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
      </table>
      <div class="table-body">
        <table class="w-full bg-gray">
          <tbody>
            <tr v-for="employer in employers" :key="employer.id">
            <td class="py-2 px-2 border-b border-gray-200">{{ employer.id }}</td>
            <td class="py-2 px-2 border-b border-gray-200">
              <img :src="'http://127.0.0.1:8000/images/users/' + employer.image" alt="employer image" class="w-10 h-10 rounded-full">
            </td>
            <td class="py-2 px-2 border-b border-gray-200">{{ employer.name }}</td>
            <td class="py-2 px-2 border-b border-gray-200">{{ employer.email }}</td>
            <td class="py-2 px-2 border-b border-gray-200" >{{employer.employer&&employer.employer.industry?employer.employer.industry:'NA'}} </td>
            <td class="py-2 px-2 border-b border-gray-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-yellow-500" @click="deactivate(employer)">
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
import { useEmployerstore } from '@/stores/employer';
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { useRouter } from 'vue-router';

export default {
  name: 'Employers',
  components: {
    Loading
  },
  data() {
    return {
      employers: [],
      loading: true
    }
  },
  async created() {
    try {
      const employerstore = useEmployerstore();
      this.employers = await employerstore.fetchEmployers();
      console.log(this.employers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deactivate(employer) {
      const employerstore = useEmployerstore();
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
            await employerstore.deactivateEmployer(employer.id);
            this.employers = this.employers.filter(e => e.id !== employer.id);
          } catch (error) {
            console.error('Error deactivating employer:', error);
          }
        }
      });
      console.log('Deactivating employer', employer);
    },
    goToDeactivatedEmployers() {
      this.$router.push({ name: 'DeactivatedEmployers' });
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
.table-body tr:hover{
    background-color: rgb(237, 253, 244);
}
</style>
