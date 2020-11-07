<template>
  <v-container id="FamilyTreeRoomie">
    <div id="Roomie">
      <div id="avatarWrapper">
        <v-list-item-icon>
          <v-icon id="floatingIcon" v-if="!roomie.moveOut">mdi-island</v-icon>
        </v-list-item-icon>

        <v-list-item-avatar id="avatar" width="100" height="100">
          <v-img
            @click="roomie.showProfilePage = true"
            class="profilePicture"
            max-width="100"
            max-height="100"
            v-bind:src="roomie.profilePicture"
          ></v-img>
        </v-list-item-avatar>
      </div>
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

      <div class="verticalLine"></div>

      <v-btn v-if="roomie.movedOut" id="button" elevation="2">+</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "WGFamilyTreeRomie",
  emits: [],
  props: { roomie: Object },
  data() {
    return {
      rooms: [],
      roomieDummy: {
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
  width: 130px;
}
#Roomie {
  width: 70%;
  padding: 5 px;
}

#avatarWrapper {
  /* become a flex container */
  /* its children will be flex items */
  display: flex;
  /* place items in column */
  flex-direction: column;
  /* center flex items horizontally */
  align-items: center;
  /* center all content vertically */
  justify-content: center;
}
.verticalLine {
  border-left: 1.5px solid white;
  height: 100px;
  position: relative;
  left: 50%;
  top: 0;
}

#button {
  top: 10px;
}

#avatar {
  width: 100%;
}

#floatingIcon {
  position: relative;
  bottom: -140px;
  right: -80px;
  cursor: pointer;

  width: 28px;
  height: 28px;
  font-family: Raleway;
  border-radius: 50%;
  margin: 0 auto;
  color: white;
}
</style>