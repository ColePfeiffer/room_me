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
        <v-card flat v-for="item in shoppingList" :key="item.article">
          <v-card-text>
            {{ item.article }} accepted by: {{ item.acceptedBy }}
            {{ pendingItems }} pendingItems
          </v-card-text>
          <v-card-text v-if="item.status === 2">{{ item.article }} bought by: {{ item.boughtBy }}</v-card-text>
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
    ["shoppingList"]: Array
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
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>