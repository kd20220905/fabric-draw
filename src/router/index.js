import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import QuessRoom from "@/views/QuessRoom.vue";
import DrawRoom from "@/views/DrawRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quessroom/:id/:memberId",
      name: "QuessRoom",
      component: QuessRoom,
    },
    {
      path: "/drawroom/:id",
      name: "DrawRoom",
      component: DrawRoom,
    },
  ],
});

export default router;
