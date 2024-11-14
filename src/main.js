import './assets/main.css'
import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import store from "./store"
import { MotionPlugin } from '@vueuse/motion'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

const token = localStorage.getItem('authToken');
if (token) {
    store.dispatch('login', token);
}

app.use(store);
app.use(router)
app.use(Antd);
app.use(MotionPlugin)
app.mount('#app')
