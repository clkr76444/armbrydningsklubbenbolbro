import { createRouter, createWebHistory } from "vue-router";
import NewsView from "../views/NewsView.vue";

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
      component: () => import("../views/CreateNewsView.vue"),
    },
    {
      path: "/rediger/:id",
      name: "edit-news",
      component: () => import("../views/EditNewsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // Matcher alle adresser, som ikke passer til nogen af de andre routes
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
