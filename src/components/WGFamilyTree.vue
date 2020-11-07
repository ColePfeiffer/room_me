<template>
  <v-container>
    <div class="overline">Room History</div>
    <v-row dense>
      <v-col v-for="i in rooms" :key="i.name" xs="6" sm="6" md="4">
        <WGFamilyTreeRoom :room="i"></WGFamilyTreeRoom>
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
  methods: {}
};
</script>

<style>
</style>