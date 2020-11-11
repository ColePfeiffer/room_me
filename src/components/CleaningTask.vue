<template>
  <!--Card on the right!, background: orange -->

  <v-row dense class="paddingCards">
    <CleaningDialogFinishUp
      :item="item"
      :showDialogFinishUp="showDialogFinishUp"
      @toggle-showDialogFinishUp="toggleShowDialogFinishUp"
    >
    </CleaningDialogFinishUp>

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
              height="40px"
              outlined
              readonly
              name="Comment"
              :label="currentUser.username"
              :value="item.comment"
            ></v-textarea>
          </div>
          <div v-if="item.status === 0 || item.status === 1 ">
          <v-card-actions>
            <v-col class="text-right">
              <v-btn text>
                <v-icon @click="toggleShowDialogFinishUp(true)"
                  >mdi-check</v-icon
                >
              </v-btn>
              <v-btn text>
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
import CleaningDialogFinishUp from "./CleaningDialogFinishUp";

export default {
  name: "CleaningTask",
  emits: [],
  props: {
    ["item"]: Object,
    ["currentUser"]: Object,
  },
  components: {
    CleaningDialogFinishUp,
  },
  data() {
    return {
      showDialogFinishUp: false,
      debug: true,
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    };
  },
  methods: {
    toggleShowDialogFinishUp(newState) {
      if (this.debug) console.log("old state: " + this.showDialogFinishUp);
      this.showDialogFinishUp = newState;
      if (this.debug) console.log("new state: " + this.showDialogFinishUp);
    },
    // Color generator:
    generator: function () {
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
    /* acceptTask(item){
      this.completedTask = false;
        this.$emit("toggle-dialogTaskManager", true);
        this.currentItemTaskManager = item;
    },*/

    /* acceptTask(item) {
      item.status = 1;
      item.acceptedBy = this.currentUser.username;
      console.log(item.status);

    },*/
  },
};
</script>

<style>
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
</style>