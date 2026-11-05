import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BecomeMemberView from '../views/BecomeMemberView.vue'
import PracticalInfoView from '../views/PracticalInfoView.vue'
import ContactView from '../views/ContactView.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/om-klubben',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/bliv-armbryder',
      name: 'become-member',
      component: BecomeMemberView,
    },
    {
      path: '/praktisk-info',
      name: 'practical-info',
      component: PracticalInfoView,
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/nyheder',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/nyheder/:id',
      name: 'news-detail',
      component: NewsDetailView,
    },
  ],
})

export default router
