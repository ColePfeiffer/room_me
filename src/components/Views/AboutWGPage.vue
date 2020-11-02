<template>
  <v-col xs="12" sm="6" md="3">
    <div class="WGPage">
      <WGFamilyTree :roomies="roomies"></WGFamilyTree>
    </div>
  </v-col>
</template>

<script>
import WGFamilyTree from "../WGFamilyTree";

export default {
  name: "AboutWGPage",
  emits: [],
  components: {
    WGFamilyTree
  },
  props: {},
  data() {
    return {
      rooms: [],
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
          movedOut: false,
          moveInDate: new Date(2015, 10, 15),
          moveOutDate: new Date(2017, 5, 3)
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
          isLoggedIn: false,
          movedOut: false,
          moveInDate: new Date(2015, 10, 15),
          moveOutDate: new Date(2017, 5, 3)
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
          isLoggedIn: false,
          movedOut: false,
          moveInDate: new Date(2015, 10, 15),
          moveOutDate: new Date(2017, 5, 3)
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
          isLoggedIn: false,
          movedOut: false,
          moveInDate: new Date(2015, 10, 15),
          moveOutDate: new Date(2017, 5, 3)
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>