<template>
  <div>
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
                  prepend-icon="mdi-account"
                  :color="color"
                  :rules="[rules.required]"
                  maxlength="15"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  :items="$store.state.timeOptions"
                  v-model="task.numberOfDaysInBetween"
                  :color="color"
                  name="roomId"
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
            <v-row no-gutters>
              <v-col cols="6">
                <v-text-field
                  v-model="task.description"
                  label="Description"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-information"
                  color="#FF6F00"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <!-- End Date -->
                <v-text-field
                  :value="task.createdOn"
                  :disabled="EndDateIsDisabled"
                  label="Needs to be done by"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-calendar"
                  @click="toggleCalendar(true)"
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
                <TaskOrder :showStandardOrder="false" :order="task.order"></TaskOrder>
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

    <!-- Calender Dialog -->
    <v-dialog v-model="showDialogCalendar" persistent max-width="290">
      <v-card>
        <v-card-title class="headline lighten-2">Choose end date</v-card-title>

        <v-date-picker v-model="dateInCalendar" color="pink"></v-date-picker>
        <v-card-text>When should this task be finished?</v-card-text>
        <v-card-actions>
          <v-btn color="pink" text @click="toggleCalendar(false)">Close</v-btn>
          <v-btn color="pink" text @click="setDate()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskOrder from "../wgFamilyTreeComponents/TaskOrder";

export default {
  name: "DialogNewTask",
  emits: ["toggle-visibility"],
  components: {
    TaskOrder
  },

  props: {
    showDialog: Boolean,
    rooms: Array
  },
  created() {},

  data() {
    return {
      showDialogCalendar: false,
      task: {
        id: 0,
        name: "",
        description: "",
        createdOn: new Date().toISOString().substr(0, 10),
        createdBy: "",
        numberOfDaysInBetween: "",
        currentEndDate: "",
        order: [{ roomie: "roomieRef", isAssignedToTask: false }]
      },
      color: "#FF6F00", //dialogColor
      dateInCalendar: "",
      orderType: "STANDARD",
      EndDateIsDisabled: true,
      name: "",
      roomId: "",
      valid: true,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    // Calendar Functions
    setDate() {
      this.task.createdOn = this.dateInCalendar;
      this.toggleCalendar(false);
    },
    toggleCalendar(state) {
      this.dateInCalendar = this.task.createdOn;
      this.showDialogCalendar = state;
    },
    enableEndDateFieldAndCalcDate() {
      // add days to date
      let result = this.addDays(new Date(), this.task.numberOfDaysInBetween);
      this.task.createdOn = result.toISOString().substr(0, 10);

      // set date for the Calendar
      this.dateInCalendar = this.task.createdOn;
      this.EndDateIsDisabled = false;
    },
    createNewTask() {
      // get all data and emit
      // close
      let id = this.$store.getters.generateID;
      console.log(id);

      this.closeDialog();
    },

    closeDialog() {
      this.$emit("toggle-visibility");
      this.reset();
    },
    createRoomie() {
      // if this returns true, all required fields are filled out
      if (this.$refs.form.validate()) {
        if (this.creationType == "INVITE") {
          console.log("generate code");
        } else if (this.creationType == "DUMMY") {
          console.log("created dummy");

          // emit to parent, with room id
          this.$emit("create-dummy", [this.roomId, this.name]);
        }
      }
    },
    reset() {
      this.task = {
        id: 0,
        name: "",
        description: "",
        createdOn: new Date().toISOString().substr(0, 10),
        createdBy: "",
        numberOfDaysInBetween: "",
        currentEndDate: "",
        order: []
      };
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
};
</script>

<style scoped>
.labelStyling {
  font-size: 1.2rem;
}
</style>