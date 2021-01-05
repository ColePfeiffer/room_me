<template>
  <!-- STANDARD ORDER -->
  <div v-if="showStandardOrder">
    <v-chip-group column multiple active-class="primary--text">
      <div class="mx-2" v-for="(roomie, index) in $store.state.localStandardOrder" :key="roomie.id">
        <v-chip
          :color="roomie.color"
          :outlined="roomie.selected"
          @click="selectRoomie(roomie, index)"
        >
          <v-avatar left>
            <v-img v-bind:src="roomie.profilePicture"></v-img>
          </v-avatar>
          <strong>{{ roomie.username }}</strong>&nbsp;
        </v-chip>
      </div>
    </v-chip-group>
  </div>
  <!-- CREATING A TASK SPECIFIC ORDER -->
  <div v-else>
    <v-chip-group column multiple active-class="primary--text">
      <div class="mx-2" v-for="(roomie, index) in $store.state.roomies" :key="roomie.id">
        <v-chip
          :color="roomie.color"
          :outlined="roomie.selected"
          @click="selectRoomie(roomie, index)"
        >
          <v-avatar left>
            <v-img v-bind:src="roomie.profilePicture"></v-img>
          </v-avatar>
          <strong>{{ roomie.username }}</strong>&nbsp;
        </v-chip>
      </div>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  emits: ["orderChanged"],
  props: {
    showStandardOrder: Boolean,
    order: Array
  },
  data: () => ({
    basicCounterForNewOrder: -1,
    localStandardOrder: this.$store.state.standardOrder
  }),
  methods: {
    move(arr, old_index, new_index) {
      while (old_index < 0) {
        old_index += arr.length;
      }
      while (new_index < 0) {
        new_index += arr.length;
      }
      if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while (k-- + 1) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },

    selectRoomie(roomie, index) {
      // DESELECTING A ROOMIE
      if (!roomie.selected) {
        if (this.basicCounterForNewOrder >= 0) {
          this.basicCounterForNewOrder--;
          if (this.$store.state.debug) {
            console.log(
              roomie.username +
                " was deselected. Counter: " +
                this.basicCounterForNewOrder
            );
          }
        }
        // SELECTING A ROOMIE
      } else {
        if (this.basicCounterForNewOrder < this.localStandardOrder.length) {
          this.basicCounterForNewOrder++;
          if (this.$store.state.debug) {
            console.log(
              roomie.username +
                " was selected. Counter: " +
                this.basicCounterForNewOrder
            );
          }
        }
        this.move(this.localStandardOrder, index, this.basicCounterForNewOrder);
      }

      roomie.selected = !roomie.selected;
      console.log(
        this.localStandardOrder[0].username +
          " " +
          this.localStandardOrder[0].selected +
          " " +
          this.localStandardOrder[1].username +
          " " +
          this.localStandardOrder[1].selected +
          " " +
          this.localStandardOrder[2].username +
          " " +
          this.localStandardOrder[2].selected +
          " " +
          this.localStandardOrder[3].username +
          " " +
          this.localStandardOrder[3].selected
      );
    }
  }
};
</script>
