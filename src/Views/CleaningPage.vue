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
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-btn fab dark small color="pink" @click="showDialogNewTask = true">
        <v-icon>mdi-broom</v-icon>
        <div class="fab-text-custom pink">Add to task list</div>
      </v-btn>
    </v-speed-dial>
    <!-- Dialogs -->
    <DialogNewTask :showDialog="showDialogNewTask" @toggle-visibility="showDialogNewTask = false"></DialogNewTask>

    <v-row align="center" justify="center" no-gutters>
      <v-col xs="12" sm="9" md="9" m="9">
        <CleaningTabs></CleaningTabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CleaningTabs from "../components/cleaningComponents/CleaningTabs";
import DialogNewTask from "../components/cleaningComponents/DialogNewTask";

export default {
  components: {
    CleaningTabs,
    DialogNewTask
  },
  data() {
    return {
      fab: false,
      showDialogNewTask: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      taskList: [
        {
          id: 1,
          title: "Küche putzen",
          description: "Küche muss geschrubbat werdn.",
          endDate: "22.10.20",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],

          taskCreator: "",
        },
        {
          id: 2,
          title: "Küche putzen",
          description: "KHallo... ksksk dkdkd",
          endDate: "22.10.20",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],
        },
        {
          id: 5,
          title: "Müll rausbringen",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
          endDate: "",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],

          taskCreator: "",
        },
      ],
    };
  },
  methods: {}
};
</script>
<style scoped>
.fab-button {
  padding: 10 px;
  position: fixed;
}

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
