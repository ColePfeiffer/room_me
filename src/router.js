import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Views/Home";

import AboutWGPage from "./Views/AboutWGPage";
import CleaningPage from "./Views/CleaningPage";
import PurchasingPage from "./Views/PurchasingPage";

Vue.use(VueRouter);

// Router lädt die Elemente in den Contentbereich von App
const routes = [
  { path: "/meineWG", component: AboutWGPage },
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/einkaufen", component: PurchasingPage },
  { path: "/putzen", component: CleaningPage }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
