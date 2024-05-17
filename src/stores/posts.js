import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsstore = defineStore('posts', {
  state: () => ({
    allposts: [],
    PostsCount:0,

  }),
  actions: {
    async fetchPostsCount() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all-posts');
        this.allposts = response.data.data;
        this.PostsCount = this.allposts.length;
        console.log(this.allposts)
      } catch (error) {
        throw error;
      }
    },
  },
});
