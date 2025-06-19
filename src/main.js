import { createApp } from "vue";
import App from "./App.vue";
import emptyStatePlugin from "@/plugins/emptyState";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "@/assets/main.css";
import pinia from './stores';
import { api } from './plugins/axios.ts';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useUserStore } from '@/stores/useUserStore';
const app = createApp(App);
app.use(emptyStatePlugin);
app.use(pinia);
app.use(router);
app.use(Antd);
const notification = useNotificationStore();
// Provide them under unique keys
app.provide('notification', notification);
app.provide('axios', api);
// ✅ Load user data on app startup
const userStore = useUserStore();
userStore.loadUser();
app.mount("#app");
