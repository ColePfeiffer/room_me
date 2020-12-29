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
            <TaskOrder v-show="showTaskOrder"></TaskOrder>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskOrder from "./TaskOrder";
export default {
  components: {
    TaskOrder
  },
  data: () => ({
    show: false,
    showKitchen: false,
    showTaskOrder: false
  })
};
</script>