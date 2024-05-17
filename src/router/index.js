import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import Jobs from '@/components/Jobs.vue';
import ViewJob from '../components/ViewJob.vue'
import login from '../views/login.vue';
import registeration from '../views/registeration.vue';
import AdminLayout from '../layouts/adminLayout.vue';
import { requireAuth } from '../services/auth';
import addAdmin from '../views/AdminViews/addAdmin.vue';
import Dashboard from '../views/AdminViews/DashBoard.vue';
import candidates from '../views/AdminViews/candidates.vue';
import employers from '../views/AdminViews/employers.vue';
import updatePostStatus from '../views/AdminViews/updatePostStatus.vue';
import EmployerProfileView from '@/views/EmployerProfileView.vue';
import EmployerApplicationsView from '@/views/EmployerApplicationsView.vue';
import ShowApplications from '@/views/ShowApplications.vue'
import EditApplication from './../views/EditApplication.vue'
import ListApplications from '@/views/ListApplications.vue'
import DeleteApplication from './../views/DeleteApplication.vue'
import ApplicationForm from '@/views/ApplicationForm.vue';

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
      path: '/login',
      component: login,
      name: login,
    },
    {
      path: '/register',
      component: registeration,
      name: registeration,
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: AdminLayout,
      beforeEnter: requireAuth
    },
    {
      path: '/admin/add-admin',
      component: addAdmin,
      name: addAdmin,
      beforeEnter: requireAuth
    },

    //     {
    //       path: '/admin/dashboard',
    //       component: Dashboard,
    //       name:'Dashboard',
    // beforeEnter: requireAuth 

    //     },
    // {
    // path: '/admin/dashboard',
    // component: Dashboard,
    // name:Dashboard,
    // // meta: { requiresAuth: true } 
    // },
    // {
    // path: '/admin/candidates',
    // component: candidates,
    // name:candidates,
    // // meta: { requiresAuth: true }
    // },
    // {
    // path: '/admin/employers',
    // component: employers,
    // name:employers,
    // // meta: { requiresAuth: true }
    // },
    // {
    // path: '/admin/update-post-status',
    // component: updatePostStatus,
    // name:updatePostStatus,
    // // meta: { requiresAuth: true }
    // },
    // {
    // path: '/admin/add-admin',
    // component: addAdmin,
    // name:addAdmin,
    // // meta: { requiresAuth: true }
    // },

    {
      path: '/employer',
      name: 'empoyer_profile',
      component: EmployerProfileView
    },
    {
      path: '/applications',
      name: 'profile',
      component: EmployerApplicationsView
    },
    {
      path: '/posts',
      name: 'posts',
      component: Jobs
    },
    {
      path: '/post/:id',
      name: 'post',
      component: ViewJob
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
    { path: '/jobs', name: 'Jobs', component: JobsPage }
    ,

    { path: '/searchResult', name: 'searchResult', component: SearchResult }
  ]
})

export default router
