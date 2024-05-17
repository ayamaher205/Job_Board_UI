import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ApplicationForm from '../views/ApplicationForm.vue'
import JobsPage from '../views/JobsPage.vue'
import SearchResult from '../views/SearchResult.vue'
import ShowApplications from '@/views/ShowApplications.vue'
import EditApplication from './../views/EditApplication.vue'
import ListApplications from '@/views/ListApplications.vue'
import DeleteApplication from './../views/DeleteApplication.vue'
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import JobDetails from '../views/JobDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/applications',
      name: 'ApplicationForm',
      component: ApplicationForm
    },
    {
      path: '/get-applications',
      name: 'getApplications',
      component: ListApplications
    },
    {
      path: '/edit-applications/:id',
      name: 'editApplications',
      component: EditApplication
    },
    {
      path: '/show-applications/:id',
      name: 'showApplications',
      component: ShowApplications
    },
    {
      path: '/delete-applications/:id',
      name: 'deleteApplications',
      component: DeleteApplication
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsPage
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult
    }
   
    { path: '/jobs', name: 'Jobs', component: JobsPage }
    ,
   
    { path: '/searchResult', name: 'searchResult', component: SearchResult },

    {path: '/posts/:id', name: 'job-details', component: JobDetails},
  ]
})

export default router
