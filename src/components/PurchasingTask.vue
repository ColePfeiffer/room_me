<template>
  <!--Card on the right!, background: orange -->

  <v-row dense class="card">
    <!--Cards for shopping list:-->
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
              <v-card-text class="stylingTextHeadline"
                >{{ item.article }}
                <v-btn text>
                  <v-icon @click="toggleShowDialogEditItem(true)">edit</v-icon>
                </v-btn>
                <v-row>
                 <v-card-text class="stylingTextSubtitle">
                {{ item.description }}
              </v-card-text>
                </v-row>
              </v-card-text>
              </v-col
            ><v-col> </v-col> </v-col
          ><v-col>
            <v-row>
              <v-card-text class="stylingDate">
                {{ item.createdOn }}
              </v-card-text>

              <v-row>
                <div v-if="item.status === 0">
                  <v-card-actions>
                    <v-col class="text-right">
                      <v-btn text>
                        <v-icon @click="acceptItem(item)">mdi-check</v-icon>
                      </v-btn>
                      <v-btn text>
                        <v-icon @click="toggleShowDialogCashUp(true)"
                          >euro</v-icon
                        >
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
                      <v-btn text>
                        <v-icon @click="cashUpItem(item)">euro</v-icon>
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
      showDialogCashUp: false,
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
      this.item.acceptedBy = this.currentUser.username;
      this.item.avatar = this.currentUser.profilePicture;
      console.log("itemhier" + this.item.article);
      console.log("itemhier" + this.item.status);
      console.log(item);
    },

    toggleShowDialogEditItem(newState) {
      if (this.debug) console.log("old state: " + this.showDialogEditItem);
      this.showDialogEditItem = newState;
      if (this.debug) console.log("new state: " + this.showDialogEditItem);
    },
    toggleShowDialogCashUp(newState) {
      if (this.debug) console.log("old state: " + this.showDialogCashUp);
      this.showDialogCashUp = newState;
      if (this.debug) console.log("new state: " + this.showDialogCashUp);
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
      console.log("chellas");
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