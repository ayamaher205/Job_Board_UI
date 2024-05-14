<template>
    <div class="bg-white rounded-lg p-10 max-w-lg shadow-box-circle dark:bg-dark-1000">
      <form class="w-full" @submit.prevent="submitApplication">
        <div class="text-xl mb-4 col-span-12">
          <div class="border-b border-gray-300 pb-2 dark:border-dark-600">Application Details</div>
        </div>
  
        <!-- User ID -->
        <TextElement
          name="user_id"
          label="User ID"
          rules="required|integer"
        />
  
        <!-- Post ID -->
        <TextElement
          name="post_id"
          label="Post ID"
          rules="required|integer"
        />
  
        <!-- Resume -->
        <FileElement
          name="resume"
          label="Resume"
          description="Upload your resume (PDF format, max 2MB)"
          accept=".pdf"
          rules="required|file|mimes:pdf|max:2048"
        />
  
        <!-- Contact Details -->
        <TextElement
          name="contact_details"
          label="Contact Details"
          placeholder="Enter your contact details"
        />
  
        <!-- Applicant Email -->
        <TextElement
          name="app_email"
          label="Applicant Email"
          rules="required|email"
        />
  
        <!-- Applicant Phone -->
        <TextElement
          name="app_phone"
          label="Applicant Phone"
          rules="required|string"
        />
  
        <!-- Submit button -->
        <ButtonElement
          submits
          name="submit"
          button-label="Submit Application"
          button-class="vf-btn-primary"
        />
      </form>
    </div>
  </template>
  
  <script>
  import { Vueform, useVueform } from '@vueform/vueform'
  import axios from 'axios'
  
  export default {
    name: 'application',
    mixins: [ Vueform ],
    setup: useVueform,
    methods: {
      async submitApplication() {
        try {
          const formData = this.getFormData()
          console.log(formData);
          const response = await axios.post('http://127.0.0.1:8000/api/applications', formData)
          console.log('Application submitted successfully:', response.data)
          this.resetForm()
        } catch (error) {
          console.error('Error submitting application:', error)
        }
      }
    }
  }
  </script>
  