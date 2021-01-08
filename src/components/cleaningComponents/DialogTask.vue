<template>
  <v-dialog :value="showDialog" persistent width="500">
    <div v-if="view === 'NEW_TASK'">
      <DialogCalendar
        :showDialog="showDialogCalendar"
        :initialDate="dateInCalendar"
        :vCardText="'Select the end date.'"
        @toggle-visibility="toggleCalendar"
        @set-date="setDate"
      ></DialogCalendar>

      <v-card class="removeScrollbar">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Task Creator</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <!-- Name and End Date -->
            <v-row>
              <v-col cols="6">
                <!-- Enter name -->
                <v-text-field
                  v-model="task.name"
                  label="Name"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-broom"
                  :color="color"
                  :rules="[rules.required]"
                  maxlength="50"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  :items="$store.state.timeOptions"
                  v-model="task.numberOfDaysInBetween"
                  :color="color"
                  item-text="text"
                  item-value="days"
                  label="How often?"
                  prepend-icon="mdi-timer"
                  :rules="[rules.required]"
                  required
                  v-on:change="enableEndDateFieldAndCalcDate"
                ></v-select>
              </v-col>
            </v-row>
            <!-- Description -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="task.description"
                  label="Description"
                  prepend-icon="mdi-information"
                  color="#FF6F00"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <!-- End Date -->
                <v-text-field
                  :value="task.currentEndDate"
                  :disabled="EndDateIsDisabled"
                  label="Needs to be done by"
                  prepend-icon="mdi-calendar"
                  @click="toggleCalendar"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Order Pre-Settings -->
            <v-row no-gutters>
              <label class="labelStyling">Who is it for?</label>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="6">
                <v-radio-group v-model="orderType">
                  <v-radio
                    label="normal order"
                    value="STANDARD"
                    :color="color"
                  ></v-radio>
                  <v-radio
                    label="custom order"
                    value="CUSTOM"
                    :color="color"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="6" v-if="orderType == 'STANDARD'"
                >Everyone has to do this task. No extras.</v-col
              >
              <v-col cols="6" v-else-if="orderType == 'CUSTOM'"
                >This task should only be assigned to certain roomies.</v-col
              >
            </v-row>

            <!-- Change Order -->
            <v-row align="center" justify="center" no-gutters>
              <v-col v-if="orderType == 'CUSTOM'">
                <TaskOrder
                  :order="task.order"
                  @orderChanged="updateOrder"
                ></TaskOrder>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn color="pink" :disabled="!valid" @click="createNewTask"
                  >Create</v-btn
                >
              </v-col>
              <v-col cols="4">
                <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>

    <div v-else-if="view === 'CHECK_OFF_TASK'">
      <DialogCalendar
        :showDialog="showDialogCalendar"
        :initialDate="dateInCalendar"
        :vCardText="'When did you finish your task? Select the date and hit save.'"
        @toggle-visibility="toggleCalendar"
        @set-date="setDate"
      ></DialogCalendar>

      <v-card class="removeScrollbar">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">You did it? Great!</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <!-- Name -->
              <v-text-field
                :value="task.name"
                label="Task"
                sm="6"
                m="6"
                prepend-icon="mdi-broom"
                :color="color"
                maxlength="15"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <!-- End Date -->
              <v-text-field
                :value="currentDate"
                label="Completed On"
                prepend-icon="mdi-calendar"
                @click="toggleCalendar"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Comment -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="task.comment"
                label="Comment"
                placeholder="Being late? Did extra? Leave a note."
                prepend-icon="comment"
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around">
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn color="pink" @click="checkOffTask">Check off</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>

    <div v-else-if="view == 'SWITCH_DECLINE_TASK'"></div>

    <div v-else-if="view == 'EDIT_TASK'"></div>
  </v-dialog>
</template>

<script>
import TaskOrder from "../wgFamilyTreeComponents/TaskOrder";
import DialogCalendar from "../UI/DialogCalendar";
import { uuid } from "vue-uuid";

export default {
  name: "DialogTask",
  emits: ["toggle-visibility"],
  components: {
    TaskOrder,
    DialogCalendar,
  },
  props: {
    showDialog: Boolean,
    view: String,
    existingTask: Object,
  },
  created(){
    console.log(this.view);
  },
  data() {
    return {
      color: "#FF6F00", //dialogColor
      showDialogCalendar: false,
      dateInCalendar: "",

      // CHECK OFF VARS

      roomieFound: false,
      currentDate: new Date().toISOString().substr(0, 10),

      // NEW TASK VARS
      orderType: "STANDARD", // STANDARD, CUSTOM
      EndDateIsDisabled: true,
      valid: true, // for validation
      task: {
        id: 0,
        name: "",
        description: "",
        comment: "",
        status: 0,
        createdBy: "",
        assignedTo: "",
        // doneBy,
        currentEndDate: new Date().toISOString().substr(0, 10),
        completedOn: "",
        numberOfDaysInBetween: "",
        order: this.$store.state.standardOrder,
        //swapDecline: [{ roomie: "ref", type: "", comment: "" }]
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    createNewTask() {
      // if this returns true, all required fields are filled out
      if (this.$refs.form.validate()) {
        // set data
        this.task.id = uuid.v4();
        this.task.createdBy = this.$store.getters.currentUser;

        // Assigning Task to next Roomie using the Task Order
        if (this.orderType === "STANDARD") {
          console.log("Using Standard Order!");
          this.task.assignedTo = this.$store.state.standardOrder[0].roomie;
          this.$store.commit(
            "setLastRoomieSelectedForStandardOrder",
            this.task.assignedTo
          );
          this.$store.commit("moveTaskOrder");
        } else {
          console.log("Using Custom Order!");
          this.task.assignedTo = this.getRoomieFromCustomOrder();
        }

        // add to taskList and close Dialog
        this.$store.state.taskList.push(this.task);
        this.closeDialog();
      }
    },
    recreateTask() {
      let newEndDate = this.addDays(
        this.existingTask.completedOn,
        this.existingTask.numberOfDaysInBetween
      )
        .toISOString()
        .substr(0, 10);

      let newTask = {
        id: uuid.v4(),
        name: this.existingTask.name,
        description: this.existingTask.description,
        comment: "",

        status: 0, // Status: 0 - offen, accepted: 1, declined: 2, done: 3
        createdBy: this.existingTask.createdBy,
        // needs to utilize vacation mode
        assignedTo: this.getRoomieFromCustomOrder(),
        // doneBy,
        currentEndDate: newEndDate,
        completedOn: "",
        numberOfDaysInBetween: this.existingTask.numberOfDaysInBetween,
        order: this.existingTask.order,
      };

      // add to taskList
      this.$store.state.taskList.push(newTask);
    },
    checkOffTask() {
      this.task.status = 3;
      this.task.completedOn = this.currentDate;
      this.recreateTask();
      this.closeDialog();
    },
    getRoomieFromCustomOrder() {
      let roomieTaskGetsAssignedTo;
      let roomieFound = false;
      while (!roomieFound) {
        if (this.task.order[0].isAssignedToTask === true) {
          if (this.$store.state.debug)
            console.log(
              "Assigning " +
                this.task.order[0].roomie.username +
                " to the job. "
            );
          roomieFound = true;
          roomieTaskGetsAssignedTo = this.task.order[0].roomie;
        } else {
          if (this.$store.state.debug)
            console.log(
              this.task.order[0].roomie.username +
                " isn't assigned, going to the next roomie by shifting once..."
            );
          this.task.order.push(this.task.order.shift());
        }
      }
      this.task.order.push(this.task.order.shift());
      return roomieTaskGetsAssignedTo;
    },
    reset() {
      this.task = {
        id: 0,
        name: "",
        description: "",
        comment: "",
        // Status: 0 - offen, accepted: 1, declined: 2, done: 3
        status: 0,
        createdBy: "",
        assignedTo: "",
        // doneBy,
        currentEndDate: new Date().toISOString().substr(0, 10),
        completedOn: "",
        numberOfDaysInBetween: "",
        order: this.$store.state.standardOrder,
      };
      this.EndDateIsDisabled = true;
      this.valid = false;
      this.orderType = "STANDARD";

      // Resetting CHECK_OFF vars
      this.currentDate = new Date().toISOString().substr(0, 10);
      this.roomieFound = false;
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    // Functions that show/hide or enable/disable elements
    enableEndDateFieldAndCalcDate() {
      // add days to date
      let result = this.addDays(new Date(), this.task.numberOfDaysInBetween);
      this.task.currentEndDate = result.toISOString().substr(0, 10);

      // set date for the Calendar
      this.dateInCalendar = this.task.currentEndDate;
      this.EndDateIsDisabled = false;
    },
    closeDialog() {
      this.$emit("toggle-visibility");
      this.reset();
    },
    // Calendar Functions
    setDate(newDate) {
      this.task.currentEndDate = newDate; // NEW TASK
      this.currentDate = newDate; // CASH OFF
      this.toggleCalendar();
    },
    toggleCalendar() {
      this.showDialogCalendar = !this.showDialogCalendar;
    },
  },
};
</script>

<style scoped>
.labelStyling {
  font-size: 1.2rem;
}
</style>