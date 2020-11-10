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
                v-model="fromDateVal"
                label="Completed on"
                readonly
                sm="6"
                m="6"
                prepend-icon="mdi-calendar"
                @click="toggleCalendarCompletedOn(true)"
              >
              </v-text-field>

              <v-text-field
                v-model="comment"
                label="Comment"
                placeholder="Write a note or just a comment."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>

              <v-dialog
                v-model="showDialogCalendarCompletedOn"
                persistent
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline lighten-2"
                    >Choose finishing date</v-card-title
                  >

                  <v-date-picker
                    v-model="fromDateVal"
                    color="red lighten-1"
                  ></v-date-picker>
                  <v-card-text
                    >When did you finish your task? Select the date and safe
                    it.</v-card-text
                  >
                  <v-card-actions> </v-card-actions>

                  <v-btn
                    color="pink"
                    text
                    @click="toggleCalendarCompletedOn(false)"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="pink"
                    text
                    @click="safeCalendarCompletedOn(completedOnDate)"
                  >
                    Safe
                  </v-btn>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
            <v-btn color="pink" @click="checkOffTask" justify-center
              >Task checkkk!</v-btn
            >
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
  fromDateDisp() {
    return this.fromDateVal;
    // format/do something with date
  },
  data() {
    return {
      // Show Dialog:
      showDialogCalendarCompletedOn: false,
      fromDateVal: this.timestamp,
      //timestamp: "",
      intervall: 7,
      completedOnDate: new Date().toISOString().substr(0, 10),
      comment: "",

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
    safeCalendarCompletedOn(completedOnDate) {
      this.timestamp = completedOnDate;
      this.toggleCalendarCompletedOn(false);
    },
    toggleCalendarCompletedOn(newState) {
      this.showDialogCalendarCompletedOn = newState;
    },
    checkOffTask() {
      this.closeDialog();
      console.log(this.comment + this.completedOnDate + this.currentUser);
      // emit muss comments und completed date noch weitergeben:
      this.$emit("checkOffTask", this.comment, this.completedOnDate, this.status = 3);
    },
    closeDialog() {
      this.$emit("toggle-showDialogFinishUp", false);
      this.comment = "";
      this.completed = null;
      this.currentUser = "";
    },
   
  
  },
};
</script>