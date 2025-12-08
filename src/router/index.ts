import { createRouter, createWebHistory } from 'vue-router'
import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
import MeiView from '@/views/MeiView.vue'
import HomeView from '@/views/HomeView.vue'
import JewView from '@/views/JewView.vue'
import SatangpoundView from '@/views/SatangpoundView.vue'
import SatchanHBD2025View from '@/views/SatchanHBD2025View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'แฟนคลับ 48 ประเทศไทย Fanclub 48 Thailand' },
    },
    {
      path: '/template',
      name: 'template',
      component: TemplateView,
      meta: { title: 'Template' },
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: BirthdayView,
      meta: { title: 'Birthday' },
    },
    {
      path: '/meibirthday',
      name: 'meibirthday',
      component: MeiView,
      meta: { title: 'Mei Birthday' },
    },
    {
      path: '/namping',
      name: 'namping',
      component: NampingView,
      meta: { title: 'Namping' },
    },
    {
      path: '/jew-birthday-2025',
      name: 'jew-birthday-2025',
      component: JewView,
      meta: { title: 'jew-birthday-2025' },
    },
    {
      path: '/moonlight-and-monster',
      name: 'moonlight-and-monster',
      component: () => import('@/views/MoonlightAndMonsterView.vue'),
      meta: { title: 'Moonlight and Monster' },
    },
    {
      path: '/satangpound',
      name: 'satangpound',
      component: SatangpoundView,
      meta: { title: 'Satangpound' },
    },
    {
      path: '/satchan-birthday-2025',
      name: 'satchan-birthday-2025',
      component: SatchanHBD2025View,
      meta: { title: 'Satchan Birthday 2025' },
    },
  ],
})

export default router
