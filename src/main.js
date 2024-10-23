import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'

const app=createApp(App)
app.use(router)
app.component(Multiselect)
app.mount('#app')
