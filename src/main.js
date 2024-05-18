import './assets/style.css'
// import './index.css'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import router from './router'
import CandidateLayout from './layouts/CandidateLayout.vue'

const app = createApp(CandidateLayout)
app.use(createPinia())
app.use(Vueform, vueformConfig)

app.use(router)

app.mount('#app')
