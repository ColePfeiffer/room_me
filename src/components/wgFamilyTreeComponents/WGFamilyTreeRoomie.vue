<template>
  <v-container ma-auto pa-8 id="FamilyTreeRoomie">
    <DialogProfilePage :roomie="roomie" @save-changes="saveChangesInProfilePage"></DialogProfilePage>
    <v-row no-gutters>
      <v-col>
        <div id="IconWrapper">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <th class="text-left" v-bind="attrs" v-on="on">
                <v-icon
                  id="floatingIcon"
                  v-show="!roomie.movedOut"
                  @click="toggleVacationMode(roomie)"
                  :class="[ roomie.vacationMode ? 'pink--text' : 'white--text']"
                >mdi-island</v-icon>
              </th>
            </template>
            <span>Yolo!</span>
          </v-tooltip>

          <v-list-item-avatar id="avatar" width="100" height="100">
            <v-img
              @click="roomie.showProfilePage = true"
              width="100"
              height="100"
              v-bind:src="roomie.profilePicture"
            ></v-img>
          </v-list-item-avatar>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-list-item-content id="roomieInformation">
          <v-list-item-title>{{ roomie.username }}</v-list-item-title>

          <v-divider class="ma-1" horizontal color="white"></v-divider>
          <v-list-item-subtitle>
            <span>{{"since " + roomie.moveInDate.getFullYear()}}</span>
            <br />
            <span v-if="roomie.movedOut">{{"til " + roomie.moveOutDate.getFullYear() }}</span>
          </v-list-item-subtitle>

          <v-divider class="ma-1" horizontal color="white"></v-divider>
        </v-list-item-content>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialogProfilePage from "../DialogProfilePage";

export default {
  name: "WGFamilyTreeRomie",
  components: {
    DialogProfilePage
  },
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
  methods: {
    saveChangesInProfilePage(roomie, changeData) {
      roomie.username = changeData.username;
      roomie.description = changeData.description;
      roomie.profilePicture = changeData.profilePicture;
      roomie.color = changeData.color;
      roomie.showProfilePage = false;
    },

    toggleVacationMode(roomie) {
      roomie.vacationMode = !roomie.vacationMode;
    }
  }
};
</script>

<style scoped>
.verticalLine {
  border-left: 1.5px solid white;
  height: 100px;
  position: relative;
  left: 50%;
  top: 0;
}

#floatingIcon {
  position: relative;
  bottom: -130px;
  right: -85px;
  cursor: pointer;

  width: 28px;
  height: 28px;
  font-family: Raleway;
  border-radius: 50%;
  margin: 0 auto;
}
</style>