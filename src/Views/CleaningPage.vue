<template>
  <div class="cleaning">
        <v-col  xs="12" sm="9" md="9">
          <CleaningTabs 
          :taskList="taskList"></CleaningTabs>
        </v-col>
  </div>
</template>

<script>
import CleaningTabs from "../components/cleaningComponents/CleaningTabs";


export default {
  components: {
    CleaningTabs,
  
  },
  data() {
    return {
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
          color: "#315458",
          taskCreator: "",
        },
        {
          id: 2,
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
          color: "#315458"
        },
        {
          id: 5,
          title: "Müll rausbringen",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ",
          endDate: "",
          startDate: "",
          completedOn: "",
          intervallDays: 2,
          // Status: 0 - offen, accepted: 1, declined: 2, done: 3
          status: 0,
          order: [],
          swapDecline: [{ roomie: "", type: "", comment: "" }],
          color: "#315458",
          taskCreator: "",
        },
      ],
    };
  },
  methods: {
      
  }
};
</script>