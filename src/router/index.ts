import { createRouter, createWebHashHistory } from 'vue-router'
import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
import MeiView from '@/views/MeiView.vue'
import HomeView from '@/views/HomeView.vue'
import JewView from '@/views/JewView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    {
      path: '/namping',
      name: 'namping',
      component: NampingView,
    },
    {
      path: '/jew',
      name: 'jew',
      component: JewView,
    },
    {
      path: '/moonlight-and-monster',
      name: 'moonlight-and-monster',
      component: () => import('@/views/MoonlightAndMonsterView.vue'),
    }
  ],
})

export default router
