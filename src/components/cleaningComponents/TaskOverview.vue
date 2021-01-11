<template>
  <baseDialog
    :showDialog="showDialog"
    :showCancel="true"
    :isDark="false"
    :dialogTitle="'Task Manager'"
    :confirmBtnText="'Confirm'"
    :closeBtnText="'Close'"
    @confirm-pressed="true"
    @cancel-pressed="$emit('toggle-visibility')"
  >
    <template v-slot:content>
      <v-row justify="space-around">
        <v-col xs="12" sm="12" md="12">
          <v-carousel height="auto" hide-delimiters show-arrows-on-hover>
            <v-carousel-item
              v-for="task in $store.state.taskList"
              :key="task.id"
            >
              <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <v-card elevation="10" max-width="100%" width="400px">
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
                          <v-radio-group v-model="task.orderType">
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

                        <v-col cols="6" v-if="task.orderType == 'STANDARD'"
                          >Everyone has to do this task. No extras.</v-col
                        >
                        <v-col cols="6" v-else-if="task.orderType == 'CUSTOM'"
                          >This task should only be assigned to certain
                          roomies.</v-col
                        >
                      </v-row>

                      <!-- Change Order -->
                      <v-row align="center" justify="center" no-gutters>
                        <v-col v-if="task.orderType == 'CUSTOM'">
                          <TaskOrder
                            :order="task.order"
                            @orderChanged="updateOrder"
                          ></TaskOrder>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../UI/baseDialog";

export default {
  name: "TaskOverview",
  emits: ["toggle-visibility", "create-new-room"],
  components: { baseDialog },
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      showDialogNewTask: true,
      // Component Settings
      color: "#FF6F00", //dialogColor
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.pastRoomie {
  color: gray;
}

.rooms {
  width: 400 px;
}
</style>