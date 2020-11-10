<template>
  <v-container justify-center>
    <div class="overline">Room History</div>

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
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="editFamilyTree">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="black" @click="addNewRoom">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="pink" @click="addNewRoomie">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-row>
      <v-col v-for="i in rooms" :key="i.name" xs="6" sm="6" md="3">
        <WGFamilyTreeRoom :room="i"></WGFamilyTreeRoom>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WGFamilyTreeRoom from "./WGFamilyTreeRoom";

export default {
  name: "WGFamilyTree",
  emits: [],
  components: {
    WGFamilyTreeRoom
  },
  props: { rooms: Array },
  data() {
    return {};
  },
  methods: {
    editFamilyTree() {
      // opens dialog
    },
    addNewRoom() {
      // opens dialog
    },
    addNewRoomie() {
      // opens dialog
    }
  }
};
</script>

<style>
</style>