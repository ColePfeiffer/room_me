<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="headline">Add new article</v-card-title>
          <v-card-text cols="12" sm="12">
            <v-col cols="12" sm="12">
              <v-row xs="12" sm="6" m="6">
                <!-- Name -->
                <v-text-field
                  v-model="itemTitle"
                  sm="12"
                  m="12"
                  label="Product"
                  :counter="15"
                  :rules="[rules.required]"
                  required
                  prepend-icon="add_shopping_cart"
                  color="#FF6F00"
                ></v-text-field>

                <!-- Created On Date -->
                <v-text-field
                  :value="timestamp"
                  label="Created date"
                  sm="6"
                  m="6"
                  color="pink"
                  prepend-icon="mdi-calendar"
                >
                </v-text-field>

                <!-- Description -->
                <v-text-field
                  v-model="itemDescription"
                  label="Description"
                  sm="6"
                  m="6"
                  :counter="30"
                  :rules="[rules.required]"
                  required
                  prepend-icon="mdi-information"
                  color="#FF6F00"
                >
                </v-text-field>
                <div class="paddingTop">
                  <v-menu v-model="itemCategory" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="pink" dark v-bind="attrs" v-on="on">
                        {{ dropdownTitel }}
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(category, index) in categories"
                        :key="index"
                      >
                        <v-list-item-title @click="selectCategory(category)">{{
                          category.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-row>
              <!-- Description -->
            </v-col>
            <v-row justify="space-around">
              <v-btn color="pink" :disabled="!valid" @click="create"
                >Save</v-btn
              >
              <v-btn color="gray" @click="closeDialog">Close</v-btn>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CleaningDialogNewArticle",
  emits: ["toggle-showDialogNewArticle"],
  props: {
    ["shoppingList"]: Array,
    showDialog: Boolean,
    ["roomies"]: Array,
    currentUser: Object,

    item: Object,
  },
  data() {
    return {
      valid: true,
      timestamp: new Date().toISOString().substr(0, 10),
      dropdownTitel: "Select category",
      submittedItem: "",
      itemTitle: "",
      comment: "",
      itemDescription: "",
      itemCategory: "Select category",
      itemAvatar:
        "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8cXVlc3Rpb24lMjBtYXJrfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
      categories: [
        {
          title: "Groceries",
          avatar:
            "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
        },
        {
          title: "Household",
          avatar:
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW5pbmclMjBjaGVtaWNhbHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
        {
          title: "Snacks",
          avatar:
            "https://images.unsplash.com/photo-1517093602195-b40af9688b46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c25hY2tzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
        {
          title: "Drinks",
          avatar:
            "https://images.unsplash.com/photo-1494962227006-107baac595eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGRyaW5rc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    selectCategory(category) {
      this.dropdownTitel = category.title;
      this.itemCategory = category.title;
      this.itemAvatar = category.avatar;
    },

    addNewItem() {
      // Für Task Vorweg 50
      // this.item.id = LatestId + 1
      console.log("Iwas??");
      this.shoppingList.push({
        // id needs to be generated somehow.
        // id: this.id,
        article: this.itemTitle,
        description: this.itemDescription,
        articleCreator: this.currentUser.username,
        currentUser: this.currentUser.username,
        createdOn: this.timestamp,
        avatar: this.itemAvatar,
        category: this.itemCategory,
        status: 0,
      });
      this.$emit("saveNewItem", this.item);
      this.closeDialog();
    },
    create() {
      // if this returns true, all required fields are filled out
      if (this.$refs.form.validate()) {
        this.addNewItem();
      } else {
        alert("Oh no");
      }
    },

    closeDialog() {
      this.$emit("toggle-showDialogNewArticle", false);
      this.comment = "";
      this.itemTitle = "";
      this.itemDescription = "";
      this.articleCreator = "";
      this.itemAvatar =
        "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8cXVlc3Rpb24lMjBtYXJrfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60";
      this.itemCategory = this.dropdownTitel;
    },
  },
};
</script>
<style scoped>
.paddingTop {
  padding-top: 15px;
  padding-left: 15px;
}
.radioRowStyling {
  padding-left: 18px;
}
.fontStyling {
  font-size: 1rem;
}
.labelStyling {
  font-size: 1.2rem;
}
</style>