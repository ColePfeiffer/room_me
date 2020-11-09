<template>
  <div class="cleaning">
    <v-row xs="12" sm="12" md="6">
      <!--The event container with padding of 15-->
      <v-row class="fill-height pa-15">
        <CleaningCalendar></CleaningCalendar>
        <CleaningTabs
          :currentUser="currentUser"
          :taskList="taskList"
        ></CleaningTabs>
        <CleaningDialog
          :showDialogTaskManager="showDialogTaskManager"
          @toggle-dialogTaskManager="toggleShowDialogTaskManager"
        >
        </CleaningDialog
        >
      </v-row>
    </v-row>
  </div>
</template>

<script>
import CleaningCalendar from "../CleaningCalendar";
import CleaningTabs from "../CleaningTabs";

//Dialogs
import CleaningDialog from "../CleaningDialog";

export default {
  components: {
    CleaningCalendar,
    CleaningTabs,
    CleaningDialog,
  },
  methods: {
    toggleShowDialogTaskManager(newState) {
      if (this.debug) console.log("old state: " + this.showDialogTaskManager);
      this.showDialogTaskManager = newState;
      if (this.debug) console.log("new state: " + this.showDialogTaskManager);
    },
  },
  data() {
    return {
      showDialogTaskManager: false,
      currentUser: {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        balance: +3,
        balancePlus: true,
        selected: true,
        color: "#1F85DE",
      },
      taskList: [
        {
          id: 1,
          title: "Küche putzen",
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          acceptedBy: "",
          declinedBy: [{ roomie: "", comment: "" }],
          color: "#315458",
          description: "Küche muss geschrubbat werdn.",
          /*artist:
            "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",*/
        },
        {
          id: 5,
          title: "Küche putzen",
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 1,
          acceptedBy: "",
          declinedBy: [{ roomie: "", comment: "" }],
          color: "#315458",
          description: this.acceptedBy + "wurde accepted",
          /*artist:
            "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",*/
        },
        {
          id: 6,
          title: "Küche putzen",
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 3,
          acceptedBy: "",
          declinedBy: [{ roomie: "", comment: "" }],
          color: "#315458",
          description: this.acceptedBy + "wurde accepted",
          /*artist:
            "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",*/
        },
        {
          id: 2,
          title: "Bad putzen",
          // Status: 0 - offen, declined: 1, done: 2
          status: 0,
          acceptedBy: "",
          declinedBy: [{ roomie: "", comment: "" }],
          color: "#315458",
          description: "Bad muss geschrubbat werdn.",
          /*artist:
            "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",*/
        },
        {
          id: 3,
          title: "Nix da",
          // Status: 0 - offen, declined: 1, done: 2
          status: 2,
          acceptedBy: "",
          declinedBy: [{ roomie: "", comment: "" }],
          color: "#315458",
          description: "Bad muss geschrubbat werdn.",
          /*artist:
            "Die Küche möchte geputzt werden. Kassiere drei Erfahrungspunkte.",*/
        },
      ],
    };
  },
};
</script>