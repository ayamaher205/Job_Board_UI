import './assets/main.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)



// import AdminLayout from './layouts/adminLayout.vue'
// import router from './router/adminRoutes'
// const app = createApp(AdminLayout)


app.use(createPinia())
app.use(router)

app.mount('#app')
