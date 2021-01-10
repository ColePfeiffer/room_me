<template>
  <div
    class="mouseOverMe"
    @mouseover="cardIsActive = true"
    @mouseout="cardIsActive = false"
  >
    <v-row dense class="paddingCards">
      <v-col cols="12">
        <v-card class="cleaningCards">
          <v-col class="profileAndTitleCol">
            <v-row>
              <v-img
                class="profile-picture rounded-circle"
                max-width="60"
                max-height="60"
                v-bind:src="task.assignedTo.profilePicture"
              ></v-img>
              <v-col>
                <v-card-text class="stylingTextHeadline">{{
                  task.name
                }}</v-card-text>
                <label class="stylingDate"
                  >End date: {{ task.currentEndDate }}</label
                >
                <!--If task is done, show completedOnDate: -->
                <label class="stylingDateComplete" v-if="task.completedOn != ''"
                  >Done: {{ task.completedOn }}</label
                >
              </v-col>
            </v-row>
            <div class="stylingTextSubtitle">
              <label>{{ task.description }}</label>
            </div>

            <!-- FOR DONE TASKS ONLY -->
            <div
              class="commentBox"
              v-if="task.status === 3 && task.comment != ''"
            >
              <!--If task is done, show comment:-->
              <fieldset style="text-align: center">
                <legend style="text-align: center">
                  <p class="text--black;">
                    {{ $store.getters.currentUser.username }}
                  </p>
                </legend>
                <div
                  style="
                    text-align: left;
                    padding-left: 15px;
                    padding-bottom: 15px;
                  "
                >
                  {{ task.comment }}
                </div>
              </fieldset>
            </div>

            <!-- ACTIONS -->
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

      // DECLINE
      // A gibt ab. Order: A, B, C, D
      // shift() -> B und A tauschen Plätze.
      // Kommentar im Task oder auf der Pinnwand/Chat
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
}
.commentBox {
  padding-top: 15px;
}
.profile-picture {
  margin: 1em;
}

.profileAndTitleCol {
  margin: 0.2em;
  padding-top: 10px;
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
