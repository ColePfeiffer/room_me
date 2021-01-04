<template>
  <v-col xs="12" sm="12" md="9">
    <v-tabs fixed-tabs color="white" dark icons-and-text>
      <v-tabs-slider color="pink"></v-tabs-slider>

      <v-tab href="#tab-1">
        Shopping List
        <v-icon color="pink">mdi-note</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Pending
        <v-icon color="pink">mdi-cart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Done
        <v-icon color="green">mdi-checkbox-multiple-marked-circle</v-icon>
      </v-tab>

      <v-tab-item class="someStyling" v-for="i in 3" :key="i" :value="'tab-' + i">
        <!--If list is empty: -->
        <div v-if="i == 1">
          <div v-if="openItems.length === 0">
            <v-card class="purchasingCards">
              <v-col>
                <v-card-text class="stylingTextHeadline">No items added yet.</v-card-text>

                <div class="padding15">
                  <label
                    class="stylingTextSubtitle"
                  >Click on button in the right corner to add a new item.</label>
                </div>
              </v-col>
            </v-card>
          </div>

          <div v-else>
            <div v-for="item in openItems.reverse()" :key="item.id">
              <PurchasingTask :item="item" @open-Dialog-Add-Article="openDialogAddArticle"></PurchasingTask>
            </div>
          </div>
        </div>

        <div v-if="i == 2">
          <div v-if="pendingItems.length === 0">
            <v-card class="purchasingCards">
              <v-col class>
                <v-card-text class="stylingTextHeadline">No pending items yet.</v-card-text>

                <div class="padding15">
                  <label
                    class="stylingTextSubtitle"
                  >Accept open item and see the pending items card.</label>
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-for="item in pendingItems.reverse()" :key="item.id">
            <PurchasingTask :item="item" @open-Dialog-Add-Article="openDialogAddArticle"></PurchasingTask>
          </div>
        </div>

        <div v-if="i == 3">
          <div v-if="doneItems.length === 0">
            <v-card class="purchasingCards">
              <v-col class>
                <v-card-text class="stylingTextHeadline">No items bought yet.</v-card-text>

                <div class="padding15">
                  <label
                    class="stylingTextSubtitle"
                  >Split an item and see the item inside this card.</label>
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-for="item in doneItems.reverse()" :key="item.id">
            <BoughtCard
              :article="item"
              :currencySymbol="currencySymbol"
              @delete-Article="deleteArticle"
            ></BoughtCard>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>

<script>
import PurchasingTask from "./PurchasingTask";
import BoughtCard from "./BoughtCard";

export default {
  name: "PurchasingTabs",
  emits: ["toggle-dialogCashUp", "delete-article"],
  props: {
    ["item"]: Object,
    ["currencySymbol"]: String
  },
  components: {
    PurchasingTask,
    BoughtCard
  },
  computed: {
    // Wählt einzig die aktiven Items aus der ShoppingList aus, um diese anzuzeigen
    openItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.shoppingList.filter(function(value) {
        return value.status === 0;
      });
    },
    pendingItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.shoppingList.filter(function(value) {
        return value.status === 1;
      });
    },
    doneItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.$store.state.shoppingList.filter(function(value) {
        return value.status === 2;
      });
    }
  },
  data() {
    return {};
  },
  methods: {
    deleteArticle(article) {
      this.$emit("delete-article", article);
    },
    openDialogAddArticle(item) {
      this.$emit("open-Dialog-Add-Article", item);
    }
  }
};
</script>

<style scoped>
.someStyling {
  padding: 10px;
}
.purchasingCards {
  width: 100%;
}
.padding15 {
  padding-left: 15px;
  padding-right: 15px;
}
.stylingTextHeadline {
  font-size: 1.2rem;
}
.stylingTextSubtitle {
  font-size: 1rem;
}
</style>

