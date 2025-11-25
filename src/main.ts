import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadGtag, pageview } from './plugins/ga'

const app = createApp(App)

const GA_ID = import.meta.env.VITE_GA_ID as string

if (import.meta.env.PROD) {
  loadGtag(GA_ID)
}

const OLD_HOSTS = new Set(['jew-web.netlify.app'])

if (OLD_HOSTS.has(window.location.host)) {
  const search = window.location.search || ''
  const currentHash = window.location.hash
  let targetPath = '/'

  if (currentHash && currentHash.startsWith('#/')) {
    targetPath = currentHash.substring(1)
  } else if (currentHash.startsWith('#')) {
    targetPath = currentHash.substring(1)
  }

  window.location.replace(`https://fanclub48thailand.netlify.app${targetPath}${search}`)
}

if (window.location.hash && window.location.hash.startsWith('#/')) {
  const realPath = window.location.hash.substring(1)
  window.history.replaceState({}, document.title, realPath)
}

router.afterEach((to) => {
  if (!import.meta.env.PROD) return

  const path = window.location.hash || to.fullPath || to.path
  const title = (to.meta?.title as string) || 'Fanclub 48 Thailand'

  document.title = title

  pageview(GA_ID, path, title)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
