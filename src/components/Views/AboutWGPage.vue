<template>
  <v-col xs="12" sm="6" md="3">
    <div class="WGPage">
      <WGFamilyTree></WGFamilyTree>
    </div>
  </v-col>
</template>

<script>
import WGFamilyTree from "../WGFamilyTree";

export default {
  name: "AboutWGPage",
  emits: [],
  components: {
    WGFamilyTree
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