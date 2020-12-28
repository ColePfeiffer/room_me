import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

//require("./assets/global.css")
//import "@/assets/global.css"

export const data = new Vue({
  data: {
    roomies: [
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
        isLoggedIn: true
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
        isLoggedIn: false
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
        isLoggedIn: false
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
        isLoggedIn: false
      }
    ],
  },
  methods: {
    changeAge(){
      console.log("lol");
    }
  }

});


new Vue({
  icons: {
    iconfont: "md",
  },
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
