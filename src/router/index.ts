import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/views/TheProductGallery.vue"),
  },
  {
    path: "/products/:id",
    component: () => import("@/views/TheProductPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
