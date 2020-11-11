<template>
  <!--Card on the right!, background: orange -->

  <v-row dense class="paddingCards">
    <CleaningDialogFinishUp
      :item="item"
      :showDialogFinishUp="showDialogFinishUp"
      @toggle-showDialogFinishUp="toggleShowDialogFinishUp"
    >
    </CleaningDialogFinishUp>

    <v-col cols="12">
      <v-card class="cleaningCards">
        <v-row>
          <v-img
            class="profile-picture"
            max-width="60"
            max-height="60"
            v-bind:src="currentUser.profilePicture"
          ></v-img>

          <v-card-title class="headline">{{ item.title }}</v-card-title>
        </v-row>

        <v-card-subtitle>
          <h3>End date: {{ item.endDate }}</h3>
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            {{ item.description }}
          </v-row>
        </v-card-text>
        <v-card-subtitle>{{ item.comment }} </v-card-subtitle>
        <v-card-actions>
          <v-col class="text-right">
            <v-btn text>
              <!--@click="acceptTask(item)"-->
              <v-icon @click="toggleShowDialogFinishUp(true)">mdi-check</v-icon>
            </v-btn>
            <v-btn text>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CleaningDialogFinishUp from "./CleaningDialogFinishUp";

export default {
  name: "CleaningTask",
  emits: [],
  props: {
    ["item"]: Object,
    ["currentUser"]: Object,
  },
  components: {
    CleaningDialogFinishUp,
  },
  data() {
    return {
      showDialogFinishUp: false,
      debug: true,
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    };
  },
  methods: {
    toggleShowDialogFinishUp(newState) {
      if (this.debug) console.log("old state: " + this.showDialogFinishUp);
      this.showDialogFinishUp = newState;
      if (this.debug) console.log("new state: " + this.showDialogFinishUp);
    },
    // Color generator:
    generator: function () {
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
    /* acceptTask(item){
      this.completedTask = false;
        this.$emit("toggle-dialogTaskManager", true);
        this.currentItemTaskManager = item;
    },*/

    /* acceptTask(item) {
      item.status = 1;
      item.acceptedBy = this.currentUser.username;
      console.log(item.status);

    },*/
  },
};
</script>

<style>
.cleaningCards {
  width: 100%;
}
</style>