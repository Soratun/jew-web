import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const OLD_HOSTS = new Set([
  'jew-web.netlify.app',
]);

if (OLD_HOSTS.has(window.location.host)) {
  const search = window.location.search || '';
  const hash = window.location.hash || '#/';
  window.location.replace(`https://fanclub48thailand.netlify.app/${search}${hash}`);
}

app.use(createPinia())
app.use(router)

app.mount('#app')
