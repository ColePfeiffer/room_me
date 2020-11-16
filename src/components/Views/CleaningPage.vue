<template>
  <v-main>
    <div class="cleaning">
      <!--The event container with padding of 15-->
      <v-row class="fill-height pa-15">
        <v-col cols="9">
          <CleaningCalendar></CleaningCalendar>
        </v-col>
        <v-col cols="3">
          <CleaningTabs :currentUser="currentUser" :taskList="taskList"></CleaningTabs>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import CleaningCalendar from "../CleaningCalendar";
import CleaningTabs from "../CleaningTabs";

export default {
  components: {
    CleaningCalendar,
    CleaningTabs
  },
  methods: {},
  data() {
    return {
      currentUser: {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        balance: +3,
        balancePlus: true,
        selected: true,
        color: "#1F85DE"
      },
      taskList: [
        {
          id: 1,
          title: "Küche putzen",
          description: "Küche muss geschrubbat werdn.",
          endDate: "22.10.20",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],
          color: "#315458"
        },
            {
          id: 1,
          title: "Küche putzen",
          description: "KHallo... ksksk dkdkd",
          endDate: "22.10.20",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],
          color: "#315458",
        },
        {
          id: 5,
          title: "Müll rausbringen",
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
          endDate: "",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],
          color: "#315458"
        }
      ]
    };
  }
};
</script>