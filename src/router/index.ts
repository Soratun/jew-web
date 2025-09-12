import { createRouter, createWebHistory } from 'vue-router'
import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NampingView,
    },
    {
      path: '/template',
      name: 'template',
      component: TemplateView,
    },
  ],
})

export default router
