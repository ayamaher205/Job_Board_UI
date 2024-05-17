import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.css';

import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);



// import AdminLayout from './layouts/adminLayout.vue'
// import router from './router/adminRoutes'
// const app = createApp(AdminLayout)


app.use(createPinia())
app.use(Vueform, vueformConfig)

app.use(router)
const options = {
    confirmButtonColor: 'rgb(20 83 45)',
    cancelButtonColor: '#ff7674',
  };
app.use(VueSweetalert2,options);
app.mount('#app')
