<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-100 text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase custom-thead">
        <tr>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Work Type</th>
          <th scope="col" class="px-6 py-3">Salary Range</th>
          <th scope="col" class="px-6 py-3">Deadline</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Skills</th>
          <th scope="col" class="px-6 py-3">Responsibilities</th>
          <th scope="col" class="px-6 py-3">Qualifications</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white hover:bg-gray-50" v-for="post in posts" :key="post.id">
          <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div class="ps-3">
              <div class="text-base font-semibold">{{ post.title }}</div>
              <div class="font-normal text-gray-500">{{ post.location }}</div>
              <div class="font-normal text-gray-500">{{ post.category }}</div>
            </div>
          </th>
          <td class="px-6 py-4">{{ post.work_type }}</td>
          <td class="px-6 py-4">${{ post.salary_range }}</td>
          <td class="px-6 py-4">{{ post.deadline }}</td>
          <td class="px-6 py-4">{{ truncateText(post.description, 100) }}</td>
          <td class="px-6 py-4">
            <ul>
              <li v-for="(skill, index) in limitedList(post.skills, 3)" :key="index">{{ skill }}</li>
              <li v-if="post.skills && post.skills.split('\n').length > 3">...</li>
            </ul>
          </td>
          <td class="px-6 py-4">
            <ul>
              <li v-for="(responsibility, index) in limitedList(post.responsibilities, 3)" :key="index">{{ responsibility }}</li>
              <li v-if="post.responsibilities && post.responsibilities.split('\n').length > 3">...</li>
            </ul>
          </td>
          <td class="px-6 py-4">
            <ul>
              <li v-for="(qualification, index) in limitedList(post.qualifications, 3)" :key="index">{{ qualification }}</li>
              <li v-if="post.qualifications && post.qualifications.split('\n').length > 3">...</li>
            </ul>
          </td>
          <td class="px-6 py-4 flex space-x-2">
            <div class="circle-button bg-green-500 text-white">
              <font-awesome-icon :icon="['fas', 'xmark']" @click="rejectPost(post.id)" />
            </div>
            <div class="circle-button bg-green-500 text-white">
              <font-awesome-icon :icon="['fas', 'check']" @click="approvePost(post.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PostService from '@/services/PostService';

library.add(faXmark, faCheck);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts() {
      PostService.getPosts()
        .then(res => {
          this.posts = res.data.data;
          const filtered = this.posts.filter(res => res.status == 'pending');
          this.posts = this.posts.filter(post => post.status !== 'pending');
          this.posts = filtered;
          console.log(this.posts);
        })
        .catch(err => console.log(err));
    },
    truncateText(text, limit) {
      return text.length > limit ? text.substring(0, limit) + '...' : text;
    },
    limitedList(text, limit) {
      return text ? text.split('\n').slice(0, limit) : [];
    },
    approvePost(postId) {
      console.log(`Post ${postId} approved.`);
      PostService.updatePostStatus(postId, 'accepted');
      this.posts = PostService.getPosts();
    },
    rejectPost(postId) {
      console.log(`Post ${postId} rejected.`);
      PostService.updatePostStatus(postId, 'rejected');
      this.posts = PostService.getPosts();
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.custom-thead {
  background-color: #F0F5F3;
}

.circle-button {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
</style>
