// import './assets/main.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'
const app = createApp(App)




// import AdminLayout from './layouts/adminLayout.vue'
// import router from './router/adminRoutes'
// const app = createApp(AdminLayout)


app.use(createPinia())
app.use(router)
const options = {
    confirmButtonColor: 'rgb(20 83 45)',
    cancelButtonColor: '#ff7674',
  };
app.use(VueSweetalert2,options);
app.mount('#app')

