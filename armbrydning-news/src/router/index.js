import { createRouter, createWebHistory } from "vue-router";
import NewsView from "../views/NewsView.vue";
import CreateNewsView from "../views/CreateNewsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "news",
      component: NewsView,
    },
    {
      path: "/opret",
      name: "create-news",
      component: CreateNewsView,
    },
  ],
});

export default router;
