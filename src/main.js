// import './assets/main.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-loading-overlay/dist/vue-loading.css';

import '../node_modules/flowbite-vue/dist/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite';

import '../node_modules/flowbite-vue/dist/index.css'
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';
import Vueform from '@vueform/vueform';
import vueformConfig from '../vueform.config';
import router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';

// Importing Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite'
import AdminLayout from './layouts/adminLayout.vue';


//import AdminLayout from './layouts/adminLayout.vue'

library.add(faEllipsisV);
library.add(fas);

const app = createApp(AdminLayout);

// const app = createApp(App)
// Using Pinia for state management
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());

// Using Vue Router
app.use(router);

// Using Vueform
app.use(Vueform, vueformConfig);

// Configuring SweetAlert2
const options = {
  confirmButtonColor: 'rgb(20 83 45)',
  cancelButtonColor: '#ff7674',
};
app.use(VueSweetalert2, options);



// Mounting the app
app.mount('#app');
