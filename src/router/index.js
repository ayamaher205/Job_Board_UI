import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import JobDetails from "../views/JobDetails.vue";
import Register from "../components/CandidateComponents/Register.vue";
import Login from "../components/CandidateComponents/Login.vue";
import ProfileStore from "../components/CandidateComponents/ProfileStore.vue";
import UpdateProfile from "../components/CandidateComponents/UpdateProfile.vue";
import SearchResult from '../views/SearchResult.vue';
import JobsPage from '../views/JobsPage.vue';
import EmployerProfileView from "@/views/EmployerProfileView.vue";

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
      component: AboutView
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
    
    // employer
    {
      path: '/employer',
      name: 'empoyer_profile',
      component: EmployerProfileView
    },

  ],
});

export default router;
