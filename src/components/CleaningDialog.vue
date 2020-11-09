<template>
  <div>
    <v-dialog v-model="showDialogTaskManager" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Check your task</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row>
            <v-col>
              <v-row class="mx-2">
                <v-text-field
              
                  sm="12"
                  m="12"
                  label="Product"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  color="#FF6F00"
                ></v-text-field>

                <v-text-field
      
           
                  sm="6"
                  m="6"
                  :counter="5"
                  label="Price"
                  prepend-icon="euro"
                  color="#FF6F00"
                ></v-text-field>
              </v-row>
              <v-text-field
            
                class="mx-2"
                label="Comment"
                placeholder="Add an optional comment about this product."
                prepend-icon="comment"
                color="#FF6F00"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-btn color="primary" @click="closeDialog">Close</v-btn>
            <v-btn color="#FF6F00" justify-center @click="addPurchase"
              >Split!</v-btn
            >
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


export default {
  name: "CleaningDialog",
  //name: "PurchasingDialogCashUp",
  emits: ["toggle-dialogTaskManager"],

  props: {
    showDialogTaskManager: Boolean,
    ["roomies"]: Array,
    ["taskList"]: Object,
    //newPurchase: Object
  },
  data() {
    return {
      // Show Dialog:
      localShowDialog: this.showDialogTaskManager,
      // Current User that chooses Task:
      currentUser: {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        balance: +3,
        balancePlus: true,
        selected: true,
        color: "#1F85DE",
      },
    };
  },
  methods: {
    closeDialog() {
      this.localShowDialog = false;
      this.$emit("toggle-dialogTaskManager", false);
    //  this.$emit("reset-newPurchase");
      // reset displayed data to roomies data
    },
    addPurchase() {
      //let vn = this;

      if (this.debug) console.log("Preis: " + this.newPurchase.price);

      // hide dialoge
      this.localShowDialog = false;
      this.$emit("toggle-dialogTaskManager", false);
     // this.$emit("reset-newPurchase");

   
      // checks if this dialog was opened via the cash up-option

      if (this.completedPurchase === false) {
        this.openItems.forEach((element) => {
          if (element === this.currentItemForCashingUp) {
            element.acceptedBy = this.currentUser.username;
            element.boughtBy = this.currentUser.username;
            if (this.debug) console.log(this.currentUser.username);
            element.status = 2;
          }
        });
      }

      // reset everything
      this.roomies.forEach(function (roomie) {
        roomie.selected = true;
      });

      this.newPurchase.name = "";
      this.newPurchase.price = "";
      this.newPurchase.comment = "";

      if (this.debug) console.log("Split!");
      this.completedPurchase = true;
    },
  },
};
</script>