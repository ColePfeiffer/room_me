<template>
  <v-col xs="12" sm="6" md="6" >
    <v-tabs centered color="cyan" dark icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        <span class="mb-2">Open</span>
        <v-icon color="pink">mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        <span class="mb-2">Pending</span>
        <v-icon color="pink">mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Done
        <v-icon color="green">euro</v-icon>
      </v-tab>

      <v-tab-item
        class="someStyling"
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <!--If list is empty: -->
        <div v-if="i == 1">
          <div v-if="openItems.length === 0">
            <v-card class="purchasingCards">
              <v-col class="">
                <v-card-text class="stylingTextHeadline"
                  >No items added yet.
                </v-card-text>

                <div class="padding15">
                  <label class="stylingTextSubtitle">
                    Click on button in the right corner to add a new item.
                  </label>
                </div>
              </v-col>
            </v-card>
          </div>

          <div v-else>
            <div v-for="item in openItems" :key="item.id">
              <PurchasingTask
                :item="item"
                :currentUser="currentUser"
                :shoppingList="shoppingList"
              ></PurchasingTask>
            </div>
          </div>
        </div>

        <div v-if="i == 2">
          <div v-if="pendingItems.length === 0">
            <v-card class="purchasingCards">
              <v-col class="">
                <v-card-text class="stylingTextHeadline"
                  >No pending items yet.
                                  </v-card-text>

                <div class="padding15">
                  <label class="stylingTextSubtitle">
                    Accept open item and see the pending items card.
                  </label>
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-for="item in pendingItems" :key="item.id">
            <PurchasingTask
              :item="item"
              :currentUser="currentUser"
              :shoppingList="shoppingList"
            ></PurchasingTask>
          </div>
        </div>

        <div v-if="i == 3">
          <div v-if="doneItems.length === 0">
            <v-card class="purchasingCards">
              <v-col class="">
                <v-card-text class="stylingTextHeadline"
                  >No items bought yet.
                </v-card-text>

                <div class="padding15">
                  <label class="stylingTextSubtitle">
                    Split an item and see the item inside this card.
                  </label>
                </div>
              </v-col>
            </v-card>
          </div>
          <div v-for="item in doneItems" :key="item.id">
            <PurchasingTask
              :item="item"
              :currentUser="currentUser"
              :shoppingList="shoppingList"
            ></PurchasingTask>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>

<script>
import PurchasingTask from "./PurchasingTask";

export default {
  name: "PurchasingTabs",
  emits: [],
  props: {
    ["shoppingList"]: Array,
    ["currentUser"]: Object,
    ["item"]: Object,
  },
  components: {
    PurchasingTask,
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
        return value.status === 1;
      });
    },
    doneItems() {
      // Javascript-Funktion zum Filtern von Arrays
      return this.shoppingList.filter(function (value) {
        return value.status === 2;
      });
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.purchasingCards {
  width: 100%;
}
.padding15 {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
}
.stylingTextHeadline {
  font-size: 1.2rem;
}
.stylingTextSubtitle {
  font-size: 1rem;
}
</style>

