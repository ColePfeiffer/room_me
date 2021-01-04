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
                  v-model="numberOfDaysInBetween"
                  :color="color"
                  name="roomId"
                  item-text="text"
                  item-value="days"
                  label="How often?"
                  prepend-icon="mdi-timer"
                  :rules="[rules.required]"
                  required
                  v-on:change="CreatedOnDisabled = true"
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
                  disabled="CreatedOnDisabled"
                  label="Needs to be done by"
                  sm="6"
                  m="6"
                  prepend-icon="mdi-calendar"
                  @click="toggleSelectedTaskDate(true)"
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
              <v-col v-if="orderType == 'CUSTOM'"></v-col>
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
    <v-dialog v-model="showDialogSelectedTaskDate" persistent max-width="290">
      <v-card>
        <v-card-title class="headline lighten-2">Choose end date</v-card-title>

        <v-date-picker v-model="createdOn" color="pink"></v-date-picker>
        <v-card-text>When should this task be finished?</v-card-text>
        <v-card-actions>
          <v-btn color="pink" text @click="toggleSelectedTaskDate(false)">Close</v-btn>
          <v-btn color="pink" text @click="saveSelectedTaskDate(selectedTaskDate)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogNewTask",
  emits: ["toggle-visibility"],

  props: {
    showDialog: Boolean,
    rooms: Array
  },
  created() {},

  data() {
    return {
      timestamp: "",
      task: {
        id: 0,
        name: "",
        description: "",
        createdOn: "",
        createdBy: "",
        numberOfDaysInBetween: ""
      },
      color: "#FF6F00", //dialogColor
      orderType: "STANDARD",
      CreatedOnDisabled: true,
      name: "",
      roomId: "",
      valid: true,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("toggle-visibility");
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
    }
  }
};
</script>

<style scoped>
.labelStyling {
  font-size: 1.2rem;
}
</style>