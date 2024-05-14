import './assets/style.css'
import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'
// import App from './App.vue'
// import router from './router'
// const app = createApp(App)
import AdminLayout from './layouts/adminLayout.vue'
import router from './router/adminRoutes'
const app = createApp(AdminLayout)


app.use(createPinia())
app.use(router)
app.use(Vueform, vueformConfig)

app.mount('#app')
