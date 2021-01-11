<template>
  <div>
    <v-dialog :value="showDialog" persistent width="550">
      <v-card :dark="isDark" class="removeScrollbar">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ dialogTitle }}</h3>
          </v-card-title>

          <v-container>
           <slot name="content"></slot>
          </v-container>

          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn color="pink" :disabled="!valid" @click="confirmPressed()">{{
                  confirmBtnText
                }}</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn v-if="showCancel" color="gray" @click="cancelPressed()">{{
                  closeBtnText
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["confirm-pressed", "cancel-pressed"],
  props: {
    showDialog: Boolean,
    showCancel: Boolean,
    isDark: Boolean,
    dialogTitle: String,
    confirmBtnText: String,
    closeBtnText: String
  },
  data() {
    return {
   valid: false,
    };
  },
  methods: {
    confirmPressed(){
       this.$emit("confirm-pressed");
    },
    cancelPressed(){
       this.$emit("cancel-pressed");
    },
  }
};
</script>

<style scoped>

</style>