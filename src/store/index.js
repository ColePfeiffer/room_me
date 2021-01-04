import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    standardOrder: [], // array, holds references to roomie objects within roomies
    timeOptions: [
      { text: "Every day", days: 1 },
      { text: "Every week", days: 7 },
      { text: "Every 2 weeks", days: 14 },
      { text: "Every month", value: 30 },
      { text: "Every two months", days: 60 },
    ],
    roomies: [
      {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture: "https://i.imgur.com/ER53sz6.png",
        moveInDate: new Date(2015, 10, 15),
        moveOutDate: new Date(2019, 5, 3),
        movedOut: false,
        balance: 0,
        color: "#1F85DE",
        selected: true,
        showProfilePage: false,
        isLoggedIn: true,
      },
      {
        id: 1,
        username: "Hannah",
        description: "Möpp",
        profilePicture: "https://i.imgur.com/9eCV1NG.png",
        moveInDate: new Date(2015, 10, 15),
        moveOutDate: new Date(2019, 5, 3),
        movedOut: false,
        balance: 0,
        selected: true,
        color: "#DE591F",
        showProfilePage: false,
        isLoggedIn: false,
      },
      {
        id: 2,
        username: "Rufus",
        description: "",
        profilePicture: "https://i.imgur.com/ELDlNNK.png",
        moveInDate: new Date(2015, 10, 15),
        moveOutDate: new Date(2019, 2, 3),
        movedOut: false,
        balance: 0,
        selected: true,
        color: "#BDA0EC",
        showProfilePage: false,
        isLoggedIn: false,
      },
      {
        id: 3,
        username: "Tim",
        description: "",
        profilePicture: "https://i.imgur.com/7xffhX9.png",
        moveInDate: new Date(2015, 10, 15),
        moveOutDate: new Date(2019, 3, 3),
        movedOut: false,
        balance: 0,
        selected: true,
        color: "#EBE386",
        showProfilePage: false,
        isLoggedIn: false,
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
        moveOutDate: new Date(2019, 5, 3),
      },
    ],
    comments: [
    ],
    rooms: [],
    counter: "kdkdkdd",
    shoppingList: [],
    taskList: [
      {
        id: 1,
        name: "Küche putzen",
        description: "Küche muss geschrubbat werdn.",
        endDate: "22.10.20",
        startDate: "",
        completedOn: "",
        intervallDays: 2,
        // Status: 0 - offen, accepted: 1, declined: 2, done: 3
        status: 0,
        order: [],
        swapDecline: [{ roomie: "", type: "", comment: "" }],
        color: "#315458",
        taskCreator: "",
      },
      {
        id: 2,
        name: "Küche putzen",
        description: "KHallo... ksksk dkdkd",
        endDate: "22.10.20",
        startDate: "",
        completedOn: "",
        intervallDays: 2,
        // Status: 0 - offen, accepted: 1, declined: 2, done: 3
        status: 0,
        order: [],
        swapDecline: [{ roomie: "", type: "", comment: "" }],
        color: "#315458",
      },
      {
        id: 5,
        name: "Müll rausbringen",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
        endDate: "",
        startDate: "",
        completedOn: "",
        intervallDays: 2,
        // Status: 0 - offen, accepted: 1, declined: 2, done: 3
        status: 0,
        order: [],
        swapDecline: [{ roomie: "", type: "", comment: "" }],
        color: "#315458",
        taskCreator: "",
      },
    ],
  },
  getters: {
    currentUser: (state) => {
      return state.roomies.find((roomie) => roomie.isLoggedIn === true);
    },
    getRoomieByID(state, id) {
      return state.roomies.find((roomie) => roomie.id === id);
    },
  },
  mutations: {
    createOrder(state) {
      state.standardOrder = [];
      for (let i = 0; i < state.roomies.length; i++) {
        state.standardOrder.push(state.roomies[i]);
      }

      if (state.debug) console.log("Order created.");
    },
    updateOrder(state) {
      state.standardOrder = [];
      for (let i = 0; i < state.roomies.length; i++) {
        state.standardOrder.push(state.roomies[i]);
      }

      if (state.debug) console.log("Order created.");
    },

    // Setters and Toggles
    toggleDebug(state) {
      state.debug = !state.debug;
      console.log("Debug mode was turned " + state.debug);
    },

    togglePhone(state) {
      state.phone = !state.phone;
      console.log("Phone mode was turned " + state.phone);
    },

    setCurrentUser(state, roomieId) {
      state.roomies.forEach((roomie) => {
        roomie.isLoggedIn = false;
      });

      let roomie = state.roomies.find((roomie) => roomie.id === roomieId);
      roomie.isLoggedIn = true;
    },
  },
});
