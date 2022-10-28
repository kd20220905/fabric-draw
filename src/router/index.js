import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quessroom",
      name: "quessroom",
      component: () => import("../views/QuessRoom.vue"),
    },
    {
      path: "/drawroom",
      name: "drawroom",
      component: () => import("../views/DrawRoom.vue"),
    },
  ],
});

export default router;
