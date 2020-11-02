<template>
  <div id="wrapper">
    Family Tree Room
    <WGFamilyTreeRoomie :roomie="roomies[0]"></WGFamilyTreeRoomie>
    <WGFamilyTreeRoomie :roomie="roomies[1]"></WGFamilyTreeRoomie>
    <WGFamilyTreeRoomie :roomie="roomies[2]"></WGFamilyTreeRoomie>
  </div>
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