import { defineStore } from 'pinia';
import { usePostsstore } from '@/stores/posts';
import Swal from 'sweetalert2';


import axios from 'axios';

export const useCategorystore = defineStore('categories', {
  state: () => ({
    categories: [],
    
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all-categories');
        this.categories = response.data.data;
      } catch (error) {
        console.error('Failed to fetch categories', error);
        throw error;
      }
    },
    async updateCategory(categoryId, newName) {
        try {
          const response = await axios.put(`http://127.0.0.1:8000/api/categories/${categoryId}`, {name: newName},
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            }
          );
          const updatedCategoryIndex = this.categories.findIndex(category => category.id === categoryId);
          if (updatedCategoryIndex !== -1) {
            this.categories[updatedCategoryIndex] = response.data.data;
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to update category: ${error.response.data.errors.name[0]}`
          });
        }
      },
      async deleteCategory(categoryId) {
        try{

            const response = await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            }
          );
          this.categories = this.categories.filter(category => category.id !== categoryId);
            Swal.fire('Success', 'Category deleted successfully', 'success');
        }
      catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('Error', 'Failed to delete category', 'error');
      }

      },
      async addCategory(categoryName) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/categories', { name: categoryName },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
          );
          const newCategory = response.data.data;
          this.categories.push(newCategory);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to add category: ${error.response.data.errors.name[0]}`
          });
        }
      },
    },
  getters: {
    categoriesWithPostsCount() {
      const postsStore = usePostsstore();
      return this.categories.map(category => {
        let postsCount = 0;
        const posts = postsStore.allposts;
        posts.forEach(post => {
          if (post.category_id === category.id) {
            postsCount++;
          }
        });
        return {
          ...category,
          postsCount: postsCount
        };
      });
    }
  }
});

