import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Views/Home";

import AboutWGPage from "./components/Views/AboutWGPage";
import CleaningPage from "./components/Views/CleaningPage";
import Login from "./components/Views/Login";
import PurchasingPage from "./components/Views/PurchasingPage";
import ToDoListPage from "./components/Views/ToDoListPage";
import SettingsPage from "./components/Views/SettingsPage";

Vue.use(VueRouter);

// Router lädt die Elemente in den Contentbereich von App
const routes = [
    {path: '/meineWG', component: AboutWGPage},
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/login', component: Login},
    {path: '/einkaufen', component: PurchasingPage},
    {path: '/todo', component: ToDoListPage},
    {path: '/settings', component: SettingsPage},
    {path: '/putzen', component: CleaningPage},
];


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;

