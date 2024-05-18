<script setup>
import Sidebar from '../layouts/Sidebar.vue'
import PostAJob from '../components/PostAJob.vue'
</script>
<template>
<div class="flex h-screen bg-gray-50 dark:bg-white-800">
  <div class="hidden md:flex flex-col w-64 bg-gray-800">
    <div  class="flex flex-col flex-1 overflow-y-auto">
      <Sidebar/>
    </div>
  </div>
  
  <div class="flex flex-col flex-1 overflow-y-auto">
    <h1 class="font-semibold text-lg mr-auto text-green-900 m-5">Create Post</h1>
    <PostAJob class="mx-5"/>
  </div>
</div>
</template>