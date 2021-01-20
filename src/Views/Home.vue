<template>
  <v-container class="home" fluid>
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

      <v-btn fab dark small color="green" @click="showDialogNewTask = true">
        <v-icon>mdi-broom</v-icon>
        <div class="fab-text-custom green">Add task</div>
      </v-btn>

      <v-btn fab dark small color="pink" @click="changeDialogState('NEW')">
        <v-icon>mdi-shopping</v-icon>
        <div class="fab-text-custom pink">Add article</div>
      </v-btn>
    </v-speed-dial>

    <v-carousel height="600" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item>
        <v-sheet :color="colors[0]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="posts">
              <v-card elevation="10" max-width="100%">
                <v-card-title>Welcome to your roomie chat!</v-card-title>
                <CommentSectionHomePage></CommentSectionHomePage>
              </v-card>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet :color="colors[0]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="purchasingTab">
              <v-card elevation="10" max-width="100%">
                <v-card-title>Shopping</v-card-title>
                <ThePurchasingTabs
                  class="add-padding"
                  @open-Dialog-Add-Article="openDialogAddArticle"
                ></ThePurchasingTabs>
              </v-card>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet :color="colors[0]" height="100%">
         <v-row class="fill-height" align="center" justify="center">
            <div class="purchasingTab">
              <v-card elevation="10" style="width:500px;height:auto;">
                <v-card-title>Cleaning</v-card-title>
                <CleaningTabs
                  @show-check-off-task="showCheckOffTask"
                  @show-cancel-task="showCancelTask"
                  @take-task-over="takeTaskOver"
                ></CleaningTabs>
              </v-card>
            </div>
           
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import CommentSectionHomePage from "../components/CommentSectionHomePage.vue";
import CleaningTabs from "../components/cleaningComponents/CleaningTabs";
import ThePurchasingTabs from "../components/purchasing/ThePurchasingTabs";

export default {
  /*
        beforeCreate: function () {
            document.body.className = 'home';
        },*/
  name: "Home",
  components: {
    CommentSectionHomePage,
    ThePurchasingTabs,
    CleaningTabs,
  },
  // Leer
  data() {
    return {
      fab: false,
      existingTask: {},
      showDialogNewTask: false,
      taskView: "NEW_TASK",
      callTakeOverFunction: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
    };
  },
  methods: {
    openDialogAddArticle(item) {
      this.changeDialogState("CASH_UP_EXISTING");
      this.existingArticle = item;
    },
    showCheckOffTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = "CHECK_OFF_TASK";
      this.showDialogNewTask = true;
    },
    showCancelTask(existingTask) {
      this.existingTask = existingTask;
      this.taskView = "CANCEL_TASK";
      this.showDialogNewTask = true;
    },

    takeTaskOver(existingTask) {
      this.existingTask = existingTask;
      this.callTakeOverFunction = !this.callTakeOverFunction;
    },
  },
  created() {},
};
</script>

<style>
.comments {
  margin-top: 30px;

  border-radius: 25px;
  padding: 20px;
  padding-bottom: 50px;
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

.comments h1 {
}

.home {
  margin: 5px;
}

.roomme .v-card__title {
  font-size: 1rem;
}
</style>
