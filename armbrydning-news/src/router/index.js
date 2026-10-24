import { createRouter, createWebHistory } from "vue-router";
import NewsView from "../views/NewsView.vue";
import CreateNewsView from "../views/CreateNewsView.vue";
import EditNewsListView from "../views/EditNewsListView.vue";
import EditNewsView from "../views/EditNewsView.vue";
import NotFoundView from "../views/NotFoundView.vue";

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
    {
      path: "/rediger",
      name: "edit-news-list",
      component: EditNewsListView,
    },
    {
      path: "/rediger/:id",
      name: "edit-news",
      component: EditNewsView,
    },
    {
      path: "/:pathMatch(.*)*", // Matcher alle adresser, som ikke passer til nogen af de andre routes
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
