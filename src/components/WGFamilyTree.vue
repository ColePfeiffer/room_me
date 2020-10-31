<template>
  <div>
    <div class="overline">Room History</div>
    <WGFamilyTreeRoom></WGFamilyTreeRoom>
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