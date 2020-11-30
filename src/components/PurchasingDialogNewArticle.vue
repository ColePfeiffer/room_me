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

            <v-text-field
              v-model="comment"
              label="Comment"
              placeholder="Write a note or just a comment."
              prepend-icon="comment"
              color="#FF6F00"
            ></v-text-field>
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
    };
  },
  methods: {
    addNewItem() {
      // Für Task Vorweg 50
      // this.item.id = LatestId + 1
      console.log("Iwas??");
      this.shoppingList.push({
        // id needs to be generated somehow.
        // id: this.id,
        article: this.itemTitle,
        comment: this.comment,
        description: this.itemDescription,
        articleCreator: this.currentUser.username,
        status: 0,
      });
      this.$emit("saveNewItem", this.item);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-showDialogNewArticle", false);
      this.comment = "";
      this.article = "";
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