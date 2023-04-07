import { createApp } from 'vue'

import App from './App.vue'
import VueLazyLoad from "vue3-lazy"
import './assets/scss/index.scss'

const app = createApp(App)
app.use(VueLazyLoad, {
    error: ""
})

app.mount('#app')
