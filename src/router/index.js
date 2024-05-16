import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/CandidateComponents/Register.vue";
import Login from "../components/CandidateComponents/Login.vue";
import ProfileStore from "../components/CandidateComponents/ProfileStore.vue";
import UpdateProfile from "../components/CandidateComponents/UpdateProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/candidate/profile/store",
      name: "candidate_profile_store",
      component: ProfileStore,
    },
    {
      path: "/candidate/profile/me",
      name: "candidate_profile_view",
      component: UpdateProfile,
    },
   
  ],
});

export default router;
   