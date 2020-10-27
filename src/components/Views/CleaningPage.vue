<template>
  <div class="cleaning">
    <v-row xs="12" sm="12" md="6">
      <!--The event container with padding of 15-->
      <v-row class="fill-height pa-15">
        <CleaningCalendar> </CleaningCalendar>
        <CleaningOverview></CleaningOverview>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import CleaningCalendar from "../CleaningCalendar";
import CleaningOverview from "../CleaningOverview";

export default {
  components: {
    CleaningCalendar,
    CleaningOverview
  },
};
</script>