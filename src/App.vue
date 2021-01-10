<template>
  <v-app class>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dark color="#211E21">
        <!--                 Title for Toolbar-->
        <v-toolbar-title style="cursor: pointer" @click="goToPageAndSetColor('/home')">
          RoomMe
          <v-icon right></v-icon>
        </v-toolbar-title>
        <v-btn class="no-background-hover" text color="white" @click="goToPageAndSetColor('/home')">
          <span></span>
          <v-icon :color="getColor('/home')">mdi-home</v-icon>
        </v-btn>
        <v-btn
          class="no-background-hover"
          text
          color="white"
          @click="goToPageAndSetColor('/meineWG')"
        >
          <span></span>
          <v-icon :color="getColor('/meineWG')">mdi-account-switch</v-icon>
        </v-btn>
        <v-btn
          class="no-background-hover"
          text
          color="white"
          @click="goToPageAndSetColor('/einkaufen')"
        >
          <span></span>
          <v-icon :color="getColor('/einkaufen')">mdi-shopping</v-icon>
        </v-btn>
        <v-btn class="no-background-hover" text @click="goToPageAndSetColor('/putzen')">
          <span></span>
          <v-icon :color="getColor('/putzen')">mdi-broom</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!--                Buttons Profile-->
        <SettingsMenu></SettingsMenu>
        <!-- <v-btn text>-->
        <!--   <span></span>-->
        <!--   <v-icon>mdi-exit-to-app</v-icon>-->
        <!-- </v-btn>-->
      </v-toolbar>
    </v-card>

    <v-content class="content">
      <!--            Hier werden einzelne Seiten reingeladen-->
      <router-view></router-view>
    </v-content>

    <v-footer dark dense color="#211E21">
      <v-spacer></v-spacer>
      <div>RoomMe | &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import SettingsMenu from "./components/SettingsMenu";

export default {
  name: "App",

  components: {
    SettingsMenu
  },
  data: () => ({
    currentPage: "/home"
  }),
  computed: {
    currentRouteName() {
      return this.$router.history.current.path;
    }
  },
  methods: {
    goToPageAndSetColor(page) {
      this.currentPage = page;
      this.$router.push(page);
    },
    getColor(page) {
      if (this.currentPage === page) {
        return "pink";
      } else {
        return "white";
      }
    },

    setupForDebugging() {
      // creating roomies
      if (this.$store.state.debug) console.log("Creating roomies");
      this.$store.state.roomies.push(
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
          isLoggedIn: true
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
          isLoggedIn: false
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
          isLoggedIn: false
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
          isLoggedIn: false
        }
      );

      // create Standard Order
      this.$store.commit("createOrder");

      // create rooms
      if (this.$store.state.debug) console.log("Creating rooms");
      for (let i = 0; i < this.$store.state.roomies.length; i++) {
        this.$store.state.rooms.push({
          id: i,
          name: "room " + (i + 1),
          currentRoomie: this.$store.state.roomies[i],
          pastRoomies: [
            /*
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
            
          }*/
          ]
        });
        this.$store.commit("incrementNumberOfRooms");
      }

      if (this.$store.state.debug) console.log("Creating comments");
      this.$store.state.comments.push(
        {
          id: 1,
          roomie: this.$store.state.roomies[0],
          text: "Der Chat funktioniert, juhu. Was geht!"
        },
        {
          id: 3,
          roomie: this.$store.state.roomies[3],
          text: "Steilo!"
        },
        {
          id: 2,
          roomie: this.$store.state.roomies[2],
          text: "Who let the dogs out, wuf - wuf - wuf..."
        }
      );

      if (this.$store.state.debug) console.log("Creating tasks");
      this.$store.state.taskList.push(
        {
          id: 0,
          name: "Cleaning the kitchen",
          description: "",
          comment: "",
          status: 0,
          createdBy: this.$store.state.roomies[0],
          assignedTo: this.$store.state.roomies[0],
          currentEndDate: new Date().toISOString().substr(0, 10),
          completedOn: "",
          numberOfDaysInBetween: "7",
          order: [{roomie: this.$store.state.roomies[0], isAssignedToTask: true}, {roomie: this.$store.state.roomies[1], isAssignedToTask: true}, {roomie: this.$store.state.roomies[2], isAssignedToTask: true} ]
        }
      );
    }
  },

  created() {
    this.setupForDebugging();
  }
};

// Colors: EEF5F0 - weiß
// 9FB18F, helles grün, F6C01D gelb, rot B1493D, tannengrün 315458
</script>

<style>
.removeScrollbar {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.titleStyling {
  text-transform: capitalize;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.no-background-hover::before {
  background-color: transparent !important;
}

.active-class-color {
  background-color: red;
}

.header {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}

.header a {
  color: #fff;
  padding-right: 5px;
}

.content {
  color: #f6f0f1;
  background-color: #315458;
}

.content h1 {
  color: #ce9242;
}
</style>