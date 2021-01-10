<template>
  <v-dialog :value="showDialog" persistent width="500">
    <v-card>
      <!-- FOR NEW ITEMS, States: CASH + NEW -->
      <v-form
        ref="form"
        v-model="isValid"
        lazy-validation
        v-if="view === 'CASH' || view === 'NEW'"
      >
        <v-container>
          <!-- Title -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{
                  view === "NEW" ? "Add to shopping list" : "Bought something?"
                }}
              </h3>
            </div>
          </v-card-title>

          <v-card-text>
            <!-- Name and price for CASH View -->
            <v-row v-if="view === 'CASH'">
              <v-col cols="6">
                <v-text-field
                  v-model="newArticle.name"
                  label="Name"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  :color="color"
                  :rules="[rules.required, rules.minChars]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="newArticle.price"
                  :rules="[rules.numberRule, rules.required]"
                  :counter="5"
                  label="Price"
                  prepend-icon="euro"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Name and Category for NEW View -->
            <v-row v-else>
              <v-col cols="6">
                <v-text-field
                  v-model="newArticle.name"
                  label="Name"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  :color="color"
                  :rules="[rules.required, rules.minChars]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="categories"
                  v-model="newArticle.category"
                  :color="color"
                  name="categorySelection"
                  item-text="name"
                  item-value="id"
                  label="Select category"
                  prepend-icon="mdi-square-outline"
                ></v-select>
              </v-col>
            </v-row>
            <!-- Categories and Comment-Section for CASH View -->
            <v-row v-if="view === 'CASH'">
              <v-col>
                <v-select
                  :items="categories"
                  v-model="newArticle.category"
                  :color="color"
                  name="categorySelection"
                  item-text="name"
                  item-value="id"
                  label="Select category"
                  prepend-icon="mdi-square-outline"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="newArticle.comment"
                  class="mx-2"
                  label="Comment"
                  prepend-icon="comment"
                  color="#FF6F00"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Comment-Section for NEW View -->
            <v-row v-else>
              <v-col cols="12">
                <v-text-field
                  v-model="newArticle.comment"
                  class="mx-2"
                  label="Comment"
                  prepend-icon="comment"
                  color="#FF6F00"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Roomie Chips -->
            <v-row v-if="view === 'CASH'">
              <v-col>
                <fieldset style="text-align: center">
                  <legend style="padding: 10px; text-align: center">
                    <p class="text--secondary">Who did you buy it for?</p>
                  </legend>
                  <v-chip-group column multiple active-class="primary--text">
                    <v-row
                      class="mx-2"
                      v-for="roomie in $store.state.roomies"
                      :key="roomie.id"
                    >
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
                </fieldset>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <!-- Buttons -->
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn color="pink" :disabled="!isValid" @click="addPurchase">{{
                  view === "NEW" ? "Add to list" : "Split Costs"
                }}</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="gray" @click="closeDialog">Close</v-btn>
              </v-col>
            </v-row></v-card-actions
          >
        </v-container>
      </v-form>

      <!-- FOR EXISTING ITEMS, States: CASH_UP_EXISTING -->
      <v-form
        ref="form"
        v-model="isValid"
        lazy-validation
        v-else-if="view === 'CASH_UP_EXISTING'"
      >
        <v-container>
          <!-- Title -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Adding a new article</h3>
            </div>
          </v-card-title>

          <v-card-text>
            <!-- Name and price for CASH View -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="existingArticle.name"
                  label="Name"
                  :counter="15"
                  prepend-icon="add_shopping_cart"
                  :color="color"
                  :rules="[rules.required, rules.minChars]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="existingArticle.price"
                  :rules="[rules.numberRule, rules.required]"
                  :counter="5"
                  label="Price"
                  prepend-icon="euro"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Categories and Comment-Section for CASH View -->
            <v-row>
              <v-col>
                <v-select
                  :items="categories"
                  v-model="existingArticle.category"
                  :color="color"
                  name="categorySelection"
                  item-text="name"
                  item-value="id"
                  label="Select category"
                  prepend-icon="mdi-square-outline"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="existingArticle.comment"
                  class="mx-2"
                  label="Comment"
                  prepend-icon="comment"
                  color="#FF6F00"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Roomie Chips -->
            <v-row>
              <v-col>
                <fieldset style="text-align: center">
                  <legend style="padding: 10px; text-align: center">
                    <p class="text--secondary">Who did you buy it for?</p>
                  </legend>
                  <v-chip-group column multiple active-class="primary--text">
                    <v-row
                      class="mx-2"
                      v-for="roomie in $store.state.roomies"
                      :key="roomie.id"
                    >
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
                </fieldset>
              </v-col>
            </v-row>

            <!-- Buttons -->
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn
                  color="pink"
                  :disabled="!isValid"
                  @click="cashUpExistingArticle"
                  >Split Costs</v-btn
                >
              </v-col>
              <v-col cols="4">
                <v-btn color="gray" @click="closeDialog">Close</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogAddArticle",
  emits: ["toggle-Dialog", "add-Article"],
  props: {
    showDialog: Boolean,
    view: String, // CASH, NEW, CASH_UP_EXISTING
    categories: Array,
    existingArticle: Object, // for cashing up existing items
  },
  data() {
    return {
      debug: true,
      isValid: true,
      color: "#FF6F00", //dialogColor

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
        involvedRoomies: [],
        status: 0,
      },

      rules: {
        required: (value) => !!value || "Required.",
        numberRule: (v) => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
          return "Number has to be between 0 and 999";
        },
        minChars: (v) => (v && v.length >= 2) || "Name can't be empty",
      },
    };
  },
  methods: {
    selectRoomie(selected_roomie) {
      this.$store.state.roomies.forEach(function (roomie) {
        if (roomie == selected_roomie) {
          roomie.selected = !roomie.selected;
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
      this.$emit("toggle-Dialog", false);

      // reset everything
      this.$store.state.roomies.forEach(function (roomie) {
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
        involvedRoomies: [],
        status: 0,
      };
    },
    cashUpExistingArticle() {
      if (this.$refs.form.validate()) {
        this.setCategory(this.existingArticle);
        this.splitCosts(this.existingArticle);
        this.$emit("change-Status-Of-Article", {
          article: this.existingArticle,
          status: 2,
        });
      }

      this.closeDialog();
    },
    addPurchase() {
      // checks if all required fields are filled out correctly, if so returns true
      if (this.$refs.form.validate()) {
        if (this.view === "NEW") {
          // NEW_ARTICLE VIEW
          this.setCategory(this.newArticle);
          this.$emit("add-Article", { newArticle: this.newArticle, status: 0 });
        } else {
          // SPLIT COSTS VIEW
          this.splitCosts(this.newArticle);
          this.setCategory(this.newArticle);
          this.$emit("add-Article", { newArticle: this.newArticle, status: 2 });
        }

        this.closeDialog();
      } else {
        if (this.$store.state.debug) console.log("Missing data.");
      }
    },

    splitCosts(article) {
      // create list of involved roomies
      article.involvedRoomies = [];
      for (let i = 0; i < this.$store.state.roomies.length; i++) {
        if (this.$store.state.roomies[i].selected) {
          article.involvedRoomies.push(this.$store.state.roomies[i]);
        }
      }

      let price = parseFloat(article.price);
      if (this.$store.state.debug) console.log("Total Cost: " + price);

      // Calculating the price each roomie involved has to pay
      let priceEach = parseFloat(
        (price / article.involvedRoomies.length).toFixed(2)
      );
      if (this.$store.state.debug) console.log("Individual Price: ", priceEach);

      // Calculating the new balance for the current user and all involved roomies
      this.$store.getters.currentUser.balance = parseFloat(
        this.$store.getters.currentUser.balance + price
      );

      for (let i = 0; i < article.involvedRoomies.length; i++) {
        article.involvedRoomies[i].balance =
          article.involvedRoomies[i].balance - priceEach;
      }
    },

    setCategory(article) {
      // in case no category was picked, the default category will be chosen
      if (article.category === "") {
        let defaultCat = this.categories.find((cat) => cat.isDefault === true);
        article.category = defaultCat.id;
        article.avatar = defaultCat.avatar;
      } else {
        const category = this.categories.find(
          (cat) => cat.id === article.category
        );
        article.avatar = category.avatar;
      }
    },
  },
};
</script>

<style scoped>
.fieldset {
  color: red;
}

.v-col {
  padding: 0px !important;
}
</style>