import { createRouter, createWebHashHistory } from 'vue-router'
import NampingView from '@/views/NampingView.vue'
import TemplateView from '@/views/TemplateView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
import MeiView from '@/views/MeiView.vue'
import HomeView from '@/views/HomeView.vue'
import JewView from '@/views/JewView.vue'
import SatangpoundView from '@/views/SatangpoundView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: HomeView,
      beforeEnter() {
        const NEW_ORIGIN = 'https://fanclub48thailand.netlify.app';
        const hash = window.location.hash.replace(/^#/, '');
        const target = `${NEW_ORIGIN}/#${hash || '/'}`;
        window.location.replace(target);
        return false;
      },
    },
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
    },
    {
      path: '/satangpound',
      name: 'satangpound',
      component: SatangpoundView,
    }
  ],
})

export default router
