<template>
  <div>
    <v-dialog v-model="showDialogFinishUp" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Check your task</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-0">
              <!-- Task -->
                <v-text-field
                  :value="item.title"
                  label="Task"
                  readonly
                  sm="6"
                  m="6"
                  prepend-icon="mdi-broom"
                  color="#FF6F00"
                >
                </v-text-field>
                  <!-- End Date -->
                <v-text-field
                  :value="item.endDate"
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
              @click="alert()"
             >
              </v-text-field>

                <v-text-field
                label="Comment"
                placeholder="Write a note or just a comment."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>


              <v-dialog v-model="showDialogCalendar" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Open Dialog
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Choose finishing date
                  </v-card-title>
                  <v-date-picker
                    v-model="picker"
                    color="gray lighten-1"
                  ></v-date-picker>
                  <v-card-text
                    >When did you finish your task? Select the date and safe
                    it.</v-card-text
                  >
                  <v-card-actions> </v-card-actions>

                  <v-btn color="pink" text @click="closeCalendarDialog">
                    Close
                  </v-btn>
                  <v-btn color="pink" text @click="closeDialog"> Safe </v-btn>
                </v-card>
              </v-dialog>

            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
            <v-btn color="pink" justify-center>Task checkkk!</v-btn>
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
  emits: ["toggle-showDialogFinishUp"],

  props: {
    showDialogFinishUp: Boolean,
    ["roomies"]: Array,
    item: Object,
    //newPurchase: Object
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  data() {
    return {
      localShowCalendar: this.showDialogCalendar,
      localShowDialog: this.showDialogTaskManager,
      timestamp: "",
      intervall: 7,
      // Show Dialog:

      // Current User that chooses Task:
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
    };
  },
  methods: {
    openCalendar() {
      this.localShowCalendar = true;
    },
    closeCalendarDialog() {
      this.localShowCalendar = false;
    },

    closeDialog() {
      this.$emit("toggle-showDialogFinishUp", false);
    },
    getNow: function () {
      const today = new Date();
      const date =
        today.getDate() +
        "." +
        (today.getMonth() + 1) +
        "." +
        today.getFullYear();

      const dateTime = date;
      this.timestamp = dateTime;
    },
    calculateNextCleaningIntervall: function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
  },
};
</script>