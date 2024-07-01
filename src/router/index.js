// General Views
import AboutView from "../views/AboutView.vue";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Sidebar from '../layouts/Sidebar.vue'
import ViewJob from '../components/ViewJob.vue'
import registeration from '../views/registeration.vue';
import { requireAuth } from '../services/auth';

// Candidate Views
import Register from "../components/CandidateComponents/Register.vue";
import Login from "../components/CandidateComponents/Login.vue";
import ProfileStore from "../components/CandidateComponents/ProfileStore.vue";
import UpdateProfile from "../components/CandidateComponents/UpdateProfile.vue";


// Admin Views
import AdminLayout from '../layouts/adminLayout.vue';
import LoginAdmin from '../views/login.vue';
import addAdmin from '../views/AdminViews/addAdmin.vue';
import Dashboard from '../views/AdminViews/DashBoard.vue';
import candidates from '../views/AdminViews/candidates.vue';
import employers from '../views/AdminViews/employers.vue';
import admins from '../views/AdminViews/admins.vue';
import PostsAdmin from '../views/AdminViews/PostsAdmin.vue';
import AdminProfile from '../components/AdminComponenets/AdminProfile.vue';

// Employers Views
import EmployerApplicationsView from '@/views/EmployerApplicationsView.vue';
import EmployerDashboardView from '@/views/EmployerDashboardView.vue'
import EmployerProfileView from "@/views/EmployerProfileView.vue";
import EmployerJobsView from '@/views/EmployerJobsView.vue';
import EmployerPostJob from '@/views/EmployerPostJob.vue';
import EmployerProfile from '../components/EmployerProfile.vue';

// Applications Views
import ShowApplications from '@/views/ShowApplications.vue'
import EditApplication from './../views/EditApplication.vue'
import ListApplications from '@/views/ListApplications.vue'
import DeleteApplication from './../views/DeleteApplication.vue'
import ApplicationForm from '@/views/ApplicationForm.vue';

// Jobs Views
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
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
      // component: AboutView
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
  /*   {
      path: '/posts/:id',
      name: 'post',
      component: ViewJob
    }, */
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
      component:EmployerJobsView,
      beforeEnter: requireAuth
    },

    // admin
    {
      path: '/admin/login',
      name:'LoginAdmin',
      component: LoginAdmin,
    },
    {
      path: '/admin',
      name:'AdminLayout',
      component: AdminLayout,
      beforeEnter: requireAuth
    },
    {
      path: '/admin/add-admin',
      component: addAdmin,
      name:addAdmin,
      beforeEnter: requireAuth
    },
    {
      path: '/admin/dashboard',
      component: Dashboard,
      name:'Dashboard',
      beforeEnter: requireAuth 
  
    },
    {
      path: '/admin/candidates',
      component: candidates,
      name:candidates,
      beforeEnter: requireAuth 
    },
    {
        path: '/admin/employers',
        component: employers,
        name:employers,
        beforeEnter: requireAuth 
    },
    {
      path: '/admin/admins',
      component: admins,
      name:admins,
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/posts',
      component: PostsAdmin,
      name:PostsAdmin,
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/admin-profile',
      component: AdminProfile,
      name:AdminProfile,
      beforeEnter: requireAuth 
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
    
  ],

});

export default router;
