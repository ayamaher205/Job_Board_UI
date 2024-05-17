import { defineStore } from 'pinia';
import { usePostsstore } from '@/stores/posts';
import { useUserstore } from '@/stores/users'
import Swal from 'sweetalert2';


import axios from 'axios';

export const useEmployerstore = defineStore('employers', {
  state: () => ({
    employers: [],
    
  }),
  actions: {
    },
  getters: {
    employersWithPostsCount() {
        const postsStore = usePostsstore();
        const userStore = useUserstore();
    
        const employers = userStore.Employers;
        const posts = postsStore.allposts
        console.log(posts)
    
        return employers.map(employer => {
            let postsCount = 0;
            posts.forEach(post => {
                if (post.user_id === employer.id) {
                    postsCount++;
                }
            });
            return {
                ...employer,
                postsCount: postsCount
            };
        });
    }
  }
});

