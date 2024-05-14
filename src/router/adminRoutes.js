import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../layouts/adminLayout.vue';
import Dashboard from '../views/AdminViews/DashBoard.vue';
import candidates from '../views/AdminViews/candidates.vue';
import employers from '../views/AdminViews/employers.vue';
import updatePostStatus from '../views/AdminViews/updatePostStatus.vue';
import addAdmin from '../views/AdminViews/addAdmin.vue';
// import Settings from '../views/AdminViews/updatePostStatus.vue';


const routes = [
    {
        path: '/admin',
        component: AdminLayout,
        name:AdminLayout,
        // meta: { requiresAuth: true } 
    },
  {
    path: '/admin/dashboard',
    component: Dashboard,
    name:Dashboard,
    // meta: { requiresAuth: true } 
  },
  {
    path: '/admin/candidates',
    component: candidates,
    name:candidates,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/employers',
    component: employers,
    name:employers,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/update-post-status',
    component: updatePostStatus,
    name:updatePostStatus,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/add-admin',
    component: addAdmin,
    name:addAdmin,
    // meta: { requiresAuth: true }
  },
];

const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),

  routes
});

export default router;
