<template>
  <div>
    Family Tree Room
    <WGFamilyTreeRoomie></WGFamilyTreeRoomie>
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
  props: {},
  data() {
    return {
      rooms: []
    };
  },
  methods: {}
};
</script>

<style>
</style>