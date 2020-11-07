<template>
  <v-container>
    <v-row no-gutters v-for="n in roomies" :key="n">
      <v-col cols="12" sm="4">
        <WGFamilyTreeRoomie :roomie="n"></WGFamilyTreeRoomie>
      </v-col>
    </v-row>Family Tree Room
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
  props: { roomies: Array },
  data() {
    return {
      rooms: []
    };
  },
  methods: {}
};
</script>

<style>
#wrapper {
  display: flex;
  flex-direction: column;
}
</style>