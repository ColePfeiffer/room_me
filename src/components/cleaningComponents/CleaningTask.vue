<template>
  <v-row dense class="paddingCards">
    <DialogFinishUp
      :task="task"
      :showDialogFinishUp="showDialogFinishUp"
      @toggle-showDialogFinishUp="toggleDialogFinishUp"
    ></DialogFinishUp>

    <DialogDeclineTask
      :task="task"
      :showDialogDeclineTask="showDialogDeclineTask"
      @toggle-showDialogDeclineTask="toggleDialogDeclineTask"
    ></DialogDeclineTask>

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
              <v-card-text class="stylingTextHeadline">{{ task.name }}</v-card-text>
              <label class="stylingDate">End date: {{ task.currentEndDate }}</label>
              <!--If task is done, show completedOnDate: -->
              <label
                class="stylingDateComplete"
                v-if="task.completedOnDate != null"
              >Done: {{ task.completedOnDate }}</label>
            </v-col>
          </v-row>
          <div class="stylingTextSubtitle">
            <label>{{ task.description }}</label>
          </div>

          <div class="commentBox" v-if="task.status === 3 && task.comment != '' ">
            <!--If task is done, show comment:-->
            <fieldset style="text-align: center">
              <legend style="text-align: center">
                <p class="text--black;">{{ $store.getters.currentUser.username }}</p>
              </legend>
              <div
                style="text-align: left; padding-left: 15px; padding-bottom: 15px"
              >{{ task.comment }}</div>
            </fieldset>
          </div>

          <div v-if="task.status === 0 || task.status === 1">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text @click="toggleDialogFinishUp(true)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn text @click="toggleDialogDeclineTask(true)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-card-actions>
          </div>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DialogFinishUp from "./DialogFinishUp";
import DialogDeclineTask from "./DialogDeclineTask";

export default {
  name: "CleaningTask",
  props: {
    ["task"]: Object
  },
  components: {
    DialogFinishUp,
    DialogDeclineTask
  },
  data() {
    return {
      showDialogFinishUp: false,
      showDialogDeclineTask: false
    };
  },
  methods: {
    toggleDialogFinishUp(newState) {
      this.showDialogFinishUp = newState;
    },
    toggleDialogDeclineTask(newState) {
      this.showDialogDeclineTask = newState;
    }
  }
};
</script>

<style scoped>
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
