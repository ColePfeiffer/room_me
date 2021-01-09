<template>
  <!-- STANDARD ORDER -->
  <v-chip-group column multiple active-class="primary--text">
    <div class="mx-2" v-for="(orderElement, index) in newOrder" :key="orderElement.roomie.id">
      <v-chip
        :color="orderElement.roomie.color"
        :outlined="!orderElement.roomie.selected"
        @click="selectRoomie(orderElement.roomie, index)"
      >
        <v-avatar left>
          <v-img v-bind:src="orderElement.roomie.profilePicture"></v-img>
        </v-avatar>
        <strong>{{ orderElement.roomie.username }}</strong>&nbsp;
      </v-chip>
    </div>
  </v-chip-group>
</template>

<script>
export default {
  emits: ["orderChanged"],
  data() {
    return {
      basicCounterForNewOrder: -1,
      newOrder: this.$store.state.taskorder // { roomie: ... , isAssignedToTasK: true/false }
    };
  },
  created() {
    this.initiate();
  },
  methods: {
    initiate() {
      console.log("All set to true");
      this.$store.state.roomies.forEach(roomie => {
        roomie.selected = true;
      });
    },
    updateCustomOrder() {
      this.newOrder.forEach(element => {
        if (element.roomie.selected) {
          element.isAssignedToTask = true;
        } else {
          element.isAssignedToTask = false;
        }
      });
      this.$emit("orderChanged", this.newOrder);
    },
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
      if (roomie.selected) {
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
        if (this.basicCounterForNewOrder < this.newOrder.length) {
          this.basicCounterForNewOrder++;
          if (this.$store.state.debug) {
            console.log(
              roomie.username +
                " was selected. Counter: " +
                this.basicCounterForNewOrder
            );
          }
        }
        this.move(this.newOrder, index, this.basicCounterForNewOrder);
      }
      roomie.selected = !roomie.selected;
      this.updateCustomOrder();
      console.log(
        this.newOrder[0].roomie.username +
          " " +
          this.newOrder[0].isAssignedToTask +
          " " +
          this.newOrder[1].roomie.username +
          " " +
          this.newOrder[1].isAssignedToTask +
          " " +
          this.newOrder[2].roomie.username +
          " " +
          this.newOrder[2].isAssignedToTask +
          " " +
          this.newOrder[3].roomie.username +
          " " +
          this.newOrder[3].isAssignedToTask
      );
    }
  }
};
</script>
