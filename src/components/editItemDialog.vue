<template>
  <v-dialog v-model="item.showEditDialog"  max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Item</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :value="item.article"
                persistent-hint
     
                hint="edit name of article here"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                @click="disabled = !disabled"
                color="pink"
                hide-details
              ></v-checkbox>
              <small>Delete this Article?</small>
            </v-col>
            <v-col v-if="disabled === false" cols="12">
              <v-text-field
                v-model="commentBox"
                :disabled="disabled"
                label="Inform your roomies about your latest changing."
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>


        <v-btn color="primary" @click="saveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "editItemDialog",

  props: {
    ["item"]: Object,
  },
  /*{
    'id': Number,
    'username': String,
    'description': String,
    'profilePicture': String,
    'balance': Number,
    'balancePlus': Boolean,
    'selected': Boolean,
    'color': String
  }*/
  computed: {},
  data() {
    return {
      
      disabled: true,
    };
  },
  methods: {
    saveChanges() {
      this.$emit("save-changes", this.item.article);
    },

    changeItemName() {
       
    }
  },
};
</script>

<style></style>





