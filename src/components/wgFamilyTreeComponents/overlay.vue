<template>
  <v-overlay :opacity="opacity" :value="overlay">
    <v-btn color="success" @click="overlay = false">Hide Overlay</v-btn>
  </v-overlay>
</template>

<script>
export default {
  name: "overlay",

  data() {
    return {
      overlay: true,
      opacity: 0.5
    };
  }
};
</script>