<template>
  <v-container justify-center>
    <v-tabs class="cleaningTabs" background-color="dark" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Task
        <v-icon>mdi-broom</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Log
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab-item
        class="someStyling"
        v-for="i in 2"
        :key="i"
        :value="'tab-' + i"
      >
        <div v-if="i == 1">
          <div v-if="openTasks.length === 0 && pendingTasks.length === 0">
            <v-card>No open or pending tasks yet.</v-card>
          </div>
          <div v-else>
            <div v-for="item in openTasks" :key="item.id">
              <CleaningTask
                :item="item"
                :currentUser="currentUser"
                :taskList="taskList"
              ></CleaningTask>
            </div>
          </div>
        </div>
        <div v-if="i == 2">
          <div v-if="doneTasks.length === 0">
            <v-card-text>No items pending yet.</v-card-text>
          </div>
          <div v-for="item in doneTasks" :key="item.id">
            <CleaningTask
              :item="item"
              :currentUser="currentUser"
                  :taskList="taskList"
  
            ></CleaningTask>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import CleaningTask from "./CleaningTask";

export default {
  name: "CleaningTabs",
  emits: [],
  props: {
    ["taskList"]: Array,
    ["currentUser"]: Object,
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    CleaningTask,
  },
  computed: {
    openTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.taskList.filter(function (value) {
        return value.status === 0 || value.status === 1;
      });
    },
    pendingTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.taskList.filter(function (value) {
        return value.status === 1;
      });
    },

    doneTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.taskList.filter(function (value) {
        return value.status === 3;
      });
    },
  },
};
</script>

<style>
.cleaningTabs {
  width: 400px;
}

.someStyling {
  padding: 10px;
  background-color: rgba(25, 25, 25, 0.1);
}
</style>

