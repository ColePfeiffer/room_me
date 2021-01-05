<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Check your task</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-0">
                <!-- Task -->
                <v-text-field
                  :value="task.name"
                  label="Task"
                  readonly
                  sm="6"
                  m="6"
                  prepend-icon="mdi-broom"
                  color="#FF6F00"
                ></v-text-field>
                <!-- End Date -->
                <v-text-field
                  :value="task.endDate"
                  label="End date"
                  readonly
                  sm="6"
                  m="6"
                  prepend-icon="mdi-calendar"
                  color="#FF6F00"
                ></v-text-field>
              </v-row>
              <!-- Completed On -->
              <v-text-field
                :value="timestamp"
                label="Completed on"
                readonly
                sm="6"
                m="6"
                prepend-icon="mdi-calendar"
                @click="toggleCalendarCompletedOn(true)"
              ></v-text-field>

              <v-text-field
                v-model="comment"
                label="Comment"
                placeholder="Write a note or just a comment."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>

              <v-dialog v-model="showDialogCalendarCompletedOn" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline lighten-2">Choose finishing date</v-card-title>

                  <v-date-picker v-model="timestamp" color="red lighten-1"></v-date-picker>
                  <v-card-text>
                    When did you finish your task? Select the date and safe
                    it.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="pink" text @click="toggleCalendarCompletedOn(false)">Close</v-btn>
                    <v-btn color="pink" text @click="saveCalendarCompletedOn()">Safe</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
            <v-btn color="pink" @click="checkOffTask" justify-center>Task checkkk!</v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CleaningDialog",
  //name: "PurchasingDialogCashUp",
  emits: ["toggle-visibility", "save-calendarCompletedOn"],

  props: {
    showDialog: Boolean,
    ["roomies"]: Array,
    task: Object
    //newPurchase: Object
  },
  created() {
    setInterval(this.getNow, 1000);
  },

  data() {
    return {
      // Show Dialog:
      showDialogCalendarCompletedOn: false,
      intervall: 7,
      // Shows todays date:
      timestamp: new Date().toISOString().substr(0, 10),
      //completedOnDate: new Date().toISOString().substr(0, 10),
      comment: ""
    };
  },
  methods: {
    saveCalendarCompletedOn() {
      this.toggleCalendarCompletedOn(false);
    },
    toggleCalendarCompletedOn(newState) {
      this.showDialogCalendarCompletedOn = newState;
    },
    checkOffTask() {
      // Status: 0 - offen, accepted: 1, declined: 2, done: 3
      this.task.status = 3;
      this.task.comment = this.comment;
      this.task.completedOnDate = this.timestamp;

      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-visibility", false);
      this.comment = "";
      this.completed = this.timestamp;
      this.currentUser = "";
    }
  }
};
</script>