import AboutView from "../views/AboutView.vue";
import JobDetails from "../views/JobDetails.vue";
import Register from "../components/CandidateComponents/Register.vue";
import Login from "../components/CandidateComponents/Login.vue";
import ProfileStore from "../components/CandidateComponents/ProfileStore.vue";
import UpdateProfile from "../components/CandidateComponents/UpdateProfile.vue";
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import EmployerProfileView from "@/views/EmployerProfileView.vue";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import Sidebar from '../layouts/Sidebar.vue'
import ViewJob from '../components/ViewJob.vue'
import EmployerJobsView from '@/views/EmployerJobsView.vue';
import EmployerPostJob from '@/views/EmployerPostJob.vue';
import EmployerProfile from '../components/EmployerProfile.vue';
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
import EmployerDashboardView from '@/views/EmployerDashboardView.vue'
import JobDetails from '../views/JobDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // general
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

    // auth
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "registration",
      component: Register,
    },

    // profile
    {
      path: "/candidate/profile/store",
      name: "candidate_profile_store",
      component: ProfileStore,
    },
    {
      path: "/candidate/profile/me",
      name: "candidate_profile_view",
      component: UpdateProfile,
    },

    // posts
    {
      path: "/jobs",
      name: "jobs",
      component: JobsPage,
    },
    {
      path: "/searchResult",
      name: "searchResult",
      component: SearchResult,
    },
    { 
      path: "/posts/:id",
      name: "job-details",
      component: JobDetails 
    },
    {
      path:'/post-job',
      name:'create_post',
      component:EmployerPostJob
    },
    {
      path: '/post/:id',
      name: 'post',
      component: ViewJob
    },

    // employer
    {
      path: '/employer',
      name: 'empoyer_profile',
      component: EmployerProfileView
    },
    {
      path: '/employer-applications',
      name: 'profile',
      component: EmployerApplicationsView
    },
    {
      path:'/employer-dashboard',
      name:'Employer Dashboard',
      component:EmployerDashboardView
    },
    {
      path:'/employer-posts',
      name:'posts',
      component:EmployerJobsView
    },

  ],

});

export default router;
