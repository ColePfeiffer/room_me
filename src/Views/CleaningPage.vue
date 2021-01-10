<template>
  <v-container>
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

      <v-btn fab dark small color="pink" @click="toggleDialogTask(true)">
        <v-icon>mdi-broom</v-icon>
        <div class="fab-text-custom pink">Add to task list</div>
      </v-btn>
    </v-speed-dial>
    <!-- Dialogs -->
    <DialogTask
      :showDialog="showDialogNewTask"
      :view="taskView"
      :existingTask="existingTask"
      :callTakeOverFunction="callTakeOverFunction"
      @toggle-visibility="toggleDialogTask(false)"
    ></DialogTask>

    <v-row align="center" justify="center" no-gutters>
      <v-col xs="12" sm="9" md="9" m="9">
        <CleaningTabs @show-check-off-task="showCheckOffTask" @show-cancel-task="showCancelTask" @take-task-over="takeTaskOver"></CleaningTabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CleaningTabs from "../components/cleaningComponents/CleaningTabs";
import DialogTask from "../components/cleaningComponents/DialogTask";

export default {
  components: {
    CleaningTabs,
    DialogTask,
  },
  data() {
    return {
      fab: false,
      showDialogNewTask: false,
      taskView: 'NEW_TASK',
      callTakeOverFunction: false,
      existingTask: {},
    };
  },
  methods: {
    toggleDialogTask(newState){
      this.showDialogNewTask = newState;
      //
      if(!newState){
        this.taskView = 'NEW_TASK';
      }
    },
    showCheckOffTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = 'CHECK_OFF_TASK';
      this.showDialogNewTask = true;

    },
    showCancelTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = 'CANCEL_TASK';
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
