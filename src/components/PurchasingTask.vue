<template>
  <!--Card on the right!, background: orange -->

  <v-row dense class="paddingCards">
    <!--Cards for shopping list:-->
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
              <v-card-text class="stylingTextHeadline"
                >{{ item.article }}
              </v-card-text>
            </v-col>
          </v-row>
          <div class="padding15">
            <label class="stylingTextSubtitle">
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
          <PurchasingDialogEditItem
            :item="item"
            @save-changes="saveChangesInEditPage"
            :showDialog="showDialogEditItem"
            @toggle-showDialogEditItem="toggleShowDialogEditItem"
          ></PurchasingDialogEditItem>
          <div v-if="item.status === 0">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text>
                  <v-icon @click="acceptItem(item)">mdi-check</v-icon>
                </v-btn>
                <v-btn text>
                  <v-icon @click="toggleShowDialogCashUp(true)">euro</v-icon>
                </v-btn>
                <v-btn text>
                  <v-icon @click="toggleShowDialogEditItem(true)">edit</v-icon>
                </v-btn>
              </v-col>
            </v-card-actions>
          </div>
          <div v-if="item.status === 1">
            <v-card-actions>
              <v-col class="text-right">
                <v-btn text>
                  <v-icon @click="cashUpItem(item)">euro</v-icon>
                </v-btn>
                <v-btn text>
                  <v-icon @click="toggleShowDialogEditItem(true)">edit</v-icon>
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
import PurchasingDialogEditItem from "./PurchasingDialogEditItem";

export default {
  name: "PurchasingTask",
  emits: [
    "set-newPurchaseName",
    "toggle-dialogCashUp",
    "save-changesInEditPage",
  ],
  props: {
    ["currentUser"]: Object,
    ["shoppingList"]: Array,
    ["item"]: Object,
  },
  components: {
    PurchasingDialogEditItem,
  },
  data() {
    return {
      submittedItem: "",
      showDialogEditItem: false,
      completedPurchase: false,
      currentItemForCashingUp: {},
    
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
          isLoggedIn: true,
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
          isLoggedIn: false,
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
          isLoggedIn: false,
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
          isLoggedIn: false,
        },
      ],
    };
  },
  computed: {
    // Wählt einzig die aktiven Items aus der ShoppingList aus, um diese anzuzeigen
    openItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function (value) {
        return value.status === 0;
      });
    },
    pendingItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function (value) {
        return value.status === status;
      });
    },
    billedItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function (value) {
        return value.status === 99;
      });
    },
  },
  methods: {
    acceptItem(item) {
      this.item.status = 1;
      console.log("itemhier" + this.item.article);
      console.log("itemhier" + this.item.status);
      console.log(item);
    },
    toggleShowDialogCashUp(newState) {
      if (this.debug) console.log("old state: " + this.showDialogCashUp);
      this.showDialogCashUp = newState;
      if (this.debug) console.log("new state: " + this.showDialogCashUp);
    },
    toggleShowDialogEditItem(newState) {
      if (this.debug) console.log("old state: " + this.showDialogEditItem);
      this.showDialogEditItem = newState;
      if (this.debug) console.log("new state: " + this.showDialogEditItem);
    },
    resetNewPurchase() {
      this.newPurchase = {
        name: "",
        price: "",
        comment: "",
      };
    },
    setNewPurchaseName(name) {
      this.newPurchase.name = name;
    },

    saveChangesInEditPage(item, changeData, keepAlive) {
      if (keepAlive) {
        item.article = changeData.article;
      } else {
        const position = this.shoppingList.indexOf(item);
        console.log(position);
        this.shoppingList.splice(position, 1);
      }
      item.showDialogEditItem = false;
    },

    cashUpItem(item) {
      this.completedPurchase = false;
      this.$emit("set-newPurchaseName", item.article);
      this.$emit("toggle-dialogCashUp", true);
      this.currentItemForCashingUp = item;
    },
    addItem() {
      this.shoppingList.push({
        article: this.submittedItem,
        status: 0,
        showEditDialog: false,
      });
      this.submittedItem = "";
    },

    // Should be an option if item is edited!
    removeItem(index) {
      this.shoppingList.splice(index, 1);
      // beim Aufrufen IN DEM CLICK EVENT!!
      // v-for="(goal, index) in goals @click="removeGoal(index)"
    },
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
.padding15 {
  padding-left: 15px;
}

</style>