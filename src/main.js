import './assets/style.css'
import './assets/main.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Vueform from '@vueform/vueform'
import CandidateLayout from './layouts/CandidateLayout.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import vueformConfig from './../vueform.config'

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
