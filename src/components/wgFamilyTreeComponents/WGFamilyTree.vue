<template>
  <v-container justify-center>
    <WGFamilyTreeDialogNewRoomie
      :showDialog="showDialogForNewRoomie"
      :rooms="rooms"
      @set-showDialog="showDialogForNewRoomie = false"
    ></WGFamilyTreeDialogNewRoomie>

    <v-speed-dial
      color="pink"
      v-model="fab"
      dark
      small
      absolute
      fixed
      bottom
      right
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-btn fab dark small color="orange" class="ma-2 white--text" @click="editFamilyTree">
        <v-icon>mdi-help</v-icon>
        <div class="fab-text-custom orange">Help</div>
      </v-btn>
      <v-btn fab dark small color="green" class="ma-2 white--text" @click="editFamilyTree">
        <v-icon>mdi-pencil</v-icon>
        <div class="fab-text-custom green">Edit</div>
      </v-btn>
      <v-btn fab dark small color="black" @click="showDialogForNewRoomie = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom black">Add roomie</div>
      </v-btn>
      <v-btn fab dark small color="pink" @click="showDialogForNewRoom = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom pink">Add room</div>
      </v-btn>
    </v-speed-dial>

    <v-btn @click="debuggingIsMobile = !debuggingIsMobile">debug: toggle view mode</v-btn>
    <div v-if="!debuggingIsMobile">
      <!-- <div v-if="!isMobile()"> -->
      <!-- FOR DESKTOP VIEW -->
      <v-row justify="space-around">
        <v-col>
          <div class="overline">Room Overview</div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col v-for="i in rooms" :key="i.id" xs="6" sm="6" md="3">
          <WGFamilyTreeRoom :room="i" :showRoomName="true"></WGFamilyTreeRoom>
        </v-col>
      </v-row>
    </div>
    <!-- FOR MOBILE VIEW -->
    <div v-else>
      <v-row>
        <v-col>
          <div class="overline">Room Overview</div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col
          xs="12"
          sm="6"
          md="3"
          class="d-flex justify-center align-center"
          style="background-color: #a83250;"
        >
          <div>
            <div>
              <v-icon @click="model--">mdi-minus</v-icon>
              room {{model+1}}
              <v-icon @click="model++">mdi-plus</v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col xs="12" sm="6" md="3">
          <v-carousel hide-delimiter-background :show-arrows="false" height="auto" v-model="model">
            <v-carousel-item v-for="(room) in rooms" :key="room.id">
              <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="posts">
                    <v-card elevation="10" max-width="100%">
                      <WGFamilyTreeRoom :room="room" :showRoomName="false"></WGFamilyTreeRoom>
                    </v-card>
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import WGFamilyTreeRoom from "./WGFamilyTreeRoom";
import WGFamilyTreeDialogNewRoomie from "./WGFamilyTreeDialogNewRoomie";

export default {
  name: "WGFamilyTree",
  emits: [],
  components: {
    WGFamilyTreeRoom,
    WGFamilyTreeDialogNewRoomie
  },
  props: { rooms: Array },
  data() {
    return {
      showDialogForNewRoomie: false,
      showDialogForNewRoom: false,
      fab: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      debuggingIsMobile: false,
      model: 0
    };
  },
  methods: {
    editFamilyTree() {
      // opens dialog
    },
    addNewRoom() {
      // opens dialog
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
        //return true;
      }
    }
  }
};
</script>

 <style scoped>
/* Labels for fab buttons
https://github.com/vuetifyjs/vuetify/issues/3399 */
.fab-text-custom {
  position: absolute;
  right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
</style>