import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import Sidebar from '../components/Sidebar.vue'
import EmployerProfile from '../components/EmployerProfile.vue'
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/employer',
      name:'empoyer_profile',
      component:Sidebar
    },
    {
      path:'/employer-profile',
      name:'profile',
      component:EmployerProfile
    },
    { path: '/jobs', name: 'Jobs', component: JobsPage }
    ,
   
    { path: '/searchResult', name: 'searchResult', component: SearchResult }
  ]
})

export default router
