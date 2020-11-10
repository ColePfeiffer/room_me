<template>
  <v-container>
    <v-row class="d-flex align-start">
      <v-col wrap xs="12" sm="6" md="6">
        <WGFamilyTree :rooms="rooms"></WGFamilyTree>
      </v-col>
    </v-row>
  </v-container>
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
      room: {
        name: "",
        roomies: []
      },
      rooms: [
        {
          name: "room 1",
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
              movedOut: true,
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
              movedOut: true,
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
              movedOut: true,
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
        },
        {
          name: "room 2",
          roomies: [
            {
              id: 0,
              username: "Pete",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/8FcQuUZ.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              username: "Deh",
              description: "Möpp",
              profilePicture:
                "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              balance: -3,
              balancePlus: false,
              selected: true,
              color: "#DE591F",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: true,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 2,
              username: "Deh",
              description: "",
              profilePicture:
                "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              balance: 0,
              balancePlus: true,
              selected: true,
              color: "#BDA0EC",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: true,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        },
        {
          name: "room 3",
          roomies: [
            {
              id: 0,
              username: "Marlon",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/0y9cTae.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              username: "Max",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/8fS7ZkO.gif",
              balance: -3,
              balancePlus: false,
              selected: true,
              color: "#DE591F",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: false,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        },
        {
          name: "room 4",
          roomies: [
            {
              id: 0,
              username: "Marlon",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/0y9cTae.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              username: "Max",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/8fS7ZkO.gif",
              balance: -3,
              balancePlus: false,
              selected: true,
              color: "#DE591F",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: false,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        },
        {
          name: "room 5",
          roomies: [
            {
              id: 0,
              username: "Marlon",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/0y9cTae.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              username: "Max",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/8fS7ZkO.gif",
              balance: -3,
              balancePlus: false,
              selected: true,
              color: "#DE591F",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: false,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        },
        {
          name: "room 6",
          roomies: [
            {
              id: 0,
              username: "Marlon",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/0y9cTae.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              username: "Max",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/8fS7ZkO.gif",
              balance: -3,
              balancePlus: false,
              selected: true,
              color: "#DE591F",
              showProfilePage: false,
              isLoggedIn: false,
              movedOut: false,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>