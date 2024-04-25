import type { RouteRecordRaw } from "vue-router";
import AccueilView from "@/views/AccueilView.vue";

const routes: Array<RouteRecordRaw> = [
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

  export default routes