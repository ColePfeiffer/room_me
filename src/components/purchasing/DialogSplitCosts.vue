<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2"
          >Add your bought supplies here</v-card-title
        >
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-2">
                <v-text-field
                  v-model="newArticle.name"
                  sm="12"
                  m="12"
                  label="Product"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  color="#FF6F00"
                ></v-text-field>
                <v-text-field
                  v-model="newArticle.price"
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
                v-model="newArticle.comment"
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
                <strong>{{ roomie.username }}</strong
                >&nbsp;
              </v-chip>
            </v-row>
          </v-chip-group>
          <br />
          <v-row justify="space-around">
            <v-btn color="pink" @click="addPurchase">Split</v-btn>
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogSplitCosts",
  emits: ["show-Dialog-Split", "reset-newPurchase", "add-Article"],
  props: {
    showDialog: Boolean,
    ["roomies"]: Array,
    currentUser: Object,
  },
  data() {
    return {
      newArticle: {
        name: " ",
        price: "",
        comment: "",
        createdOn: "",
        createdBy: "", // ref or id
        acceptedBy: "", // ref or id
        purchasedBy: "", // ref or id
        avatar: "",
        category: "",
        status: 0,
      },
      debug: true,

      // Regex for Pricerange:
      numberRule: (v) => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return "Number has to be between 0 and 999";
      },
    };
  },
  methods: {
    selectRoomie(selected_roomie) {
      this.roomies.forEach(function (roomie, index) {
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
      this.$emit("show-Dialog-Split", false);
      this.$emit("reset-newPurchase");

      // reset everything
      this.roomies.forEach(function (roomie) {
        roomie.selected = true;
      });

      this.newArticle = {
        name: " ",
        price: "",
        comment: "",
        createdOn: "",
        createdBy: "", // ref or id
        acceptedBy: "", // ref or id
        purchasedBy: "", // ref or id
        avatar: "",
        category: "",
        status: 0,
      };
    },
    addPurchase() {
      this.splitCosts();
      this.$emit("add-Article", { newArticle: this.newArticle, status: 2 });

      /*
        this.openItems.forEach((element) => {
          if (element === this.currentItemForCashingUp) {
            element.acceptedBy = this.currentUser.username;
            element.boughtBy = this.currentUser.username;
            if (this.debug) console.log(this.currentUser.username);
            element.status = 2;
          }
        });*/

      this.closeDialog();
      if (this.debug) console.log("Split complete!");
    },

    splitCosts() {
      // create list of involved roomies
      let involvedRoomies = [];
      for (let i = 0; i < this.roomies.length; i++) {
        if (this.roomies[i].selected) {
          involvedRoomies.push(this.roomies[i]);
        }
      }

      let price = parseFloat(this.newArticle.price);
      if (this.debug) console.log("Total Cost: " + price);

      // Calculating price each roomie involved has to pay
      let priceEach = parseFloat((price / involvedRoomies.length).toFixed(2));
      if (this.debug) console.log("Individual Price: ", priceEach);

      // Calculating the new balance
      this.currentUser.balance = parseFloat(this.currentUser.balance + price);

      for (let i = 0; i < involvedRoomies.length; i++) {
        involvedRoomies[i].balance = involvedRoomies[i].balance - priceEach;
      }
    },
  },
};
</script>