<template>
  <v-container justify-center>
    <WGFamilyTreeDialogNewRoomie :showDialog="showDialogNewRoomie"></WGFamilyTreeDialogNewRoomie>

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
      <v-btn fab dark small color="black" @click="showDialogNewRoomie = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom black">Add roomie</div>
      </v-btn>
      <v-btn fab dark small color="pink" @click="showDialogNewRoomie = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom pink">Add room</div>
      </v-btn>
    </v-speed-dial>

    <v-row>
      <v-col>
        <div class="overline">Room Overview</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="i in rooms" :key="i.name" xs="6" sm="6" md="3">
        <WGFamilyTreeRoom :room="i"></WGFamilyTreeRoom>
      </v-col>
    </v-row>
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
      showDialogNewRoomie: false,
      fab: false
    };
  },
  methods: {
    editFamilyTree() {
      // opens dialog
    },
    addNewRoom() {
      // opens dialog
    },
    addNewRoomie() {
      this.showDialogNewRoomie = true;
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