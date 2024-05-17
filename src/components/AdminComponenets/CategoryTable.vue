<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" @click="addCategory">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    <div class="scrollable-table">
      <table class="w-full bg-gray">
        <thead class="table-head">
          <tr>
            <th class="py-2 px-2 border-b border-gray-200">Name</th>
            <th class="py-2 px-2 border-b border-gray-200">No.Posts</th>
            <th class="py-2 px-2 border-b border-gray-200" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="category in categoriesWithPostsCount" :key="category.id">
            <td class="py-2 px-2 border-b border-gray-200">{{ category.name }}</td>
            <td class="py-2 px-2 border-b border-gray-200">{{ category.postsCount }}</td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 cursor-pointer text-blue-500" @click="editCategory(category)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487 19.5 7.125M16.862 4.487 18.55 2.8a1.875 1.875 0 0 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z"/>
              </svg>
            </td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 cursor-pointer text-red-500" @click="deleteCategory(category)">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
              </svg>
            </td>
          </tr>
          <tr v-if="categoriesWithPostsCount.length === 0">
            <td class="py-2 px-4 border-b border-gray-200" colspan="3">No categories available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useCategorystore } from '@/stores/categories';
import Swal from 'sweetalert2';

export default {
  name: 'CategoryTable',
  setup() {
    const categorystore = useCategorystore();

    onMounted(async () => {
      try {
        await categorystore.fetchCategories();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const categoriesWithPostsCount = computed(() => categorystore.categoriesWithPostsCount);

    const editCategory = (category) => {
      Swal.fire({
        title: 'Edit Category',
        input: 'text',
        inputValue: category.name,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        preConfirm: (newName) => {
          return newName;
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const newName = result.value;
            categorystore.updateCategory(category.id, newName);
          } catch (error) {
            console.log('Error updating category:', error.response.data.errors.name[0]);
          }
        }
      });
    };

    const deleteCategory = (category) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            categorystore.deleteCategory(category.id);
          } catch (error) {
            console.log('Error deleting category:', error.response.data.errors.name[0]);
          }
        }
      });
    };

    const addCategory = () => {
      Swal.fire({
        title: 'Add Category',
        input: 'text',
        inputPlaceholder: 'Enter category name',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        preConfirm: (categoryName) => {
          if (!categoryName) {
            Swal.showValidationMessage('Category name is required');
          } else {
            return categoryName;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const categoryName = result.value;
            categorystore.addCategory(categoryName);
          } catch (error) {
            console.error('Error adding category:', error);
          }
        }
      });
    };

    return {
      categoriesWithPostsCount,
      editCategory,
      deleteCategory,
      addCategory
    };
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #dfd8d8;
}

.scrollable-table {
  min-width: 350px;
  max-height: 350px;
  overflow-y: auto;
}

.table-body {
  background-color: #e4e6f8bd;
}

.table-head {
  background-color: #feeafa;
}
</style>
