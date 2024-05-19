<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table v-if="posts.length > 0" class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase custom-thead">
        <tr>
          <th scope="col" class="px-4 py-3">Title</th>
          <th scope="col" class="px-4 py-3">Approval Status</th>
          <th scope="col" class="px-4 py-3">Post Created</th>
          <th scope="col" class="px-4 py-3">Status</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white hover:bg-gray-50" v-for="post in posts" :key="post.id">
          <th scope="row" class="flex items-center px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div class="ps-3">
              <div class="text-base font-semibold">{{ post.title }}</div>
              <div class="font-normal text-gray-500">{{ post.location }}</div>
            </div>
          </th>
          <td class="px-4 py-4"
            :class="{ 'text-success': post.status === 'accepted', 'text-danger': post.status === 'rejected' }">
            {{ post.status }}</td>
          <td class="px-4 py-4">{{ editDate(post.created_at) }}</td>
          <td class="px-4 py-4">
            <div class="flex items-center">
              <div :class="getStatusClass(post.deadline)" class="h-2.5 w-2.5 rounded-full me-2"></div>
              {{ getStatus(post.deadline) }}
            </div>
          </td>
          <td class="px-4 py-4">
            <font-awesome-icon @click="toggleDropdown(post.id)" :icon="['fas', 'ellipsis-v']" />

            <!-- Dropdown menu -->
            <div v-show="isDropdownOpen[post.id]"
              class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <router-link :to="'/post/' + post.id"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">View</router-link>
                </li>
                <li>
                  <a @click="toggleModal(post)"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Edit</a>
                </li>

                <li>
                  <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    @click="deletePost(post.id)">Delete</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center py-4 text-gray-500">You don't have posts yet.</div>
  </div>

  <!-- Main modal -->
  <div id="updateProductModal" tabindex="-1" aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full md:w-auto max-w-2xl h-modal md:h-full"
    :class="{ 'hidden': !isModalVisible }">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Update Post
          </h3>
          <button type="button" @click="toggleModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="updateProductModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="submitForm(modalPostId)">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input v-model="formData.title" type="text" name="name" id="name" value=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
              <span class="text-red-500" v-if="errors.title">{{ errors.title }}</span>
            </div>
            <div>
              <label for="deadline"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
              <input v-model="formData.deadline" type="date" name="deadline" id="deadline" value=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
            </div>
            <div>
              <label for="location"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
              <input v-model="formData.location" type="text" name="location" id="location" value=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
            </div>
            <div>
              <label for="work_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work
                Type</label>
              <input v-model="formData.work_type" type="text" name="work_type" id="work_type" value=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
            </div>
            <div>
              <label for="salary" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
              <input v-model="formData.salary" type="text" value="" name="salary" id="salary"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
              <span class="text-red-500" v-if="errors.title">{{ errors.salary_range }}</span>
            </div>
            <div>
              <label for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <input v-model="formData.category" type="text" name="category" id="category" value=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="">
            </div>
            <div class="sm:col-span-2">
              <label for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea v-model="formData.description" id="description" rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a description..."></textarea>
            </div>
            <div class="sm:col-span-2">
              <label for="skills" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skills</label>
              <textarea v-model="formData.skills" id="skills" rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a description..."></textarea>
            </div>
            <div class="sm:col-span-2">
              <label for="responsibilities"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsibilities</label>
              <textarea v-model="formData.responsibilities" id="responsibilities" rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a description..."></textarea>
            </div>
            <div class="sm:col-span-2">
              <label for="qualifications"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualifications</label>
              <textarea v-model="formData.qualifications" id="qualifications" rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a description..."></textarea>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button type="submit"
              class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Update post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import PostService from '@/services/PostService';
import { getEmployer } from '@/services/EmployerService';
import { useLoggedUser } from '@/stores/User.js';
import Swal from 'sweetalert2';

const isDropdownOpen = ref({});
const isModalVisible = ref(false);
const modalPostId = ref(null);
const posts = ref([]);
const errors = ref({});
const loggedEmployer = useLoggedUser()

const formData = ref({
  title: '',
  deadline: '',
  location: '',
  work_type: '',
  salary: '',
  category: '',
  description: '',
  skills: '',
  responsibilities: '',
  qualifications: ''
});

const submitForm = async () => {
  const data = formData.value;
  try {
    const response = await updatePost(modalPostId.value, data);
    if (response.errors) {
      errors.value = {};
      Object.keys(response.errors).forEach(key => {
        errors.value[key] = response.errors[key][0];
      });
      console.log('Validation errors:', errors.value);
    } else {
      errors.value = {};
      toggleModal();
      await getPosts();
    }
  } catch (error) {
    console.error('Error updating post:', error);
  }
};


const toggleModal = (post = null) => {
  if (post) {
    modalPostId.value = post.id;
    Object.assign(formData.value, {
      title: post.title,
      deadline: post.deadline,
      location: post.location,
      work_type: post.work_type,
      salary: post.salary_range,
      category: post.category_id,
      description: post.description,
      skills: post.skills,
      responsibilities: post.responsibilities,
      qualifications: post.qualifications
    });
  } else {
    modalPostId.value = null;
    Object.keys(formData.value).forEach(key => {
      formData.value[key] = '';
    });
  }
  isModalVisible.value = !isModalVisible.value;
};

const toggleDropdown = (postId) => {
  isDropdownOpen.value[postId] = !isDropdownOpen.value[postId];
};

const updatePost = (postId, data) => {
  return PostService.updatePost(postId, data);
};

const getPosts = async () => {
  try {
    const response = await getEmployer(localStorage.getItem('id'));
    posts.value = response.data.posts.filter((ele) => ele.status != 'pending')
    //this.loggedEmployer.setUser(response.data.data);
    
  } catch (error) {
    console.log(localStorage.getItem('id'))
    console.error('Error fetching posts:', error);
  }
};
const fetchEmployer=async() =>{
            try {
                const response = await getEmployer(localStorage.getItem('id'));
                this.loggedEmployer.setUser(response.data.data);
            }catch(error){
              console.log(error)
            }}
const deletePost = async (postId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: '#00A170',
    cancelButtonColor: '#EF4444',
    reverseButtons: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    }
  });

  if (result.isConfirmed) {
    try {
      await PostService.deletePost(postId);
      posts.value = posts.value.filter(post => post.id !== postId);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your post has been deleted.',
        icon: 'success',
        confirmButtonColor: '#00A170',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the post.',
        icon: 'error'
      });
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire({
      title: 'Cancelled',
      text: 'Your post is safe :)',
      icon: 'error',
      confirmButtonColor: '#00A170',
    });
  }
};


const editDate = (date) => {
  const datecreated = new Date(date);
  const year = datecreated.getUTCFullYear();
  const month = String(datecreated.getUTCMonth() + 1).padStart(2, '0');
  const day = String(datecreated.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getStatus = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return now > deadlineDate ? 'Expired' : 'Active';
};

const getStatusClass = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return now > deadlineDate ? 'bg-red-500' : 'bg-green-500';
};

onMounted(() => {

  getPosts();
});
</script>



<style scoped>
.custom-thead {
  background-color: #F0F5F3;
}
</style>
