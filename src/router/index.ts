import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Cod from "@/pages/cod/AllCod.vue";
import SelfDelivery from "@/pages/SelfDelivery.vue";
import PendingCodDetail from "@/pages/cod/PendingCodDetail.vue";
import SuccessCodDetail from "@/pages/cod/SuccessCodDetail.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "dashboard", component: Dashboard },
    ],
  },
  {
    path: "/cod",
    component: DefaultLayout,
    children: [
      { path: "", name: "cod", component: Cod },
      { path: "/pending-cod-detail", name: "pending-cod-detail", component: PendingCodDetail },
      { path: "/success-cod-detail", name: "success-cod-detail", component: SuccessCodDetail },
    ],
  },
  {
    path: "/self-delivery",
    component: DefaultLayout,
    children: [
      { path: "", name: "self-delivery", component: SelfDelivery },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
