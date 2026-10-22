import { createRouter, createWebHistory } from 'vue-router'
import NewsView from '../views/NewsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'news',
      component: NewsView
    }
  ]
})

export default router