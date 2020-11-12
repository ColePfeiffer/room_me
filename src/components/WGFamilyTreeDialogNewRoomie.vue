<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Add a new roomie</v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "WGFamilyTreeDialogNewRoomie",
  emits: ["toggle-dialogCashUp", "reset-newPurchase"],
  props: {
    showDialog: Boolean
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.localShowDialog = false;
      this.$emit("toggle-dialogCashUp", false);
      this.$emit("reset-newPurchase");
      // reset displayed data to roomies data
    }
  }
};
</script>