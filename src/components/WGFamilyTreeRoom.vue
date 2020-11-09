<template>
  <v-container ma-0 pa-0 fluid id="vContainer">
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="background-color: #a83250;"
      >
        <div>
          {{room.name}}
          <v-btn color="pink" dark small absolute bottom right fab>
            <v-icon>add</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters id="wrapperForFTRoom" v-for="n in room.roomies" :key="n.id">
      <v-col cols="12" class="black lighten-5">
        <WGFamilyTreeRoomie :roomie="n" :inversed="inversed"></WGFamilyTreeRoomie>
        <div v-if="n.movedOut" class="verticalLine"></div>
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
      rooms: [],
      inversed: false
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

.verticalLine {
  border-left: 1.5px solid white;
  height: 80px;
  position: relative;
  left: 50%;
  top: 0;
}
</style>