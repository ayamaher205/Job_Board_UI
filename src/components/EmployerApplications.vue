<template>
  <div class="container mx-auto px-4">
    <div v-for="post in employerData.posts" :key="post.id" class="grid grid-cols-12 gap-4">
      <div v-for="application in post.applications" :key="application.id" class="col-span-3">
        <div class="relative max-w-sm">
          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
          <div class="relative h-full p-3 bg-white border-2 border-green-500 rounded-lg">
            <router-link :to="`/show-applications/${application.id}`"
              class="flex no-underline items-center p-2 text-green-900 rounded-lg dark:text-green-900">
              <div class="flex items-center -mt-1">
                <svg class="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                  </path>
                </svg>
                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">{{ post.title }}</h3>
              </div>
            </router-link>

            <div class="px-2 pt-2">
              <h3 class="text-sm font-medium text-green-500">Candiate Email</h3>
              <div class="flex space-x-2">
                <div class="flex justify-center items-center rounded-full bg-green-100 h-5 w-5"><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    class="h-3 w-3 flex-shrink-0 text-green-500">
                    <path fill-rule="evenodd"
                      d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm text-green-700">{{ application.app_email }}</span>
              </div>
            </div>

            <div class="px-2 pt-2">
              <h3 class="text-sm font-medium text-green-500">Candiate Phone</h3>
              <div class="flex space-x-2">
                <div class="flex justify-center items-center rounded-full bg-green-100 h-5 w-5"><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    class="h-3 w-3 flex-shrink-0 text-green-500">
                    <path fill-rule="evenodd"
                      d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm text-green-700">{{ application.app_phone }}</span>
              </div>
            </div>
            <div class="px-2 pt-2" v-if="application.status=='pending'">
              <button type="button" @click="updateApplication(application.id,'accepted')"
                class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-green-500">
                Accept
              </button>
              <button type="button"  @click="updateApplication(application.id,'rejected')"
                class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-600">
                Reject
              </button>
            </div>
            <div class="px-2 pt-2" v-else="application.status=='pending'">
              <h3 class="text-sm font-medium text-green-500">Status</h3>
              <div class="flex space-x-2">
                <div class="flex justify-center items-center rounded-full bg-green-100 h-5 w-5"><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    class="h-3 w-3 flex-shrink-0 text-green-500">
                    <path fill-rule="evenodd"
                      d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm text-green-700">{{ application.status }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEmployer } from '@/stores/EmployerStore';
import { getEmployer } from "../services/EmployerService.js";
import { useLoggedUser } from '@/stores/User.js';
import ApplicationService from '@/services/ApplicationService.js';
export default {
  mounted() {
    this.fetchEmployer();
  },
  data() {
    return {
      loggedEmployer: useLoggedUser(),
      employerData: useEmployer(),
      result:{},
    }
  },
  methods: {
    async fetchEmployer() {
      try {
        if (Object.keys(this.loggedEmployer.user).length == 0 || !this.employerData.posts.length == 0) {
          const response = await getEmployer(localStorage.getItem('id'));
          this.loggedEmployer.setUser(response.data.data);
          if (response.data.posts) {
            this.employerData.setPosts(response.data.posts)
            this.employerData.setNumberOfApplications(response.data.NumberOfApplications)
            this.employerData.setNumberOfPosts(response.data.NumberOfPosts)
          }
        }
        console.log(this.loggedEmployer.user)
      } catch (error) {
        console.log(error)
      }
    },
    async updateApplication(id,status) {
       try {
        const response = await ApplicationService.updateApplication(id, status);
        console.log(response);
      } catch (error) {
        if (error.response) {
          this.errorList = [];
          this.errorList = error.response.data.errors;
        } else if (error.request) {
          this.errorList = error.request;
          console.log('Error', this.errorList);
        } else {
          this.errorList = error;
          console.log('Error', this.errorList);
        }
      } 
    }
  }
}
</script>