<template>
  <v-col xs="12" sm="12" md="6">
    <v-card flat class="pa-3">
      <div class="overline">Shopping List</div>

      <draggable
        v-if="false"
        v-model="shoppingList2"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="element in shoppingList2" :key="element.article">{{ element.article }}</div>meh ----
      </draggable>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">name</th>
              <th class="text-left">actions</th>
            </tr>
          </thead>

          <tbody :class="`pl-3 shoppingList ${shoppingList.status}`">
            <tr v-for="item in openItems" :key="item.article">
              <PurchasingDialogEditItem :item="item" @save-changes="saveChangesInEditPage"></PurchasingDialogEditItem>
              <td>{{ item.article }}</td>
              <td>
                <div>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <th class="text-left" v-bind="attrs" v-on="on">
                        <v-btn text>
                          <v-icon @click="acceptItem(item)">mdi-check</v-icon>
                        </v-btn>
                      </th>
                    </template>
                    <span>You are gonna buy this? Awesome!</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <th class="text-left" v-bind="attrs" v-on="on">
                        <v-btn text>
                          <v-icon @click="cashUpItem(item)">euro</v-icon>
                        </v-btn>
                      </th>
                    </template>
                    <span>Already bought this?</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <th class="text-left" v-bind="attrs" v-on="on">
                        <v-btn text>
                          <v-icon @click="item.showEditDialog = true">edit</v-icon>
                        </v-btn>
                      </th>
                    </template>
                    <span>edit/delete</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-container>
        <v-row>
          <v-col md="12" sm="12" xs="12">
            <!--Appears if shoppingList is empty!-->
            <p v-if="openItems.length === 0">No supplies added yet. Please start adding something.</p>
            <v-text-field
              v-on:keydown.enter="addItem"
              v-model="submittedItem"
              label="Want to add something?"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import PurchasingDialogEditItem from "./PurchasingDialogEditItem";
import draggable from "vuedraggable";

export default {
  name: "PurchasingTable",
  emits: ["set-newPurchaseName", "toggle-dialogCashUp"],
  props: {
    ["shoppingList"]: Array,
    currencySymbol: String,
    newPurchase: Object
  },
  components: { PurchasingDialogEditItem, draggable },
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
  data() {
    return {
      // Supply: Item that User enters for shoppingList:
      submittedItem: "",
      completedPurchase: false,
      currentItemForCashingUp: {},
      shoppingList2: [
        {
          article: "Spüli",
          // Status: 0 - offen, 1 - pending,
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Müllsäcke",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Ingwerbröd",
          price: 0,
          status: 0,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Aluhut",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Seife",
          price: 0,
          status: 1,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        },
        {
          article: "Wlan Repeater",
          price: 2.7,
          status: 99,
          acceptedBy: "",
          boughtBy: "",
          declinedBy: []
        }
      ]
    };
  },
  methods: {
    acceptItem(item) {
      /* Status: 0 = offen, 1 = accepted, 2 = bought, 99 = declined */
      item.status = 1;
      item.acceptedBy = this.currentUser.username;
    },

    saveChangesInEditPage(item, changeData) {
      item.article = changeData.article;
      item.showEditDialog = false;
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

<style></style>
