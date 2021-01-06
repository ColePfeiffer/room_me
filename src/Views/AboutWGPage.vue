<template>
  <v-container>
    <v-speed-dial
      class="fab-button"
      color="pink"
      v-model="fab"
      fixed
      right
      bottom
      slide-y-reverse-transition
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-btn fab dark small color="orange" class="ma-2 white--text">
        <v-icon>mdi-help</v-icon>
        <div class="fab-text-custom orange">Help</div>
      </v-btn>

      <v-btn fab dark small color="pink" @click="showDialogForRoomManager = true">
        <v-icon>mdi-pencil</v-icon>
        <div class="fab-text-custom pink">Room Manager</div>
      </v-btn>
      <v-btn fab dark small color="black" @click="showDialogForNewRoomie = true">
        <v-icon>mdi-plus</v-icon>
        <div class="fab-text-custom black">Add roomie</div>
      </v-btn>
    </v-speed-dial>

    <DialogNewRoomie
      :showDialog="showDialogForNewRoomie"
      :rooms="$store.state.rooms"
      @create-dummy="createDummy"
      @toggle-visibility="showDialogForNewRoomie = !showDialogForNewRoomie"
    ></DialogNewRoomie>
    <DialogRoomManager
      :showDialog="showDialogForRoomManager"
      :rooms="$store.state.rooms"
      @create-new-room="createNewRoom"
      @toggle-visibility="showDialogForRoomManager = !showDialogForRoomManager"
    ></DialogRoomManager>

    <v-row class="align-start pa-8">
      <v-col xs="6" sm="6" md="8">
        <TheFamilyTree
          :rooms="$store.state.rooms"
          @create-new-room="createNewRoom"
          @create-dummy="createDummy"
        ></TheFamilyTree>
      </v-col>
      <v-col xs="6" sm="6" md="4" class="pa-10">
        <TheHouseRules :roomies="$store.state.roomies"></TheHouseRules>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialogNewRoomie from "../components/wgFamilyTreeComponents/DialogNewRoomie";
import DialogRoomManager from "../components/wgFamilyTreeComponents/DialogRoomManager";

import TheFamilyTree from "../components/wgFamilyTreeComponents/TheFamilyTree";
import TheHouseRules from "../components/wgFamilyTreeComponents/TheHouseRules";

export default {
  name: "AboutWGPage",
  emits: [],
  components: {
    TheFamilyTree,
    TheHouseRules,
    DialogNewRoomie,
    DialogRoomManager
  },
  props: [],
  data() {
    return {
      fab: false,
      showDialogForNewRoomie: false,
      showDialogForRoomManager: false
    };
  },
  methods: {
    createNewRoom(roomName) {
      this.$store.state.rooms.push({
        id: Math.floor(Math.random() * Date.now()),
        name: roomName,
        currentRoomie: "EMPTY",
        pastRoomies: new Array()
      });
    },
    createDummy(array) {
      let roomId = array[0];
      let dummyName = array[1];
      let dummyId = Math.floor(Math.random() * Date.now());

      // create dummy
      let dummy = {
        id: dummyId,
        type: "DUMMY",
        username: dummyName,
        description: "No description",
        profilePicture: "https://i.gifer.com/T7n8.gif",
        showProfilePage: false,
        movedOut: false,
        moveInDate: new Date(),
        moveOutDate: ""
      };

      //push to dummy array
      this.$store.state.dummies.push(dummy);

      let indexOfRoomie = this.$store.state.dummies.indexOf(dummy);

      // add ref to dummy to selected Room
      this.selectRoom(roomId).currentRoomie = this.$store.state.dummies[
        indexOfRoomie
      ];
    },

    selectRoom(roomId) {
      return this.$store.state.rooms.find(room => room.id === roomId);
    }
  }
};
</script>

<style scoped>
.fab-button {
  padding: 10 px;
  position: fixed;
}

.fab-text-custom {
  position: absolute;
  right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
</style>