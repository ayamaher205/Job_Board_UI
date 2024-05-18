import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsstore = defineStore('posts', {
  state: () => ({
    allposts: [],
    PostsCount: 0,
  }),
  actions: {
    async fetchPostsCount(){
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all-posts');
        this.allposts = response.data.data;
        this.PostsCount = this.allposts.length;
        return this.allposts;
      } catch (error) {
        throw error;
      }
    },
    // async fetchPostsByEmployers() {
    //   try {
    //     const posts = await this.fetchPostsCount(); 
    //     const employersMap = posts.reduce((acc, post) => {
    //       const { employer } = post;
    //       acc[employer] = acc[employer] ? acc[employer] + 1 : 1;
    //       return acc;
    //     }, {});
    //     const employers = Object.keys(employersMap).map(employer => ({ name: employer, postCount: employersMap[employer] }));
    //     const sortedEmployers = employers.sort((a, b) => b.postCount - a.postCount).slice(0, 10);
    //     return sortedEmployers;
    //   } catch (error) {
    //     throw error;
    //   }
    // },
    
  },
  
});
