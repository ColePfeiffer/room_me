<template>
  <v-container>
    <overlay :showOverlay="showOverlay" @toggle-overlay="toggleOverlay">
      <template v-slot:content>
        <!-- Fab Button -->
        <v-speed-dial
          class="fab-button"
          color="pink"
          v-model="fab"
          fixed
          right
          bottom
          slide-y-reverse-transition
        >
          <template v-slot:activator>
            <v-btn v-model="fab" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-btn fab dark small color="orange" @click="toggleOverlay">
            <v-icon>mdi-help</v-icon>
            <div class="fab-text-custom orange">Help</div>
          </v-btn>
                    <v-btn v-if="false" fab dark small color="pink" @click="toggleDialogEditTasks(true)">
            <v-icon>mdi-task</v-icon>
            <div class="fab-text-custom pink">Edit a task</div>
          </v-btn>
          <v-btn fab dark small color="pink" @click="toggleDialogTask(true)">
            <v-icon>mdi-broom</v-icon>
            <div class="fab-text-custom pink">Add a task</div>
          </v-btn>
        </v-speed-dial>
        <!-- Dialogs -->
        <TaskOverview :showDialog="showDialogEditTasks" @toggle-visibility="toggleDialogEditTasks(false)"></TaskOverview>
        <DialogTask
          :showDialog="showDialogNewTask"
          :view="taskView"
          :existingTask="existingTask"
          :callTakeOverFunction="callTakeOverFunction"
          @toggle-visibility="toggleDialogTask(false)"
        ></DialogTask>

        <v-row align="center" justify="center" no-gutters>
          <v-col xs="12" sm="9" md="9" m="9">
            <CleaningTabs
              @show-check-off-task="showCheckOffTask"
              @show-cancel-task="showCancelTask"
              @take-task-over="takeTaskOver"
            ></CleaningTabs>
          </v-col>
        </v-row>
      </template>
      <template v-slot:overlayText>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Create and organize Tasks</h3>
          </div>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>Here you can create tasks for your household.</v-col>
          </v-row>
        </v-card-text>
      </template>
    </overlay>
  </v-container>
</template>

<script>
import CleaningTabs from "../components/cleaningComponents/CleaningTabs";
import DialogTask from "../components/cleaningComponents/DialogTask";
import overlay from "../components/UI/overlay";
import TaskOverview from "../components/cleaningComponents/TaskOverview";

export default {
  components: {
    CleaningTabs,
    DialogTask,
    overlay,
    TaskOverview
  },
  data() {
    return {
      fab: false,
      showDialogNewTask: false,
      taskView: "NEW_TASK",
      callTakeOverFunction: false,
      existingTask: {},
      showOverlay: false,
      showDialogEditTasks: false
    };
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
      if (this.$store.state.debug)
        console.log("Showing Overlay: " + this.showOverlay);
    },
    toggleDialogEditTasks(newState){
this.showDialogEditTasks = newState;
    },
    toggleDialogTask(newState) {
      this.showDialogNewTask = newState;
      //
      if (!newState) {
        this.taskView = "NEW_TASK";
      }
    },
    showCheckOffTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = "CHECK_OFF_TASK";
      this.showDialogNewTask = true;
    },
    showCancelTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = "CANCEL_TASK";
      this.showDialogNewTask = true;
    },

    takeTaskOver(existingTask) {
      this.existingTask = existingTask;
      this.callTakeOverFunction = !this.callTakeOverFunction;
    },
  },
};
</script>
<style scoped>
.fab-text-custom {
  position: absolute;
  right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
</style>
