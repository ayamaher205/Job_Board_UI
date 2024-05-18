<template>
  <div class="w-90 px-4 bg-white rounded-xl shadow-lg">
    <div class="grid gap-8 grid-cols-1">
      <div class="flex flex-col">
        <div class="flex flex-col sm:flex-row items-center">
          <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
        </div>
        <div>
          <form @submit.prevent="submitForm">
            <div class="md:flex flex-row md:space-x-4 w-full text-xs">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Title <abbr title="required"></abbr></label>
                <input v-model="formData.title" placeholder="title" class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"  type="text" name="title" id="title" />
                <p v-if="errors.title" class="text-red text-xs">{{ errors.title }}</p>
              </div>
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Deadline<abbr title="required"></abbr></label>
                <input v-model="formData.deadline" placeholder="deadline" class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"  type="date" name="deadline" id="deadline" />
                <p v-if="errors.deadline" class="text-red text-xs">{{ errors.deadline }}</p>
              </div>
            </div>
            <div class="md:flex flex-row md:space-x-4 w-full text-xs">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Work Type <abbr title="required"></abbr></label>
                <select v-model="formData.work_type" class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"  name="work_type" id="work_type">
                  <option value="offline">Offline</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <p v-if="errors.work_type" class="text-red text-xs">{{ errors.work_type }}</p>
              </div>
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Location<abbr title="required"></abbr></label>
                <input v-model="formData.location" placeholder="location" class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"  type="text" name="location" id="location" />
                <p v-if="errors.location" class="text-red text-xs">{{ errors.location }}</p>
              </div>
            </div>
            <div class="md:flex flex-row md:space-x-4 w-full text-xs">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Salary<abbr title="required"></abbr></label>
                <input v-model="formData.salary_range" placeholder="salary" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 form-control"  type="text" name="salary" id="salary" />
                <p v-if="errors.salary_range" class="text-red text-xs">{{ errors.salary_range }}</p>
              </div>
              <div class="mb-3 space-y-2 w-full text-xs">
                <label class="font-semibold text-gray-600 py-2">Category<abbr title="required"></abbr></label>
                <input v-model="formData.category_id" placeholder="category" class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"  type="text" name="category" id="category" />
                <p v-if="errors.category_id" class="text-red text-xs">{{ errors.category_id }}</p>
              </div>
            </div>
            <div class="flex-auto w-full mb-1 text-xs space-y-2">
              <label class="font-semibold text-gray-600 py-2">Description</label>
              <textarea v-model="formData.description"  class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4" placeholder="Enter description of post" spellcheck="false"></textarea>
              <p v-if="errors.description" class="text-red text-xs">{{ errors.description }}</p>
            </div>
            <div class="flex-auto w-full mb-1 text-xs space-y-2">
              <label class="font-semibold text-gray-600 py-2">Responsibilities</label>
              <textarea v-model="formData.responsibilities"  class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4" placeholder="Enter responsibilities" spellcheck="false"></textarea>
              <p v-if="errors.responsibilities" class="text-red text-xs">{{ errors.responsibilities }}</p>
            </div>
            <div class="flex-auto w-full mb-1 text-xs space-y-2">
              <label class="font-semibold text-gray-600 py-2">Skills</label>
              <textarea v-model="formData.skills"  class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4" placeholder="Enter skills" spellcheck="false"></textarea>
              <p v-if="errors.skills" class="text-red text-xs">{{ errors.skills }}</p>
            </div>
            <div class="flex-auto w-full mb-1 text-xs space-y-2">
              <label class="font-semibold text-gray-600 py-2">Qualifications</label>
              <textarea v-model="formData.qualifications"  class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4" placeholder="Enter qualifications" spellcheck="false"></textarea>
              <p v-if="errors.qualifications" class="text-red text-xs">{{ errors.qualifications }}</p>
            </div>
            <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
              <button type="button" @click="clearForm" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Reset</button>
              <button type="submit" class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/PostService';

export default {
  data() {
    return {
      formData: {
        title: '',
        deadline: '',
        work_type: '',
        location: '',
        salary_range: '',
        category_id: '',
        description: '',
        responsibilities: '',
        skills: '',
        qualifications: ''
      },
      errors: {}
    };
  },
  methods: {
    async submitForm() {
      try {
        await PostService.createPost(this.formData);
        this.clearForm();
        this.$router.push('/employer-posts');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error creating post:', error);
        }
      }
    },
    clearForm() {
      this.formData = {
        title: '',
        deadline: '',
        work_type: '',
        location: '',
        salary_range: '',
        category_id: '',
        description: '',
        responsibilities: '',
        skills: '',
        qualifications: ''
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
.text-red {
  color: #f00;
}
</style>
