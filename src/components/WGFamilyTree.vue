<template>
  <div>
    <div class="overline">Room History</div>
    <WGFamilyTreeRoom :roomies="roomies"></WGFamilyTreeRoom>
  </div>
</template>

<script>
import WGFamilyTreeRoom from "./WGFamilyTreeRoom";

export default {
  name: "WGFamilyTree",
  emits: [],
  components: {
    WGFamilyTreeRoom
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
</style>