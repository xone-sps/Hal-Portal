import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Cod from "@/pages/CodView.vue";
import SelfDelivery from "@/pages/SelfDelivery.vue";

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
