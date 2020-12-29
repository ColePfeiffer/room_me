import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./Views/Home";

import AboutWGPage from "./Views/AboutWGPage";
import CleaningPage from "./Views/CleaningPage";
import Login from "./Views/Login";
import PurchasingPage from "./Views/PurchasingPage";

// https://vuejs.org/v2/cookbook/adding-instance-properties.html#When-Using-a-Module-System
Vue.prototype.$roomies = [
    {
      id: 0,
      username: "Chris",
      description: "Hi there!",
      profilePicture:
        "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      balance: 0,
      balancePlus: true,
      selected: true,
      color: "#1F85DE",
      showProfilePage: false,
      isLoggedIn: true,
    },
    {
      id: 1,
      username: "Hannah",
      description: "Möpp",
      profilePicture:
        "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      balance: 0,
      balancePlus: false,
      selected: true,
      color: "#DE591F",
      showProfilePage: false,
      isLoggedIn: false,
    },
    {
      id: 2,
      username: "Rufus",
      description: "",
      profilePicture:
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      balance: 0,
      balancePlus: true,
      selected: true,
      color: "#BDA0EC",
      showProfilePage: false,
      isLoggedIn: false,
    },
    {
      id: 3,
      username: "Tim",
      description: "",
      profilePicture:
        "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      balance: 0,
      balancePlus: true,
      selected: true,
      color: "#EBE386",
      showProfilePage: false,
      isLoggedIn: false,
    },
  ];

Vue.use(VueRouter);

// Router lädt die Elemente in den Contentbereich von App
const routes = [
    {path: '/meineWG', component: AboutWGPage},
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/login', component: Login},
    {path: '/einkaufen', component: PurchasingPage},
    {path: '/putzen', component: CleaningPage},
];


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;

