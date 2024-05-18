 
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/style.css'
import '../node_modules/flowbite-vue/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Vueform from '@vueform/vueform'
import CandidateLayout from './layouts/CandidateLayout.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import vueformConfig from './../vueform.config'
import vueformConfig from '../vueform.config'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV);
// const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
const app = createApp(CandidateLayout)
app.use(createPinia())
app.use(Vueform, vueformConfig)

app.use(router)

const options = {
    confirmButtonColor: 'rgb(20 83 45)',
    cancelButtonColor: '#ff7674',
  };
app.use(VueSweetalert2,options);
app.mount('#app')
