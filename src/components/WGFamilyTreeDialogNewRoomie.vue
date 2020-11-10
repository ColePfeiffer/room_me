<template>
  <div>
    <v-dialog v-model="showDialogCashUp" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Add your bought supplies here</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-2">
                <v-text-field
                  v-model="newPurchase.name"
                  sm="12"
                  m="12"
                  label="Product"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  color="#FF6F00"
                ></v-text-field>
                <v-text-field
                  v-model="newPurchase.price"
                  :rules="[numberRule]"
                  sm="6"
                  m="6"
                  :counter="5"
                  label="Price"
                  prepend-icon="euro"
                  color="#FF6F00"
                ></v-text-field>
              </v-row>
              <v-text-field
                v-model="newPurchase.comment"
                class="mx-2"
                label="Comment"
                placeholder="Add an optional comment about this product."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Roomie Chip -->
          <v-chip-group column multiple active-class="primary--text">
            <v-row class="mx-2" v-for="roomie in roomies" :key="roomie.id">
              <v-chip
                :color="roomie.color"
                :outlined="roomieChipOutlined(roomie)"
                @click="selectRoomie(roomie)"
              >
                <v-avatar left>
                  <v-img v-bind:src="roomie.profilePicture"></v-img>
                </v-avatar>
                <strong>{{ roomie.username }}</strong>&nbsp;
              </v-chip>
            </v-row>
          </v-chip-group>

          <v-row class="justify-center">
            <v-btn color="primary" @click="closeDialog">Close</v-btn>
            <v-btn color="#FF6F00" justify-center @click="addPurchase">Split!</v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PurchasingDialogCashUp",
  emits: ["toggle-dialogCashUp", "reset-newPurchase"],
  props: {
    showDialogCashUp: Boolean,
    ["roomies"]: Array,
    newPurchase: Object
  },
  data() {
    return {
      localShowDialog: this.showDialogCashUp,
      // Regex for Pricerange:
      numberRule: v => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return "Number has to be between 0 and 999";
      }
    };
  },
  methods: {
    selectRoomie(selected_roomie) {
      this.roomies.forEach(function(roomie, index) {
        if (roomie == selected_roomie) {
          roomie.selected = !roomie.selected;
          console.log(roomie.selected, index);
        }
      });
    },
    roomieChipOutlined(roomie) {
      if (roomie.selected) {
        return false;
      } else {
        return true;
      }
    },
    closeDialog() {
      this.localShowDialog = false;
      this.$emit("toggle-dialogCashUp", false);
      this.$emit("reset-newPurchase");
      // reset displayed data to roomies data
    },
    addPurchase() {
      //let vn = this;

      if (this.debug) console.log("Preis: " + this.newPurchase.price);

      // hide dialoge
      this.localShowDialog = false;
      this.$emit("toggle-dialogCashUp", false);
      this.$emit("reset-newPurchase");

      /*
      var sharedByNumber = 0;
      // var buyer
      var individualPrice;

      // count selected roomies to determine divider
      this.roomies.forEach(function(roomie) {
        if (roomie.selected) {
          sharedByNumber = sharedByNumber + 1;
        }
      });

      // calculate individual price
      if (this.debug === true) console.log("Divided by", sharedByNumber);
      individualPrice = this.newPurchase.price / sharedByNumber;
      individualPrice = individualPrice.toFixed(2);
      if (this.debug === true)
        console.log("Individual Price: ", individualPrice);

    
      this.roomies.forEach(function(roomie) {
        if (roomie.selected) {
          roomie.balance = parseInt(roomie.balance) + individualPrice;
          if (vn.this.debug) console.log(roomie.balance);
        }
      });
      */
      // checks if this dialog was opened via the cash up-option

      if (this.completedPurchase === false) {
        this.openItems.forEach(element => {
          if (element === this.currentItemForCashingUp) {
            element.acceptedBy = this.currentUser.username;
            element.boughtBy = this.currentUser.username;
            if (this.debug) console.log(this.currentUser.username);
            element.status = 2;
          }
        });
      }

      // reset everything
      this.roomies.forEach(function(roomie) {
        roomie.selected = true;
      });

      this.newPurchase.name = "";
      this.newPurchase.price = "";
      this.newPurchase.comment = "";

      if (this.debug) console.log("Split!");
      this.completedPurchase = true;
    }
  }
};
</script>