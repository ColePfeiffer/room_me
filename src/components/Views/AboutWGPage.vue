<template>
  <v-main>
    <v-row class="align-start pa-8">
      <v-col xs="6" sm="6" md="8">
        <WGFamilyTree :rooms="rooms"></WGFamilyTree>
      </v-col>
      <v-col xs="6" sm="6" md="4" class="pa-10">
        <WGRules></WGRules>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import WGFamilyTree from "../wgFamilyTreeComponents/WGFamilyTree";
import WGRules from "../WGRules";

export default {
  name: "AboutWGPage",
  emits: [],
  components: {
    WGFamilyTree,
    WGRules
  },
  props: {},
  data() {
    return {
      room: {
        id: "",
        name: "",
        currentRoomie: {},
        PastRoomies: []
      },
      dummy: {},
      dummies: [
        {
          id: 19,
          type: "DUMMY",
          username: "David",
          description: "Hi there!",
          profilePicture: "https://i.imgur.com/eCG61tP.jpeg",
          showProfilePage: false,
          movedOut: true,
          moveInDate: new Date(2015, 10, 15),
          moveOutDate: new Date(2019, 5, 3)
        }
      ],
      rooms: [
        {
          id: "1",
          name: "room 1",
          currentRoomie: {
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
            vacationMode: false,
            moveInDate: new Date(2019, 5, 10),
            moveOutDate: new Date(2017, 5, 3)
          },
          pastRoomies: [
            {
              id: 19,
              type: "DUMMY",
              username: "David",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/eCG61tP.jpeg",
              showProfilePage: false,
              movedOut: true,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2019, 5, 3)
            }
          ]
        },
        {
          id: "2",
          name: "room 2",
          currentRoomie: {
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
            vacationMode: false,
            moveInDate: new Date(2017, 10, 15),
            moveOutDate: ""
          },
          pastRoomies: [
            {
              id: 24,
              username: "Pete",
              type: "DUMMY",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/PwDoshF.jpeg",
              //profilePicture: "https://i.imgur.com/8FcQuUZ.gif",
              showProfilePage: false,
              movedOut: true,
              moveInDate: new Date(2015, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            },
            {
              id: 1,
              type: "DUMMY",
              username: "Deh",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/eZ6KzxL.jpeg",
              showProfilePage: false,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2015, 5, 3)
            }
          ]
        },
        {
          id: "3",
          name: "room 3",
          currentRoomie: {
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
            vacationMode: false,
            moveInDate: new Date(2020, 10, 15),
            moveOutDate: new Date(2017, 5, 3)
          },
          pastRoomies: [
            {
              id: 0,
              type: "DUMMY",
              username: "Marlon",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/0y9cTae.gif",
              showProfilePage: false,
              movedOut: true,
              moveInDate: new Date(2017, 10, 15),
              moveOutDate: new Date(2019, 5, 3)
            },
            {
              id: 1,
              type: "DUMMY",
              username: "Max",
              description: "Möpp",
              profilePicture: "https://i.imgur.com/8fS7ZkO.gif",
              showProfilePage: false,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2017, 5, 3)
            }
          ]
        },
        {
          id: "4",
          name: "room 4",
          currentRoomie: {
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
            vacationMode: false,
            moveInDate: new Date(2018, 10, 15),
            moveOutDate: new Date(2017, 5, 3)
          },
          pastRoomies: [
            {
              id: 0,
              username: "Merle",
              description: "Hi there!",
              profilePicture: "https://i.imgur.com/hLms9mt.gif",
              balance: +3,
              balancePlus: true,
              selected: true,
              color: "#1F85DE",
              showProfilePage: false,
              isLoggedIn: true,
              movedOut: true,
              moveInDate: new Date(2013, 10, 15),
              moveOutDate: new Date(2018, 5, 3)
            }
          ]
        } /*
        {
          id: "5",
          name: "room 5",
          currentRoomie:             {
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
            },
          pastRoomies: [
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
        }*/
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>