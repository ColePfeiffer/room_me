<template>
  <div>
    <DialogCalendar
      :showDialog="showDialogCalendar"
      :initialDate="dateInCalendar"
      :vCardText="'When did you finish your task? Select the date and hit save.'"
      @toggle-visibility="toggleCalendar"
      @set-date="setDate"
    ></DialogCalendar>

    <v-dialog :value="showDialog" persistent width="500">
      <v-card class="removeScrollbar">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">You did it? Great!</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <!-- Name -->
              <v-text-field
                :value="task.name"
                label="Task"
                sm="6"
                m="6"
                prepend-icon="mdi-broom"
                :color="color"
                maxlength="15"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <!-- End Date -->
              <v-text-field
                :value="currentDate"
                label="Completed On"
                prepend-icon="mdi-calendar"
                @click="toggleCalendar"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Comment -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="task.comment"
                label="Comment"
                placeholder="Being late? Did extra? Leave a note."
                prepend-icon="comment"
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around">
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn color="pink" @click="checkOffTask">Check off</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DialogCalendar from "../UI/DialogCalendar";

export default {
  name: "CleaningDialog",
  emits: ["toggle-visibility"],
  props: {
    showDialog: Boolean,
    task: Object
  },
  components: {
    DialogCalendar
  },
  data() {
    return {
      color: "#FF6F00", //dialogColor
      showDialogCalendar: false,
      dateInCalendar: "",
      currentDate: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    checkOffTask() {
      this.task.status = 3;
      this.task.completedOn = this.currentDate;
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("toggle-visibility");
      this.reset();
    },
    reset() {
      this.comment = "";
      this.currentDate = new Date().toISOString().substr(0, 10);
    },
    // Calendar Functions
    setDate(newDate) {
      this.currentDate = newDate;
      this.toggleCalendar();
    },
    toggleCalendar() {
      this.showDialogCalendar = !this.showDialogCalendar;
    }
  }
};
</script>

<style scoped>
.labelStyling {
  font-size: 1.2rem;
}
</style>