<template>
  <!--Card on the right!, background: orange -->
  <v-row dense class="card">
    <v-col cols="8">
      <v-card class="purchasingCards">
        <v-row>
          <!--  -->
          <v-col xs="6" s="6" md="3">
            <v-img
              class="profile-picture rounded-circle"
              max-width="100"
              max-height="100"
              v-bind:src="item.avatar"
            ></v-img>
          </v-col>
          <v-col xs="6" s="6" md="6">
            <v-col>
              <v-card-text class="stylingTextHeadline">
                {{ item.name }}
                <v-btn text @click="toggleShowDialogeditArticle(true)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-row>
                  <v-card-text class="stylingTextSubtitle">{{ item.comment }}</v-card-text>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col></v-col>
          </v-col>
          <v-col>
            <v-row>
              <v-card-text class="stylingDate">{{ item.createdOn }}</v-card-text>

              <v-row>
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
              </v-row>
              <!--Cards when pending:-->
              <v-row>
                <div v-if="item.status === 1">
                  <v-card-actions>
                    <v-col class="text-left">
                      <v-btn text @click="openDialogSplit(item)">
                        <v-icon>euro</v-icon>
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </div>
              </v-row>
            </v-row>
          </v-col>
        </v-row>

        <div class="commentBox" v-if="item.status === 3">
          <!--If item is done, show comment:-->
          <v-textarea
            height="80px"
            outlined
            readonly
            name="Comment"
            :label="$store.getters.currentUser.username"
            :value="item.comment"
          ></v-textarea>
        </div>
        <DialogEditArticle
          :item="item"
          @save-changes="saveChangesInEditPage"
          :showDialog="showDialogeditArticle"
          @toggle-showDialogeditArticle="toggleShowDialogeditArticle"
        ></DialogEditArticle>
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
    ["shoppingList"]: Array,
    ["item"]: Object
  },
  components: {
    DialogEditArticle
  },
  data() {
    return {
      submittedItem: "",
      showDialogeditArticle: false,

      completedPurchase: false,
      currentItemForCashingUp: {},
    };
  },
  computed: {
    // Wählt einzig die aktiven Items aus der ShoppingList aus, um diese anzuzeigen
    openItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === 0;
      });
    },
    pendingItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === status;
      });
    },
    billedItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function(value) {
        return value.status === 99;
      });
    }
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

    toggleShowDialogeditArticle(newState) {
      if (this.debug) console.log("old state: " + this.showDialogeditArticle);
      this.showDialogeditArticle = newState;
      if (this.debug) console.log("new state: " + this.showDialogeditArticle);
    },

    saveChangesInEditPage(item, changeData, keepAlive) {
      if (keepAlive) {
        item.name = changeData.name;
      } else {
        const position = this.shoppingList.indexOf(item);
        console.log(position);
        this.shoppingList.splice(position, 1);
      }
      item.showDialogeditArticle = false;
    },

    openDialogSplit(item) {
      this.$emit("open-Dialog-Add-Article", item);
    },
    addItem() {
      this.shoppingList.push({
        name: this.submittedItem,
        status: 0,
        showEditDialog: false
      });
      this.submittedItem = "";
    },

    // Should be an option if item is edited!
    removeItem(index) {
      this.shoppingList.splice(index, 1);
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