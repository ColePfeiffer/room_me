<template>
  <!--Card on the right!, background: orange -->
  <v-row dense class="card">
    <DialogEditArticle
      :item="item"
      @save-changes="saveChangesInEditPage"
      :showDialog="showDialogEditArticle"
      @toggle-showDialogEditArticle="toggleShowDialogEditArticle"
    ></DialogEditArticle>

    <v-col cols="12">
      <v-card class="purchasingCards">
        <v-col class="profileAndTitleCol">
          <v-row>
            <v-img
              class="profile-picture rounded-circle"
              max-width="100"
              max-height="100"
              v-bind:src="item.avatar"
            ></v-img>

            <v-col>
              <v-card-text class="stylingTextHeadline">
                {{ item.name }}
                <v-btn text @click="toggleShowDialogEditArticle(true)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-text>

              <label class="stylingDate">Created on: {{ item.createdOn }}</label>
            </v-col>
          </v-row>
          <div class="stylingTextSubtitle">
            <label>{{ item.comment }}</label>
          </div>

          <div class="commentBox" v-if="item.status === 3 && item.comment != ''">
            <!--If item is done, show comment:-->
            <fieldset style="text-align: center">
              <legend style="text-align: center">
                <p class="text--black;">{{ $store.getters.currentUser.username }}</p>
              </legend>
              <div
                style="
                  text-align: left;
                  padding-left: 15px;
                  padding-bottom: 15px;
                "
              >{{ item.comment }}</div>
            </fieldset>
          </div>

          <div v-if="item.status === 0">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text @click="acceptItem(item)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn text @click="openDialogSplit(item)">
                  <v-icon>euro</v-icon>
                </v-btn>
              </v-col>
            </v-card-actions>
          </div>
          <div v-if="item.status === 1">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text @click="openDialogSplit(item)">
                  <v-icon>euro</v-icon>
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
import DialogEditArticle from "./DialogEditArticle";

export default {
  name: "PurchasingTask",
  emits: [
    "set-newPurchaseName",
    "save-changesInEditPage",
    "open-Dialog-Add-Article"
  ],
  props: {
    ["item"]: Object
  },
  components: {
    DialogEditArticle
  },
  data() {
    return {
      submittedItem: "",
      showDialogEditArticle: false,

      completedPurchase: false,
      currentItemForCashingUp: {}
    };
  },
  methods: {
    acceptItem(item) {
      this.item.status = 1;
      this.item.acceptedBy = this.$store.getters.currentUser.username;
      this.item.avatar = this.$store.getters.currentUser.profilePicture;
      console.log("itemhier" + this.item.name);
      console.log("itemhier" + this.item.status);
      console.log(item);
    },

    toggleShowDialogEditArticle(newState) {
      if (this.debug) console.log("old state: " + this.showDialogEditArticle);
      this.showDialogEditArticle = newState;
      if (this.debug) console.log("new state: " + this.showDialogEditArticle);
    },

    saveChangesInEditPage(item, changeData, keepAlive) {
      if (keepAlive) {
        item.name = changeData.name;
      } else {
        const position = this.$store.state.shoppingList.indexOf(item);
        console.log(position);
        this.$store.state.shoppingList.splice(position, 1);
      }
      item.showDialogEditArticle = false;
    },

    openDialogSplit(item) {
      this.$emit("open-Dialog-Add-Article", item);
    },
    addItem() {
      this.$store.state.shoppingList.push({
        name: this.submittedItem,
        status: 0,
        showEditDialog: false
      });
      this.submittedItem = "";
    },

    // Should be an option if item is edited!
    removeItem(index) {
      this.$store.state.shoppingList.splice(index, 1);
      // beim Aufrufen IN DEM CLICK EVENT!!
      // v-for="(goal, index) in goals @click="removeGoal(index)"
    }
  }
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
.padding15 {
  padding-left: 15px;
  padding-right: 15px;
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