import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    // component: () => import("@/views/TheProductGallery.vue"),
    components: {
      default: () => import("@/views/TheProductGallery.vue"),
      productFilter: () =>
        import("@/components/ProductListItemPriceFilter.vue"),
      productSorter: () => import("@/components/ProductListItemSorter.vue"),
    },
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
