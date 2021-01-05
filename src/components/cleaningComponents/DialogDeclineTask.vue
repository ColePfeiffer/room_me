<template>
  <v-dialog v-model="showDialogDeclineTask" persistent width="500">
    <v-card>
      <v-card-title class="headline ighten-2">Decline or switch task</v-card-title>
      <v-card-text cols="12" sm="12">
        <v-row>
          <v-col>
            <v-row class="mx-0">
              <!-- Task -->
              <v-text-field
                :value="task.title"
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
            <!-- Radio Button for either Cancel Task or Switch 
              cancel: takes roomie that would be next for this task
              switch: lets roomie choose with whom they want to change.
            -->

            <v-row class="radioRowStyling">
              <section class="fontStyling">
                <input type="radio" v-model="switchSelected" v-bind:value="true" />
                Switch
                <br />
                <input type="radio" v-model="switchSelected" v-bind:value="false" />
                Cancel
              </section>
            </v-row>

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
                    <strong>{{ roomie.username }}</strong>&nbsp;
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
          <v-btn color="pink" @click="checkOffTask(task)" justify-center>Task checkkk!</v-btn>
        </v-row>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CleaningDialogDecline",
  emits: ["toggle-showDialogDeclineTask", "save-calendarCompletedOn"],

  props: {
    showDialogDeclineTask: Boolean,
    task: Object
  },
  created() {
    setInterval(this.getNow, 1000);
  },

  data() {
    return {
      // Show Dialog:
      showDialogCalendarCompletedOn: false,
      switchSelected: false,
      intervall: 7,
      // Shows todays date:
      timestamp: new Date().toISOString().substr(0, 10),
      completedOnDate: "",
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
        color: "#1F85DE"
      }
    };
  },
  methods: {
    selectRoomie(selected_roomie) {
      this.roomies.forEach(function(roomie, index) {
        if (roomie == selected_roomie) {
          roomie.selected = !roomie.selected;
          console.log(roomie.selected, index);
        }
      });
    },
    roomieChipOutlined(roomie) {
      if (roomie.selected) {
        return true;
      } else {
        return true;
      }
    },

    checkOffTask() {
      // Status: 0 - offen, accepted: 1, declined: 2, done: 3
      this.task.status = 2;
      this.task.comment = this.comment;
      //   swapDecline: [{ roomie: "", type: "", comment: "" }],
      // swap: 1, decline: 2
      this.task.swapDecline = [
        { id: this.id, roomie: this.roomie, type: 1, comment: this.comment }
      ];

      // emit muss comments und completed date noch weitergeben:
      this.$emit("checkOffTask", this.task);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-showDialogDeclineTask", false);
      this.comment = "";
      this.completed = this.timestamp;
      this.currentUser = "";
    }
  }
};
</script>
<style scoped>
.radioRowStyling {
  padding-left: 18px;
}
.fontStyling {
  padding-bottom: 15px;
  font-size: 1rem;
}
</style>