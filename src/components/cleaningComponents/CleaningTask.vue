<template>
  <div
    class="mouseOverMe"
    @mouseover="cardIsActive = true"
    @mouseout="cardIsActive = false"
  >
    <v-row dense class="justify-center mt-1">
      <v-col cols="12">
        <v-card class="cleaningCards">
          <v-col>
            <v-row class="mt-1 ml-2">
              <v-img
                class="profile-picture rounded-circle"
                max-width="60"
                max-height="60"
                v-bind:src="task.assignedTo.profilePicture"
              ></v-img>
              <v-col>
                <v-row>
                  <v-card-text class="stylingTextHeadline">{{
                    task.name
                  }}</v-card-text>
                </v-row>
                <v-row>
                  <label class="stylingDate">
                    <v-icon left small>{{
                      true ? "mdi-calendar-clock" : "mdi-calendar-alert"
                    }}</v-icon>
                    {{ task.currentEndDate }}</label
                  >
                  <!--If task is done, show completedOnDate: -->
                  <label
                    class="stylingDateComplete"
                    v-if="task.completedOn != ''"
                  >
                    <v-icon left small class="stylingDateComplete"
                      >mdi-check-bold</v-icon
                    >
                    {{ task.completedOn }}</label
                  ></v-row
                >
              </v-col>
            </v-row>
            <!-- For open tasks only: Description and Actions -->
            <v-row
              v-if="task.status === 0"
              dense
              
              class="justify-center ml-3 mt-2"
            >
              <!-- DESCRIPTION -->
              <v-col
                cols="6"
                class="blockquote custom-scrollbar scrollbar-wrapper"
              >
                <label>{{ task.description }}</label>
              </v-col>
              <!-- ACTIONS -->
              <v-col cols="6">
                <v-card-actions v-if="task.status === 0 || task.status === 1">
                  <v-col class="text-right" v-if="isUserLoggedIn">
                    <v-btn text @click="showCheckOffTask">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                    <v-btn text @click="showCancelTask">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    class="text-right"
                    v-show="!isUserLoggedIn && cardIsActive"
                    @mouseover="cardIsActive = true"
                  >
                    <v-btn text @click="takeTaskOver" color="grey">
                      <v-icon>done_all</v-icon>
                    </v-btn>
                    <v-btn text @click="remindMe" color="grey">
                      <v-icon>alarm</v-icon>
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-col>
            </v-row>

            <!-- For completed tasks only: Comment -->
            <v-row
              v-if="task.status === 3 && task.comment != ''"
              dense
              class="justify-center ml-3 mt-2"
            >
              <v-col
                cols="12"
                class="blockquote custom-scrollbar scrollbar-wrapper border"
              >
                <label>{{ task.assignedTo.username  + ': ' + task.comment }}</label>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CleaningTask",
  props: {
    ["task"]: Object,
  },
  emits: ["show-check-off-task", "show-cancel-task", "take-task-over"],
  data() {
    return {
      showDialogFinishUp: false,
      showDialogDeclineTask: false,
      cardIsActive: false,
    };
  },
  methods: {
    showCheckOffTask() {
      this.$emit("show-check-off-task", this.task);
    },
    showCancelTask() {
      this.$emit("show-cancel-task", this.task);
    },
    toggleDialogDeclineTask(newState) {
      this.showDialogDeclineTask = newState;
    },
    remindMe() {
      alert("Not implemented yet.");
    },
    takeTaskOver() {
      this.$emit("take-task-over", this.task);
    },
  },
  computed: {
    isUserLoggedIn() {
      if (this.$store.getters.currentUser === this.task.assignedTo) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.mouseOverMe {
  display: block;
}
.cleaningCards {
  width: 100%;
  padding-bottom: 15px;
  height: 200px;
}
.border{
   border-style: left;
  border-width: medium;
  border-left:2px solid #E91E63;
}
.linear {
  background-image: linear-gradient(#000, #000);
  background-size: 2px 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.scrollbar-wrapper {
  max-height: 60px;
  overflow-y: auto;
  padding-right: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 6 0 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 6 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 6 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 6 0 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 6 0 0px rgba(0, 0, 0, 0.3);
  box-shadow: inset 6 0 0px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.commentBox {
  padding-top: 15px;
}
.profile-picture {
  margin: 1em;
}

.upperRow {
  margin: 0.2em;
  padding-top: 10px;
}

.descRow {
  margin: 0.2em;
}
.stylingTextHeadline {
  font-size: 1.8rem;
}
.stylingDate {
  font-size: 1rem;
  padding-left: 18px;
}
.stylingDateComplete {
  font-size: 1rem;
  padding-left: 18px;
  color: green;
}
.stylingTextSubtitle {
  font-size: 1.1rem;
}
.stylingTextSubtitleBold {
  font-size: 1.1rem;

  font-weight: bold;
}
</style>
