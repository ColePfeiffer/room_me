<template>
  <v-container justify-center>


    <v-btn @click="debuggingIsMobile = !debuggingIsMobile"
      >debug: toggle view mode</v-btn
    >
    <div v-if="!debuggingIsMobile">
      <!-- <div v-if="!isMobile()"> -->

      <!-- FOR DESKTOP VIEW -->
      <v-row justify="space-around">
        <v-col>
          <div class="overline">Room Overview</div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <div v-for="room in rooms" :key="room.id">
          <v-col xs="6" sm="6" md="3">
            <FamilyTreeRoom :room="room" :showRoomName="true"></FamilyTreeRoom>
          </v-col>
        </div>
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
          style="background-color: #a83250"
        >
          <div>
            <div>
              <v-icon @click="model--">mdi-minus</v-icon>
              room {{ model + 1 }}
              <v-icon @click="model++">mdi-plus</v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col xs="12" sm="6" md="3">
          <v-carousel
            hide-delimiter-background
            :show-arrows="false"
            height="auto"
            v-model="model"
          >
            <v-carousel-item v-for="room in rooms" :key="room.id">
              <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="posts">
                    <v-card elevation="10" max-width="100%">
                      <FamilyTreeRoom
                        :room="room"
                        :showRoomName="false"
                      ></FamilyTreeRoom>
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
import FamilyTreeRoom from "./FamilyTreeRoom";

export default {
  name: "TheFamilyTree",
  emits: ["create-new-room", "create-dummy"],
  components: {
    FamilyTreeRoom,
  },
  props: {
    rooms: Array,
    roomName: String,
    showDialogForNewRoomie: Boolean,
    showDialogForRoomManager: Boolean,
  },
  data() {
    return {
      fab: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      debuggingIsMobile: false,
      model: 0,
    };
  },
  methods: {
    createNewRoom(roomName) {
      this.$emit("create-new-room", roomName);
    },

    createDummy(array) {
      this.$emit("create-dummy", array);
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
    },
  },
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