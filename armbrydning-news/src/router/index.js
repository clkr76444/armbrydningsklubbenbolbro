import { createRouter, createWebHistory } from "vue-router";
import NewsView from "../views/NewsView.vue";
import { auth } from "../firebase";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "news",
      component: NewsView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/opret",
      name: "create-news",
      component: () => import("../views/CreateNewsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/rediger/:id",
      name: "edit-news",
      component: () => import("../views/EditNewsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*", // Matcher alle adresser, som ikke passer til nogen af de andre routes
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

// Navigation guard for authentication
const ADMIN_UID = "OT3NVoOeWMe2AROEUqaquMXTUnJ3";

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return;

  // Vent på, at Firebase har afklaret loginstatus
  await auth.authStateReady();

  // Kontroller, om brugeren er den godkendte administrator
  if (auth.currentUser?.uid !== ADMIN_UID) {
    return {
      name: auth.currentUser ? "news" : "login",
    };
  }
});

export default router;
