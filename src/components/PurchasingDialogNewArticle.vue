<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline ighten-2">Add new article</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-col cols="12" sm="12">
            <!-- Name -->
            <v-text-field
              v-model="itemTitle"
              sm="12"
              m="12"
              label="Product"
              :counter="15"
              prepend-icon="add_shopping_cart"
              color="#FF6F00"
            ></v-text-field>

            <!-- Description -->
                 <v-text-field
                v-model="itemDescription"
                label="Description"
                sm="6"
                m="6"
                prepend-icon="mdi-information"
                color="#FF6F00"
              >
              </v-text-field>

            <div class="text-center">
              <v-menu v-model="itemCategory" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Dropdown
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

          
          </v-col>
          <v-row justify="space-around">
            <v-btn color="gray" @click="closeDialog">Close</v-btn>
            <v-btn color="pink" @click="addNewItem" v-model="submittedItem"
              >Save</v-btn
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
      submittedItem: "",
      itemTitle: "",
      comment: "",
      itemDescription: "",
      itemCategory: "",
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
    };
  },
  methods: {
    selectCategory(category) {
      
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
        avatar: this.itemAvatar,
        category: this.itemCategory,
        status: 0,
      });
      this.$emit("saveNewItem", this.item);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-showDialogNewArticle", false);
      this.comment = "";
      this.itemTitle = "";
      this.description = "";
      this.articleCreator = this.currentUser.username;
    },
  },
};
</script>
<style>
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