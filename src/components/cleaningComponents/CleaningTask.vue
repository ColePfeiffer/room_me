<template>
  <!--Card on the right!, background: orange -->

  <v-row dense class="paddingCards">
    <CleaningDialogFinishUp
      :item="item"
      :showDialogFinishUp="showDialogFinishUp"
      :taskList="taskList"
      @toggle-showDialogFinishUp="toggleShowDialogFinishUp"
    >
    </CleaningDialogFinishUp>

    <CleaningDialogDeclineTask
      :item="item"
      :roomies="roomies"
      :showDialogDeclineTask="showDialogDeclineTask"
      @toggle-showDialogDeclineTask="toggleShowDialogDeclineTask"
    >
    </CleaningDialogDeclineTask>

        <CleaningDialogNewTask
      :showDialog="showDialogNewTask"
      :currentUser="currentUser"
      :roomies="roomies"
        :taskList="taskList"
     :item="item"
      @toggle-showDialogNewTask="toggleShowDialogNewTask"
    ></CleaningDialogNewTask>

      <v-speed-dial
      color="pink"
      v-model="fab"
      dark
      small
      absolute
      fixed
      bottom
      right
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>


      <v-btn fab dark small color="pink" @click="showDialogNewTask = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom pink">Add task</div>
      </v-btn>
    </v-speed-dial>

    <v-col cols="12">
      <v-card class="cleaningCards">
        <v-col class="profileAndTitleCol">
          <v-row>
            <v-img
              class="profile-picture rounded-circle"
              max-width="60"
              max-height="60"
              v-bind:src="currentUser.profilePicture"
            ></v-img>

            <v-col>
              <v-card-text class="stylingTextHeadline"
                >{{ item.title }}
              </v-card-text>

              <label class="stylingDate">End date: {{ item.endDate }}</label>
              <!--If task is done, show completedOnDate: -->
              <label
                class="stylingDateComplete"
                v-if="item.completedOnDate != null"
              >
                Done: {{ item.completedOnDate }}
              </label>
            </v-col>
          </v-row>
          <div class="stylingTextSubtitle">
            <label>
              {{ item.description }}
            </label>
          </div>

          <div class="commentBox" v-if="item.status === 3">
            <!--If item is done, show comment:-->
            <v-textarea
              height="80px"
              outlined
              readonly
              name="Comment"
              :label="currentUser.username"
              :value="item.comment"
            ></v-textarea>
          </div>
          <div v-if="item.status === 0 || item.status === 1">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text>
                  <v-icon @click="toggleShowDialogFinishUp(true)"
                    >mdi-check</v-icon
                  >
                </v-btn>
                <v-btn text>
                  <v-icon @click="toggleShowDialogDeclineTask(true)"
                    >mdi-close</v-icon
                  >
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
import CleaningDialogFinishUp from "./CleaningDialogFinishUp";
import CleaningDialogDeclineTask from "./CleaningDialogDeclineTask";
import CleaningDialogNewTask from "./CleaningDialogNewTask";

export default {
  name: "CleaningTask",
  emits: [],
  props: {
    ["item"]: Object,
    ["currentUser"]: Object,
       ["taskList"]: Array,
  },
  components: {
    CleaningDialogFinishUp,
    CleaningDialogDeclineTask,
      CleaningDialogNewTask,
  },
  data() {
    return {
       fab: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],

      model: 0,
      showDialogNewTask: false,
      showDialogFinishUp: false,
      showDialogDeclineTask: false,
      debug: true,
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
     toggleShowDialogNewTask(newState) {
      if (this.debug) console.log("old state: " + this.showDialogNewTask);
      this.showDialogNewTask = newState;
      if (this.debug) console.log("new state: " + this.showDialogNewTask);
    },
    // Color generator:
    generator: function () {
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
  },
};
</script>

<style scoped>
.cleaningCards {
  width: 100%;
}
.commentBox {
  padding-top: 20px;
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
.fab-text-custom {
  position: absolute;
  right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
</style>
