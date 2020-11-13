<template>
  <v-container ma-0 pa-0 fluid id="vContainer">
    <!-- Room name -->
    <v-row v-show="showRoomName">
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="background-color: #a83250;"
      >
        <div>{{room.name}}</div>
      </v-col>
    </v-row>

    <!-- current roomie -->
    <v-row no-gutters id="wrapperForFTRoom">
      <v-col cols="12" class="black lighten-5">
        <div>
          <WGFamilyTreeRoomie :roomie="room.currentRoomie"></WGFamilyTreeRoomie>
        </div>
      </v-col>
    </v-row>
    <br />
    <!-- past Roomies -->
    <div v-for="(n, index) in room.pastRoomies" :key="n.id">
      <v-row no-gutters id="wrapperForFTRoom">
        <v-col cols="12" class="black lighten-5">
          <WGFamilyTreeRoomie :roomie="n"></WGFamilyTreeRoomie>
          <div v-if="index != room.pastRoomies.length-1" class="verticalLine"></div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import WGFamilyTreeRoomie from "./WGFamilyTreeRoomie";

export default {
  name: "WGFamilyTreeRoom",
  emits: [],
  components: {
    WGFamilyTreeRoomie
  },
  props: { room: Object, showRoomName: Boolean },
  data() {
    return {
      rooms: [],
      pastRoomiesSize: this.room.pastRoomies.length
    };
  },
  methods: {},
  mounted() {
    console.log(this.room.id, this.pastRoomiesSize);
  }
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
</style>