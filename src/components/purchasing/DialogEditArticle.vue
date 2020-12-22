<template>
  <v-dialog v-model="showDialog" persistent max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Edit item</span>
      </v-card-title>
      <v-card-text>
 
          <v-row>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                v-model="changeData.article"
                persistent-hint
                hint="edit name of article here"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-checkbox @click="disabled = !disabled" color="pink" hide-details></v-checkbox>
              <small>Delete this Article?</small>
            </v-col>
            <v-col v-if="disabled === false" cols="12">
              <v-text-field
                v-model="comment"
                :disabled="disabled"
                label="Inform your roomies about your latest changing."
              ></v-text-field>
            </v-col>
          </v-row>
  
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogEditArticle",

  props: {
    ["item"]: Object,
    showDialog: Boolean,
  },
  emits: ["save-changes", "toggle-showDialogEditItem"],
  data() {
    return {
      comment: "",
      changeData: {
        article: this.item.article
      },
      disabled: true
    };
  },
  methods: {
    saveChanges() {
      this.$emit("save-changes", this.item, this.changeData, this.disabled);
      this.closeDialog();
    },
    closeDialog() {
       this.$emit("toggle-showDialogEditItem", false);

      // reset displayed data to item/shoppingList data
      this.changeData.article = this.item.article;
    },
       
  }
};
</script>

<style></style>
