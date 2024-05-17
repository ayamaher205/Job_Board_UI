<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase custom-thead">
        <tr>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Post Created</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white hover:bg-gray-50" v-for="post in posts" :key="post.id">
          <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div class="ps-3">
              <div class="text-base font-semibold">{{ post.title }}</div>
              <div class="font-normal text-gray-500">{{ post.location }}</div>
            </div>
          </th>
          <td class="px-6 py-4">{{ editDate(post.created_at) }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div :class="getStatusClass(post.deadline)" class="h-2.5 w-2.5 rounded-full me-2"></div>
              {{ getStatus(post.deadline) }}
            </div>
          </td>
          <td class="px-6 py-4">
            <font-awesome-icon @click="toggleDropdown(post.id)" :icon="['fas', 'ellipsis-v']" />

            <!-- Dropdown menu -->
            <div v-show="isDropdownOpen[post.id]" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <router-link :to="'/post/'+post.id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">View</router-link>
                </li>
                <li>
    <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" data-bs-toggle="modal" data-bs-target="#updatemodal">Edit</a>
</li>

                <li>
                  <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" @click="deletePost(post.id)">Delete</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade" data-bs-backdrop="static" id="updatemodal" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="text-center w-100">Edit The Post</h5>
        </div>
        <div class="modal-body">
          <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal">Update post</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
        </div>
      </div>
    </div>
  </div>

<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" v-show="isModalOpen">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                </button>
            </form>
        </div>
    </div>
</div> 

</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const isDropdownOpen = ref({});

const toggleDropdown = (postId) => {
  isDropdownOpen.value[postId] = !isDropdownOpen.value[postId];
}


</script>

<script>
import PostService from '@/services/PostService';
import { getEmployer } from '@/services/EmployerService';
import { useLoggedUser } from '@/stores/User.js'

export default {
  setup() {
    return {
      isDropdownOpen,
      toggleDropdown
    }
  },
  data() {
    return {
      loggedEmployer: useLoggedUser(),
      posts: []
    };
  },
  methods: {

    async getPosts() {
            try {
                const response = await getEmployer(this.loggedEmployer.user.id);
                this.posts = response.data.data.posts;
                
            } catch (error) {
                console.error('Error fetching employer:', error);
            }
        },
    deletePost(postId){
      PostService.deletePost(postId)
      .then(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      })
      .catch(err => console.error(err));
    },
    updatePost(postId, data){
      PostService.updatePost(postId, data)
      .then(console.log(data))
      .catch(err => console.error(err));
    },
    editDate(date){
      const datecreated = new Date(date);
      const year = datecreated.getUTCFullYear();
      const month = String(datecreated.getUTCMonth() + 1).padStart(2, '0');
      const day = String(datecreated.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    getStatus(deadline) {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      return now > deadlineDate ? 'Expired' : 'Active';
    },
    getStatusClass(deadline) {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      return now > deadlineDate ? 'bg-red-500' : 'bg-green-500';
    }
  },
  mounted() {
    this.getPosts();
    this.deletePost();
  }
};
</script>

<style scoped>
.custom-thead {
  background-color: #F0F5F3;
}
</style>