<template>
    <div>
      <DialogCalendar
        :showDialog="showDialogCalendar"
        :initialDate="dateInCalendar"
        :vCardText="'Select the end date.'"
        @toggle-visibility="toggleCalendar"
        @set-date="setDate"
      ></DialogCalendar>

      <v-card class="removeScrollbar">
        <v-form ref="form" v-model="valid" lazy-validation>
            
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
                >This task should only be assigned to certain roomies.</v-col
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
        </v-form>
      </v-card>
    </div>
</template>