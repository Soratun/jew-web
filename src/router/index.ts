import { createRouter, createWebHistory } from 'vue-router'
// import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'
import BirthdayView from '@/views/BirthdayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TemplateView,
    },
    {
      path: '/template',
      name: 'template',
      component: TemplateView,
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: BirthdayView,
    },
  ],
})

export default router
