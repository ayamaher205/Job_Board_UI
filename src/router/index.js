import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchResult from "../views/SearchResult.vue";
import Sidebar from "../components/Sidebar.vue";
// import EmployerProfile from "../components/EmployerProfile.vue";
import AboutView from "../views/AboutView.vue";
import ApplicationForm from "../views/ApplicationForm.vue";
import JobsPage from "../views/JobsPage.vue";
// import AdminLayout from '../layouts/adminLayout.vue';
// import Dashboard from '../views/AdminViews/DashBoard.vue';
// import candidates from '../views/AdminViews/candidates.vue';
// import employers from '../views/AdminViews/employers.vue';
// import updatePostStatus from '../views/AdminViews/updatePostStatus.vue';
// import addAdmin from '../views/AdminViews/addAdmin.vue';
import Register from "../components/CandidateComponents/Register.vue";
import Login from "../components/CandidateComponents/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/candidate/login",
      name: "candidate_login",
      component: Login,
    },
    {
      path: "/candidate/register",
      name: "candidate_registration",
      component: Register,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/employer",
      name: "empoyer_profile",
      component: Sidebar,
    },
    // {
    //   path: "/employer-profile",
    //   name: "profile",
    //   component: EmployerProfile,
    // },
    { 
      path: "/jobs", 
      name: "Jobs", 
      component: JobsPage 
    },
    // { 
    //   path: "/searchResult", 
    //   name: "searchResult", 
    //   component: SearchResult 
    // },
    // {
    //   path: "/applications",
    //   name: "ApplicationForm",
    //   component: ApplicationForm,
    // },
    // {
    //   path: "/jobs",
    //   name: "jobs",
    //   component: JobsPage,
    // },
    // {
    //   path: "/searchResult",
    //   name: "searchResult",
    //   component: SearchResult,
    // },
  ],
});

export default router;
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
//     {
//       path: '/admin',
//       name:'AdminLayout',
//       component: AdminLayout,
//       // meta: { requiresAuth: true } 
//     },
  
//     {
//       path: '/admin/dashboard',
//       component: Dashboard,
//       name:'Dashboard',
//       // meta: { requiresAuth: true } 
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
// ]
  
// })

// export default router

