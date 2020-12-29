<template>
  <div>
    <v-divider></v-divider>
    <v-card-text>
      <v-chip-group column multiple active-class="primary--text">
        <div class="mx-2" v-for="(roomie, index) in $store.state.standardOrder" :key="roomie.id">
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
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => ({
    basicCounterForNewOrder: -1
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
        if (
          this.basicCounterForNewOrder < this.$store.state.standardOrder.length
        ) {
          this.basicCounterForNewOrder++;
          if (this.$store.state.debug) {
            console.log(
              roomie.username +
                " was selected. Counter: " +
                this.basicCounterForNewOrder
            );
          }
        }
        this.move(
          this.$store.state.standardOrder,
          index,
          this.basicCounterForNewOrder
        );
      }

      roomie.selected = !roomie.selected;
      console.log(this.$store.state.standardOrder);
    }
  }
};
</script>
