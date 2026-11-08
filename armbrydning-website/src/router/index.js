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

  // Bestemmer, hvor siden skal scrolle hen ved navigation ud fra to parametre
  scrollBehavior(to, _from, savedPosition) {
    // Gendanner seneste scrollposition på siden, hvis brugeren går frem eller tilbage
    if (savedPosition) {
      return savedPosition
    }

    // Dynamisk navigation til specifikke sektioner på siden.
    // Hvis URL'en indeholder et #id, scroller vi til elementet med det ID.
    if (to.hash) {
      return { el: to.hash } // el er en property, som angiver det element, vi scroller til
    }

    // Ved almindelig navigation starter siden øverst = early returns
    return { top: 0 }
  },
})

export default router
