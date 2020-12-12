<template>
  <v-main>
    <div class="d-flex align-start">
      <v-row class="fill-height pa-15">
        <v-col wrap xs="12" sm="6" md="6">
          <CleaningCalendar></CleaningCalendar>
        </v-col>
        <v-col wrap xs="12" sm="6" md="6">
          <CleaningTabs 
          :currentUser="currentUser" 
          :taskList="taskList"></CleaningTabs>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import CleaningCalendar from "../cleaningComponents/CleaningCalendar";
import CleaningTabs from "../cleaningComponents/CleaningTabs";


export default {
  components: {
    CleaningCalendar,
    CleaningTabs,
  
  },
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
        color: "#1F85DE",
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
       roomies: [
        {
          id: 0,
          username: "Chris",
          description: "Hi there!",
          profilePicture:
            "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: +3,
          balancePlus: true,
          selected: true,
          color: "#1F85DE",
          showProfilePage: false,
          isLoggedIn: true,
        },
        {
          id: 1,
          username: "Hannah",
          description: "Möpp",
          profilePicture:
            "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: -3,
          balancePlus: false,
          selected: true,
          color: "#DE591F",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 2,
          username: "Rufus",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#BDA0EC",
          showProfilePage: false,
          isLoggedIn: false
        },
        {
          id: 3,
          username: "Tim",
          description: "",
          profilePicture:
            "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          balance: 0,
          balancePlus: true,
          selected: true,
          color: "#EBE386",
          showProfilePage: false,
          isLoggedIn: false
        }
      ]
    };
  },
  methods: {
      
  }
};
</script>