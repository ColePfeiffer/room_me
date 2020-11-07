<template>
  <v-container ma-0 pa-0 fluid id="vContainer">
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="background-color: #a83250;"
      >{{room.name}}</v-col>
    </v-row>
    <v-row no-gutters id="wrapperForFTRoom" v-for="n in room.roomies" :key="n.id">
      <v-col cols="12" class="black lighten-5">
        <WGFamilyTreeRoomie :roomie="n"></WGFamilyTreeRoomie>
      </v-col>
    </v-row>
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
  props: { room: Object },
  data() {
    return {
      rooms: []
    };
  },
  methods: {}
};
</script>

<style>
#vContainer {
  width: 200px;
  max-width: 300px;
}
</style>