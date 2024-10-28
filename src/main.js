import './assets/main.css'

import { createApp } from 'vue'
import { Auth0Plugin } from '@auth0/auth0-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.use(Auth0Plugin, {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
});
