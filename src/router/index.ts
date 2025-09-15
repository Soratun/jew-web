import { createRouter, createWebHashHistory } from 'vue-router'
// import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
import MeiView from '@/views/MeiView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MeiView,
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
    {
      path: '/meibirthday',
      name: 'meibirthday',
      component: MeiView,
    },
  ],
})

export default router
