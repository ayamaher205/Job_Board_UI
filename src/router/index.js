import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ApplicationForm from '../views/ApplicationForm.vue'
import JobsPage from '../views/JobsPage.vue'
import SearchResult from '../views/SearchResult.vue'
import ShowApplications from '@/views/ShowApplications.vue'

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
      name: 'showApplications',
      component: ShowApplications
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
  ]
})

export default router
