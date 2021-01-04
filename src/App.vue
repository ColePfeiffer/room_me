<template>
  <v-app class>
    <v-navigation-drawer v-model="drawer" app clipped color="#241c24" expand-on-hover dark>
      <v-list dense>
        <v-list-item to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/meineWG">
          <v-list-item-action>
            <v-icon>mdi-account-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Meine WG</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/einkaufen">
          <v-list-item-action>
            <v-icon>mdi-shopping</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Einkaufen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/putzen">
          <v-list-item-action>
            <v-icon>mdi-broom</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Putzen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dark dense color="#211E21">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!--                 Title for Toolbar-->
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <!--                Buttons Profile-->
        <SettingsMenu></SettingsMenu>
        <v-btn text color="grey">
          <span>Ausloggen</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
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
    drawer: false
  }),
  // create standardOrder
  created() {
    // create Standard Order
    this.$store.commit("createOrder");

    // create rooms
    for (let i = 0; i < this.$store.state.roomies.length; i++) {
      console.log("reeee");
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
        ],
        
      });
    }
    this.$store.state.comments.push(
      {
        id: 1,
        roomie: this.$store.state.roomies[0],
        text: 'Der Chat funktioniert, juhu. Was geht!',
      },
      {
        id: 3,                            
        roomie: this.$store.state.roomies[2],
        text: 'Steilo!',
      },
      {
        id: 2,                            
        roomie: this.$store.state.roomies[1],
        text: 'Who let the dogs out, wuf - wuf - wuf...',
      },
      );
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