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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
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
    {
      path: "/candidate/profile/store",
      name: "candidate_profile_store",
      component: ProfileStore,
    },
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
    { path: "/posts/:id", name: "job-details", component: JobDetails },
    {
      path: "/candidate/profile/me",
      name: "candidate_profile_view",
      component: UpdateProfile,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  ],
});

export default router;
