<template>
  <div>
    <DialogCalendar
      :showDialog="showDialogCalendar"
      :initialDate="dateInCalendar"
      :vCardText="'Select the end date.'"
      @toggle-visibility="toggleCalendar"
      @set-date="setDate"
    ></DialogCalendar>

    <v-dialog :value="showDialog" persistent width="500">
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
                  <v-radio label="normal order" value="STANDARD" :color="color"></v-radio>
                  <v-radio label="custom order" value="CUSTOM" :color="color"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col
                cols="6"
                v-if="orderType == 'STANDARD'"
              >Everyone has to do this task. No extras.</v-col>
              <v-col
                cols="6"
                v-else-if="orderType == 'CUSTOM'"
              >This task should only be assigned to certain roomies.</v-col>
            </v-row>

            <!-- Change Order -->
            <v-row align="center" justify="center" no-gutters>
              <v-col v-if="orderType == 'CUSTOM'">
                <TaskOrder :order="task.order" @orderChanged="updateOrder"></TaskOrder>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn color="pink" :disabled="!valid" @click="createNewTask">Create</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskOrder from "../wgFamilyTreeComponents/TaskOrder";
import DialogCalendar from "../UI/DialogCalendar";

import { uuid } from "vue-uuid";

export default {
  name: "DialogNewTask",
  emits: ["toggle-visibility"],
  components: {
    TaskOrder,
    DialogCalendar
  },
  props: {
    showDialog: Boolean
  },
  data() {
    return {
      color: "#FF6F00", //dialogColor
      showDialogCalendar: false,
      orderType: "STANDARD", // STANDARD, CUSTOM
      EndDateIsDisabled: true,
      dateInCalendar: "",
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
        order: this.$store.state.standardOrder
        //swapDecline: [{ roomie: "ref", type: "", comment: "" }]
      },
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    enableEndDateFieldAndCalcDate() {
      // add days to date
      let result = this.addDays(new Date(), this.task.numberOfDaysInBetween);
      this.task.currentEndDate = result.toISOString().substr(0, 10);

      // set date for the Calendar
      this.dateInCalendar = this.task.currentEndDate;
      this.EndDateIsDisabled = false;
    },
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
    updateOrder(newOrder) {
      this.task.order = newOrder;
      console.log("Order changed!");
    },
    moveTaskOrder() {},
    getRoomieFromCustomOrder() {
      let roomieTaskGetsAssignedTo;
      let roomieFound = false;
      console.log("Entering while: ");
      while (!roomieFound) {
        if (this.task.order[0].isAssignedToTask === true) {
          console.log(
            "Assigning " + this.task.order[0].roomie.username + " to the job. "
          );
          roomieFound = true;
          roomieTaskGetsAssignedTo = this.task.order[0].roomie;
        } else {
          console.log(
            this.task.order[0].roomie.username +
              " isn't assigned, going to the next one..."
          );
          console.log("Shifting.");
          this.task.order.push(this.task.order.shift());
        }
      }
      console.log("Shifting once: ");
      this.task.order.push(this.task.order.shift());
      return roomieTaskGetsAssignedTo;
    },
    closeDialog() {
      this.$emit("toggle-visibility");
      this.reset();
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
        order: this.$store.state.standardOrder
      };
      this.EndDateIsDisabled = true;
      this.valid = false;
      this.orderType = "STANDARD";
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    // Calendar Functions
    setDate(newDate) {
      this.task.currentEndDate = newDate;
      this.toggleCalendar();
    },
    toggleCalendar() {
      this.showDialogCalendar = !this.showDialogCalendar;
    }
  }
};
</script>

<style scoped>
.labelStyling {
  font-size: 1.2rem;
}
</style>