import './assets/style.css'
import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'
// import App from './App.vue'
import router from './router'
// import router from './router/adminRoutes'
// const app = createApp(App)
import AdminLayout from './layouts/adminLayout.vue'
import CandidateLayout from './layouts/CandidateLayout.vue'
const app = createApp(CandidateLayout)


app.use(createPinia())
app.use(router)
app.use(Vueform, vueformConfig)

app.mount('#app')
