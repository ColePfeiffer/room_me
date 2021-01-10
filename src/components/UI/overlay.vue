<template>
  <v-row justify="center">
    <slot name="content"></slot>
    <v-overlay :z-index="zIndex" :value="showOverlay">
      <v-card class="rounded-card">
        <v-container>
          <slot name="overlayText"></slot>
          <v-card-actions> </v-card-actions>
        </v-container>
      </v-card>
      <v-row class="justify-center mt-5">
        <v-col cols="6">
          <v-btn color="orange" @click="$emit('toggle-overlay')"
            >Okay, dude.</v-btn
          >
        </v-col>
      </v-row>
    </v-overlay>
  </v-row>
</template>

<script>
export default {
  name: "overlay",
  emits: ["toggle-overlay"],
  props: {
    showOverlay: Boolean,
  },
  data() {
    return {
      zIndex: 0,
    };
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 50px;
}
</style>