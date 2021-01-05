<template>
  <v-row dense class="paddingCards">
    <DialogFinishUp
      :task="task"
      :showDialogFinishUp="showDialogFinishUp"
      @toggle-showDialogFinishUp="toggleShowDialogFinishUp"
    ></DialogFinishUp>

    <DialogDeclineTask
      :task="task"
      :roomies="roomies"
      :showDialogDeclineTask="showDialogDeclineTask"
      @toggle-showDialogDeclineTask="toggleShowDialogDeclineTask"
    ></DialogDeclineTask>

    <v-col cols="12">
      <v-card class="cleaningCards">
        <v-col class="profileAndTitleCol">
          <v-row>
            <v-img
              class="profile-picture rounded-circle"
              max-width="60"
              max-height="60"
              v-bind:src="task.acceptedBy.profilePicture"
            ></v-img>

            <v-col>
              <v-card-text class="stylingTextHeadline">{{ task.name }}</v-card-text>

              <label class="stylingDate">End date: {{ task.endDate }}</label>
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
                <v-btn text @click="toggleShowDialogFinishUp(true)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn text @click="toggleShowDialogDeclineTask(true)">
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
  emits: [],
  props: {
    ["task"]: Object
  },
  components: {
    DialogFinishUp,
    DialogDeclineTask
  },
  data() {
    return {
      model: 0,
      showDialogFinishUp: false,
      showDialogDeclineTask: false,
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),

      roomies: [
        {
          id: 0,
          username: "Chris",
          description: "Hi there!",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: +3,
          balancePlus: true,
          selected: true,
          color: "#1F85DE",
          showProfilePage: false,
          isLoggedIn: true
        },
        {
          id: 1,
          username: "Hannah",
          description: "Möpp",
          profilePicture:
            "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: -3,
          balancePlus: false,
          selected: true,
          color: "#DE591F",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 2,
          username: "Rufus",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#BDA0EC",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 3,
          username: "Tim",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#EBE386",
          showProfilePage: false,
          isLoggedIn: false
        }
      ]
    };
  },
  methods: {
    toggleShowDialogFinishUp(newState) {
      if (this.debug) console.log("old state: " + this.showDialogFinishUp);
      this.showDialogFinishUp = newState;
      if (this.debug) console.log("new state: " + this.showDialogFinishUp);
    },
    toggleShowDialogDeclineTask(newState) {
      if (this.debug) console.log("old state: " + this.showDialogDeclineTask);
      this.showDialogDeclineTask = newState;
      if (this.debug) console.log("new state: " + this.showDialogDeclineTask);
    },

    // Color generator:
    generator: function() {
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
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
