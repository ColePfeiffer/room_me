import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // For Debugging
    debug: true,
    phone: false,

    // Task Management
    standardOrder: [], // array, holds references to roomie objects within roomies
    lastRoomieSelectedForStandardOrder: "",
    timeOptions: [
      { text: "Every day", days: 1 },
      { text: "Every week", days: 7 },
      { text: "Every 2 weeks", days: 14 },
      { text: "Every month", days: 30 },
      { text: "Every two months", days: 60 }
    ],

    // Data
    roomies: [],
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
    comments: [],
    rooms: [],
    counter: "kdkdkdd",
    shoppingList: [],
    taskList: []
  },
  getters: {
    currentUser: state => {
      return state.roomies.find(roomie => roomie.isLoggedIn === true);
    },
    getRoomieByID(state, id) {
      return state.roomies.find(roomie => roomie.id === id);
    },
    getRoomieFromTaskOrder(state, commit) {
      let roomieTaskGetsAssignedTo = state.standardOrder[0];
      commit.moveTaskOrder(state);
      return roomieTaskGetsAssignedTo;
    }
  },
  mutations: {
    // creates the standard order based on the order in the roomie array
    createOrder(state) {
      state.standardOrder = [];

      for (let i = 0; i < state.roomies.length; i++) {
        state.standardOrder.push({
          roomie: state.roomies[i],
          isAssignedToTask: true
        });
      }
      if (state.debug) console.log("Order created.");
    },
    moveTaskOrder(state) {
      state.standardOrder.push(state.standardOrder.shift());
      console.log("Standard Order shifted!");
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
      state.roomies.forEach(roomie => {
        roomie.isLoggedIn = false;
      });

      let roomie = state.roomies.find(roomie => roomie.id === roomieId);
      roomie.isLoggedIn = true;
    },
    setLastRoomieSelectedForStandardOrder(state, roomie) {
      state.lastRoomieSelectedForStandardOrder = roomie;
    }
  }
});
