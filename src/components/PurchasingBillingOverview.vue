<template>
  <v-col xs="12" sm="6" md="3">
    <v-card class="ma-auto" max-width="344">
      <v-list-item>
        <v-list-item-content>
          <div class="overline">Overview</div>
          <v-list>
            <v-list-item v-for="roomie in roomies" :key="roomie.id">
              <DialogProfilePage :roomie="roomie" @save-changes="saveChangesInProfilePage"></DialogProfilePage>
              <div class="text-center">
                <v-list-item-avatar>
                  <v-img
                    @click="roomie.showProfilePage = true"
                    class="profile-picture"
                    max-width="60"
                    max-height="60"
                    v-bind:src="roomie.profilePicture"
                  ></v-img>
                </v-list-item-avatar>
              </div>
              <!--Übersicht des aktuellen Guthabens-->
              <v-list-item-content>
                <v-list-item-title>{{ roomie.username }}</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    v-if="roomie.balance >= 0"
                    class="balance-plus"
                  >{{ "+" + roomie.balance + currencySymbol }}</span>
                  <span v-else class="balance-minus">{{ roomie.balance + currencySymbol }}</span>
                </v-list-item-subtitle>
                <v-divider class="ma-1" horizontal color="pink"></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
import DialogProfilePage from "./DialogProfilePage";

export default {
  name: "PurchasingBillingOverview",
  emits: [],
  components: {
    DialogProfilePage
  },
  props: {
    ["roomies"]: Array,
    currencySymbol: String,
    newPurchase: Object
  },
  computed: {},
  data() {
    return {
      changeData: {}
    };
  },
  methods: {
    saveChangesInProfilePage(roomie, changeData) {
      roomie.username = changeData.username;
      roomie.description = changeData.description;
      roomie.profilePicture = changeData.profilePicture;
      roomie.color = changeData.color;

      roomie.showProfilePage = false;
    },

    saveChanges() {
      this.$emit("save-changes", this.roomie, this.changeData);
    }
  }
};
</script>

<style>
</style>