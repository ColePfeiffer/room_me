<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Add new task</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-0">
                <!-- Name -->
                <v-text-field
                  v-model="taskTitle"
                  label="Task"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-broom"
                  color="#FF6F00"
                >
                </v-text-field>
                <!-- End Date -->
                <v-text-field
                  :value="timestamp"
                  label="End date"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-calendar"
                  @click="toggleSelectedTaskDate(true)"
                >
                </v-text-field>
              </v-row>
              <v-text-field
                v-model="taskIntervallDays"
                :rules="[numberRule]"
                label="Rythm of task"
                sm="6"
                m="6"
                prepend-icon="mdi-timer"
                color="#FF6F00"
              >
              </v-text-field>
              

              <!-- Description -->
              <v-text-field
                v-model="taskDescription"
                label="Description"
                sm="6"
                m="6"
                prepend-icon="mdi-information"
                color="#FF6F00"
              >
              </v-text-field>
              <section class="sectionStling">
                <label class="labelStyling">Choose an order:</label>
              </section>
              <v-col class="radioRowStyling">
                <section class="fontStyling">
                  <input
                    type="radio"
                    v-model="switchSelected"
                    v-bind:value="true"
                  />
                  New order

                  <input
                    type="radio"
                    v-model="switchSelected"
                    v-bind:value="false"
                  />
                  Standard Order
                </section>
              </v-col>

              <!-- Roomie Chip if usser selects to switch their task:-->
              <div v-if="switchSelected === true">
                <v-chip-group column multiple active-class="primary--text">
                  <div class="mx-2" v-for="roomie in roomies" :key="roomie.id">
                    <v-chip
                      :color="roomie.color"
                      :outlined="roomie.selected"
                      @click="selectRoomie(roomie)"
                    >
                      <v-avatar left>
                        <v-img v-bind:src="roomie.profilePicture"></v-img>
                      </v-avatar>
                      <strong>{{ roomie.username }}</strong
                      >&nbsp;
                    </v-chip>
                  </div>
                </v-chip-group>
              </div>

              <v-text-field
                v-model="comment"
                label="Comment"
                placeholder="Write a note or just a comment."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
            <v-btn color="pink" @click="addNewTask" v-model="submittedTask"
              >Save</v-btn
            >
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialogSelectedTaskDate" persistent max-width="290">
      <v-card>
        <v-card-title class="headline lighten-2">Choose end date</v-card-title>

        <v-date-picker
          v-model="timestamp"
          color="pink"
        ></v-date-picker>
        <v-card-text>When should this task be finished? </v-card-text>
        <v-card-actions>
          <v-btn color="pink" text @click="toggleSelectedTaskDate(false)">
            Close
          </v-btn>
          <v-btn
            color="pink"
            text
            @click="saveSelectedTaskDate(selectedTaskDate)"
          >
            Save
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CleaningDialogNewTask",
  emits: [
    "toggle-showDialogEndDateInput",
    "toggle-showDialogNewTask",
    "save-endDateInput",
  ],
  props: {
    ["taskList"]: Array,
    showDialog: Boolean,
    ["roomies"]: Array,
    currentUser: Object,

    item: Object,
  },
  data() {
    return {
         numberRule: v => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 90) return true;
        return "Number has to be between 0 and 90";
      },
      submittedTask: "",
      switchSelected: false,
      showDialogSelectedTaskDate: false,
      timestamp: new Date().toISOString().substr(0, 10),
      comment: "",
      taskTitle: "",
      taskDescription: "",
      taskIntervallDays: "",
      selectedTaskDate:"",
      order: [],
    };
  },
  methods: {
    saveSelectedTaskDate() {
      this.selectedTaskDate = this.timestamp;
      this.$emit("save-selectedTaskDate", this.selectedTaskDate);
      this.toggleSelectedTaskDate(false);
      console.log("saved timestamp: " + this.timestamp);
    },
    toggleSelectedTaskDate(newState) {
      this.showDialogSelectedTaskDate = newState;
    },
    addNewTask() {
      // Für Task Vorweg 50
      // this.item.id = LatestId + 1
      console.log("Iwas??"+this.selectedTaskDate + this.timestamp);
      this.taskList.push({
        // id needs to be generated somehow.
        // id: this.id,
        title: this.taskTitle,
        description: this.taskDescription,
        endDate: this.timestamp,
        startDate: this.timestamp,
        completedOn: "",
        intervallDays: this.taskIntervallDays,
        status: 0,
        taskCreator: this.currentUser.username,
        // Missing method for order array:
        order: [],
        swapDecline: [{ roomie: "", type: "", comment: "" }],
        currentUser: this.currentUser.username,
      });
      this.$emit("saveNewTask", this.item);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-showDialogNewTask", false);
      this.comment = "";
      this.completed = this.timestamp;
      this.currentUser = "";
    },
  },
};
</script>
<style>
.radioRowStyling {
  padding-left: 18px;
}
.fontStyling {
  font-size: 1rem;
}
.labelStyling {
  font-size: 1.2rem;
}
</style>