<template>
  <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-green-900 dark:hover:hover:bg-green-900 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>

  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-3 overflow-y-auto bg-gray-200 dark:bg-white-800">
      <div class="flex flex-col items-center my-6 -mx-2">
        <img class="object-cover w-24 h-24 mx-2 rounded-full"
          :src="'http://127.0.0.1:8000/images/users/' + loggedEmployer.user.image" alt="avatar" />
        <h4 class="mx-2 mt-2 font-medium text-green-900 dark:text-green-900">
          {{ loggedEmployer.user.name }}
        </h4>
        <p class="mx-2 mt-1 text-sm font-medium text-green-600 dark:text-green-700">
          {{ loggedEmployer.user.email }}
        </p>
      </div>
      <ul class="space-y-2 font-medium">
        <li>
          <router-link to="employer-dashboard"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/employer"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">My Profile</span>
          </router-link>
        </li>
        <li>
          <router-link to="/post-job"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
              <path
                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
              <path
                d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Post Job</span>
          </router-link>
        </li>
        <li>
          <router-link to="/posts"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor"
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Jobs</span>
          </router-link>
        </li>
        <li>
          <router-link to="/employer-applications"
            class="flex items-center p-2 text-green-900 no-underline rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
              <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Applications</span>
          </router-link>
        </li>
        <li>
          <router-link @click="showAlert()" to="/"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Log Out</span>
          </router-link>
        </li>
        <li>
          <a
            @click.prevent="showDeleteAlert"
            href="#"
            class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900 hover:bg-green-700 dark:hover:bg-green-900 dark:hover:text-white group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2"
              class="flex-shrink-0 w-5 h-5 text-green-800 transition duration-75 dark:text-green-800 group-hover:text-white dark:group-hover:text-white"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Delete Account</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import { RouterLink } from 'vue-router';
import Swal from 'sweetalert2';
import AuthService from '../services/AuthService';
import { useLoggedUser } from '@/stores/User';
import { deleteEmployer, getEmployer } from '@/services/EmployerService';

export default {
  data() {
    return {
      loggedEmployer: null,
    }
  },
  created() {
    this.loggedEmployer = useLoggedUser();
    this.getEmployer();
  },
  methods: {
    getEmployer() {
      getEmployer(this.loggedEmployer.user.id)
        .then(res => this.loggedEmployer = res.data.data.employer_id)
        .catch(error => console.error('Error fetching employer:', error));
    },
    showAlert() {
      this.$swal({
        title: "You Logged out Succefully!!",
        icon: "info"
      }).then((res) => {
        if (result.isConfirmed) {
          AuthService.logout();
        }
      })
    },
    showDeleteAlert() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            deleteEmployer(this.loggedEmployer);
            AuthService.logout();
            this.$router.push('/');
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success"
            });
          } catch (error) {
            console.error('Error deleting account:', error);
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "An error occurred while deleting your account.",
              icon: "error"
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your account is safe :)",
            icon: "info"
          });
        }
      });
    }
  }

}
</script>