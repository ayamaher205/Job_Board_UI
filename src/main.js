import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'
import router from './router'
import CandidateLayout from './layouts/CandidateLayout.vue'

const app = createApp(CandidateLayout)
app.use(createPinia())
app.use(router)
app.use(Vueform, vueformConfig)
app.mount('#app')
