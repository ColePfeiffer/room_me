<template>
  <v-col xs="12" sm="6" md="3">
    <v-tabs centered color="cyan" dark icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        <v-icon color="pink">mdi-heart</v-icon>
        <span class="mb-2">Pending</span>
      </v-tab>

      <v-tab href="#tab-2">
        Done
        <v-icon color="green">euro</v-icon>
      </v-tab>

      <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
        <v-card flat>
          <div v-if="i == 1">
            <div v-if="pendingItems.length === 0">
              <v-card-text> No items pending yet.</v-card-text>
            </div>
            <div v-else>
            <v-card-text v-for="item in pendingItems" :key="item.article">
              {{ item.article }} accepted by: {{ item.acceptedBy }}
            </v-card-text>
            </div>
          </div>
          <div v-if="i == 2">
          <div v-if="doneItems.length === 0">
              <v-card-text> No items done yet.</v-card-text>
            </div>
            <div v-else>
            <v-card-text v-for="item in doneItems" :key="item.article">
              {{ item.article }} bought by: {{ item.boughtBy }}
            </v-card-text>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>

<script>
export default {
  name: "PurchasingTabs",
  emits: [],
  props: {
    ["shoppingList"]: Array,
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

<style></style>
