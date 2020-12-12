<template>
  <v-container ma-0 pa-0 fluid id="vContainer">
    <!-- Room name -->
    <v-row v-show="showRoomName">
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="background-color: #a83250;"
      >
        <div>
          <quick-edit id="name" v-model="room.name"></quick-edit>
        </div>
      </v-col>
    </v-row>

    <!-- current roomie -->
    <template v-if="room.currentRoomie != 'EMPTY'">
      <v-row no-gutters id="wrapperForFTRoom">
        <v-col cols="12" class="black lighten-5">
          <div>
            <WGFamilyTreeRoomie :roomie="room.currentRoomie"></WGFamilyTreeRoomie>
          </div>
        </v-col>
      </v-row>
      <br />
    </template>
    <template v-else>
      <v-row>
        <v-col>
          <v-card align="center" elevation="10" max-width="100%" width="280px" dark>
            <v-card-text>This room is currently empty.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <!-- past Roomies -->
    <template v-if="room.pastRoomies.length > 0">
      <div v-for="(n, index) in room.pastRoomies" :key="n.id">
        <v-row no-gutters id="wrapperForFTRoom">
          <v-col cols="12" class="black lighten-5">
            <WGFamilyTreeRoomie :roomie="n"></WGFamilyTreeRoomie>
            <div v-if="index != room.pastRoomies.length-1" class="verticalLine"></div>
          </v-col>
        </v-row>
      </div>
    </template>
    <template v-else></template>
  </v-container>
</template>

<script>
import WGFamilyTreeRoomie from "./WGFamilyTreeRoomie";
import QuickEdit from "vue-quick-edit";

export default {
  name: "WGFamilyTreeRoom",
  emits: [],
  components: {
    WGFamilyTreeRoomie,
    QuickEdit
  },
  props: { room: Object, showRoomName: Boolean },
  data() {
    return {
      rooms: [],
      pastRoomiesSize: this.room.pastRoomies.length
    };
  },
  methods: {},
};
</script>

<style>
#vContainer {
  width: 200px;
  max-width: 300px;
}

.verticalLine {
  border-left: 1.5px solid white;
  height: 80px;
  position: relative;
  left: 50%;
  top: 0;
}

.vue-quick-edit__link--is-clickable {
  color: white !important;
  border-style: hidden !important;
}
</style>