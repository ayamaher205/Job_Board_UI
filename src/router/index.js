import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchResult from "../views/SearchResult.vue";
import JobsPage from "../views/JobsPage.vue";
import Sidebar from "../components/Sidebar.vue";
import EmployerProfile from "../components/EmployerProfile.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ApplicationForm from "../views/ApplicationForm.vue";
import JobsPage from "../views/JobsPage.vue";
import SearchResult from "../views/SearchResult.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
    {
      path: "/employer-profile",
      name: "profile",
      component: EmployerProfile,
    },
    { 
      path: "/jobs", 
      name: "Jobs", 
      component: JobsPage 
    },
    { 
      path: "/searchResult", 
      name: "searchResult", 
      component: SearchResult 
    },
    {
      path: "/applications",
      name: "ApplicationForm",
      component: ApplicationForm,
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
  ],
});

export default router;
