<template>
  <v-main>
    <v-row class="align-start pa-8">
      <v-col xs="6" sm="6" md="8">
        <TheFamilyTree :rooms="$store.state.rooms" @create-new-room="createNewRoom" @create-dummy="createDummy"></TheFamilyTree>
      </v-col>
      <v-col xs="6" sm="6" md="4" class="pa-10">
        <TheHouseRules :roomies="$store.state.roomies"></TheHouseRules>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import TheFamilyTree from "../components/wgFamilyTreeComponents/TheFamilyTree";
import TheHouseRules from "../components/wgFamilyTreeComponents/TheHouseRules";

export default {
  name: "AboutWGPage",
  emits: [],
  components: {
    TheFamilyTree,
    TheHouseRules
  },
  props: [],
  data() {
    return {

      
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
      this.selectRoom(roomId).currentRoomie = this.$store.state.dummies[indexOfRoomie];
    },

    selectRoom(roomId){
      return this.$store.state.rooms.find (room => room.id === roomId);
    }
  },

};
</script>

<style>
</style>