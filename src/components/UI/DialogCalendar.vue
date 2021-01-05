    <template>
  <!-- Calender Dialog -->
  <v-dialog :value="showDialog" persistent max-width="290">
    <v-card class="removeScrollbar">
      <v-row no-gutters>
        <v-col>
          <v-date-picker v-model="localDate" color="pink"></v-date-picker>
        </v-col>
      </v-row>
      <v-card-text>{{vCardText}}</v-card-text>
      <v-card-actions>
        <v-row justify="space-around">
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <v-btn color="pink" text @click="setDate()">Save</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn text @click="toggleCalendar()">Close</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogCalendar",
  emits: ["toggle-visibility", "set-date"],
  props: {
    showDialog: Boolean,
    initialDate: String,
    vCardText: String
  },
  data() {
    return {
      color: "#FF6F00",
      localDate: this.initialDate
    };
  },
  methods: {
    setDate() {
      this.$emit("set-date", this.localDate);
    },
    toggleCalendar() {
      this.$emit("toggle-visibility");
      this.reset();
    },
    reset() {
      this.localDate = this.initialDate;
    }
  }
};
</script>