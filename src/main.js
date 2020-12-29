import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
//import store from "./store";
import Vuex from "vuex";

import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(Vuex);

//require("./assets/global.css")
//import "@/assets/global.css"

const store = new Vuex.Store({
  state: {
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
      },
    ],
    dummies: [
      {
        id: 19,
        type: "DUMMY",
        username: "David",
        description: "Hi there!",
        profilePicture: "https://i.imgur.com/eCG61tP.jpeg",
        showProfilePage: false,
        movedOut: true,
        moveInDate: new Date(2015, 10, 15),
        moveOutDate: new Date(2019, 5, 3)
      }
    ],
    rooms: [
      {
        id: "1",
        name: "room 1",
        currentRoomie: {
          id: 0,
          username: "Chris",
          description: "Hi there!",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: +3,
          balancePlus: true,
          selected: true,
          color: "#1F85DE",
          showProfilePage: false,
          isLoggedIn: true,
          movedOut: false,
          vacationMode: false,
          moveInDate: new Date(2019, 5, 10),
          moveOutDate: new Date(2017, 5, 3)
        },
        pastRoomies: [
          {
            id: 19,
            type: "DUMMY",
            username: "David",
            description: "Hi there!",
            profilePicture: "https://i.imgur.com/eCG61tP.jpeg",
            showProfilePage: false,
            movedOut: true,
            moveInDate: new Date(2015, 10, 15),
            moveOutDate: new Date(2019, 5, 3)
          }
        ]
      }
    ],
    counter: "kdkdkdd"
  },
  getters: {
    currentUser: state => {
      return state.roomies.find(roomie => roomie.isLoggedIn === true);
    }
  }
})


new Vue({
  icons: {
    iconfont: "md",
  },
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
