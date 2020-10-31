<template>
  <div id="FamilyTreeRoomie">
    <div id="Roomie">
      <v-list-item-avatar class="avatar" width="100" height="100">
        <v-img
          @click="roomie.showProfilePage = true"
          class="profilePicture"
          max-width="100"
          max-height="100"
          v-bind:src="roomie.profilePicture"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-icon>
        <div id="floatingIcon">
          <v-icon color="yellow">mdi-beach</v-icon>
        </div>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ roomie.username }}</v-list-item-title>
        <v-divider class="ma-1" horizontal color="white"></v-divider>
        <v-list-item-subtitle>
          <span>{{"since " + roomie.moveInDate.getFullYear()}}</span>
          <br />
          <span v-if="roomie.movedOut">{{"til " + roomie.moveOutDate.getFullYear()}}</span>
        </v-list-item-subtitle>

        <v-divider class="ma-1" horizontal color="white"></v-divider>
      </v-list-item-content>
    </div>
    <div class="vl"></div>
  </div>
</template>

<script>
export default {
  name: "WGFamilyTreeRomie",
  emits: [],
  props: {},
  data() {
    return {
      rooms: [],
      roomie: {
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
        //moveOutDate: new Date(1999, 9, 9)
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
#FamilyTreeRoomie {
  max-width: 140px;
  height: 450px;
  background-color: black;
}
#Roomie {
  width: 70%;
  margin: 0 auto;
}

.vl {
  border-left: 1.5px solid white;
  height: 100px;
  position: relative;
  left: 50%;
  top: 0;

  margin: 0 auto;
}

.avatar {
}

.profilePicture {
}
</style>