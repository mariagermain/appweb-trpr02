import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '@/views/AccueilView.vue'
import GameView from '@/views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccueilView
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('../views/ScoreView.vue')
    },
    {
      path: '/game/:playerName&:shipName&:randIndex',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      props: true
    }
  ]
})

export default router
