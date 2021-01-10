<template>
  <v-col xs="12" sm="12" md="9">
    <v-tabs fixed-tabs color="white" dark icons-and-text>
      <v-tabs-slider color="pink"></v-tabs-slider>
      <v-tab href="#tab-1">
        Task
        <v-icon color="pink">mdi-broom</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Done
        <v-icon color="green">mdi-checkbox-multiple-marked-circle</v-icon>
      </v-tab>

      <v-tab-item
        class="someStyling"
        v-for="i in 2"
        :key="i"
        :value="'tab-' + i"
      >
        <div v-if="i == 1" :class="wrapper_scrollbar_classes">
          <div v-if="openTasks.length === 0 && pendingTasks.length === 0">
            <v-card class="purchasingCards">
              <v-col>
                <v-card-text class="stylingTextHeadline"
                  >No open or pending items added yet.</v-card-text
                >

                <div class="padding15">
                  <label class="stylingTextSubtitle"
                    >Click on button in the right corner to add a new
                    item.</label
                  >
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-else>
            <div v-for="task in openTasks.reverse()" :key="task.id">
              <CleaningTask
                :task="task"
                @show-check-off-task="showCheckOffTask"
                @show-cancel-task="showCancelTask"
                  @take-task-over="takeTaskOver"
              ></CleaningTask>
            </div>
          </div>
        </div>
        <div v-if="i == 2" :class="wrapper_scrollbar_classes">
          <div v-if="doneTasks.length === 0">
            <v-card class="purchasingCards">
              <v-col>
                <v-card-text class="stylingTextHeadline"
                  >No tasks done so far.</v-card-text
                >

                <div class="padding15">
                  <label class="stylingTextSubtitle"
                    >Check a task as finished to see it in this overview.</label
                  >
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-for="task in doneTasks.reverse()" :key="task.id">
            <CleaningTask
              :task="task"
              @show-check-off-task="showCheckOffTask"
              @show-cancel-task="showCancelTask"
              @take-task-over="takeTaskOver"
            ></CleaningTask>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>

<script>
import CleaningTask from "./CleaningTask";

export default {
  name: "CleaningTabs",
  emits: ["show-check-off-task", "show-cancel-tasks", "take-task-over"],
  props: {},
  data() {
    return {
      wrapper_scrollbar_classes : ['custom-scrollbar', 'scrollbar-wrapper'],
    };
    
  },
  methods: {
    showCheckOffTask(existingTask) {
      this.$emit("show-check-off-task", existingTask);
    },
    showCancelTask(existingTask) {
      this.$emit("show-cancel-task", existingTask);
    },
    takeTaskOver(existingTask) {
      this.$emit("take-task-over", existingTask);
    },
  },
  components: {
    CleaningTask,
  },
  computed: {
    openTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.taskList.filter(function (value) {
        return value.status === 0 || value.status === 1;
      });
    },
    pendingTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.taskList.filter(function (value) {
        return value.status === 1;
      });
    },

    doneTasks() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.taskList.filter(function (value) {
        return value.status === 3;
      });
    },
  },
};
</script>

<style scoped>
.scrollbar-wrapper {
    max-height: 700px;
    overflow-y: auto;
    padding-right: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -moz-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 8px;
    background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar
{
    width: 8px;
    background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    -moz-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #fff;
}

.someStyling {
  padding: 10px;
}
.purchasingCards {
  width: 100%;
}
.padding15 {
  padding-left: 15px;
  padding-right: 15px;
}
.stylingTextHeadline {
  font-size: 1.2rem;
}
.stylingTextSubtitle {
  font-size: 1rem;
}
</style>

