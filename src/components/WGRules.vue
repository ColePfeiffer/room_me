<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="overline">WG Rules</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" dark max-width="600">
          <v-img
            src="https://i.pinimg.com/originals/dd/61/bf/dd61bf68e572ccc5bb7b6f91d7c66706.jpg"
            height="270px"
          ></v-img>

          <v-card-title>WG Rules</v-card-title>

          <v-card-subtitle>Hello everyone.</v-card-subtitle>

          <v-card-actions>
            <v-btn color="pink" text>Rules for the kitchen</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="showKitchen = !showKitchen">
              <v-icon>{{ showKitchen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showKitchen">
              <v-divider></v-divider>
              <v-card-text>ddd</v-card-text>
            </div>
          </v-expand-transition>

          <!-- Other -->
          <v-card-actions>
            <v-btn color="pink" text>Other</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>Yo, guys. I love you all.</v-card-text>
            </div>
          </v-expand-transition>

          <!-- Standard Order -->
          <v-card-actions>
            <v-btn color="pink" text>Task Order</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="showTaskOrder = !showTaskOrder">
              <v-icon>{{ showTaskOrder ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showTaskOrder">
              <v-divider></v-divider>
              <v-card-text>
                <v-chip-group column multiple active-class="primary--text">
                  <div class="mx-2" v-for="(roomie, index) in roomies" :key="roomie.id">
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
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    showKitchen: false,
    showTaskOrder: false,
    basicCounterForNewOrder: 0,
    standardOrder: ""
  }),
  props: ["roomies"],

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
      if (!roomie.selected) {
        console.log("roomie deselected");
        // wird abgewählt
        if (this.basicCounterForNewOrder >= 0) {
          console.log("counter--");
          this.basicCounterForNewOrder--;
        }
      } else {
        console.log("roomie selected");
        if (this.basicCounterForNewOrder <= this.roomies.length) {
          console.log("counter++");
          this.move(this.roomies, index, this.basicCounterForNewOrder);
          this.basicCounterForNewOrder++;
        }
      }

      roomie.selected = !roomie.selected;
    },

    createNewOrder() {
      for (let i = 0; i < this.roomies.length; i++) {
        if (!this.roomies[i].selected) {
          this.standardOrder.push(this.roomies[i]);
        }
      }
      if (this.debug) console.log("New order created:", this.standardOrder);
    }
  }
};
</script>