import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

const app = createApp(App)

const token = localStorage.getItem('authToken');
if (token) {
    store.dispatch('login', token);
}

app.use(store);
app.use(router)
app.mount('#app')
