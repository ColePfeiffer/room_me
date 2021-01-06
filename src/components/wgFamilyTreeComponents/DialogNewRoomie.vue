<template>
  <div>
    <v-dialog :value="showDialog" persistent width="500">
      <v-card class="removeScrollbar">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Roomie Creator</h3>
            </div>
          </v-card-title>
          <v-card-text cols="12" sm="12">
            <!-- Enter name -->
            <v-text-field
              v-model="name"
              label="Name"
              sm="6"
              m="6"
              prepend-icon="mdi-account"
              :color="color"
              :rules="[rules.required]"
              maxlength="15"
              required
            ></v-text-field>
            <!-- Select room -->
            <v-select
              :items="getEmptyRooms"
              v-model="roomId"
              :color="color"
              name="roomId"
              :placeholder="getEmptyRooms.length >= 1 ? 'Select an empty room' : 'No empty rooms'"
              item-text="name"
              item-value="id"
              label="Room"
              prepend-icon="mdi-square-outline"
              :rules="[rules.required]"
              required
            ></v-select>

            <!-- Creation Type -->
            <v-radio-group v-model="creationType">
              <v-radio label="create roomie by invitation" value="INVITE" :color="color"></v-radio>
              <v-radio label="create dummy roomie" value="DUMMY" :color="color"></v-radio>
            </v-radio-group>
            <div
              v-if="creationType == 'DUMMY'"
            >Dummy roomies aren't real roomies. They are used to complete the family tree.</div>
            <div
              v-else-if="creationType == 'INVITE'"
            >Generate an invitation code and send it to your new roommate. While creating an account, they will be asked for their code. Doesn't work yet!</div>
          </v-card-text>

          <v-card-actions>
            <v-row justify="space-around">
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn color="pink" :disabled="!valid" @click="createRoomie">Create</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";

export default {
  name: "WGFamilyTreeDialogNewRoomie",
  emits: ["toggle-visibility"],

  props: {
    showDialog: Boolean
  },
  data() {
    return {
      color: "#FF6F00", //dialogColor
      creationType: "INVITE",
      name: "",
      roomId: "",
      valid: true,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    getEmptyRooms() {
      return this.$store.state.rooms.filter(function(room) {
        return room.currentRoomie === "EMPTY";
      });
    }
  },
  methods: {
    closeDialog() {
      this.$emit("toggle-visibility");
    },
    createRoomie() {
      // if this returns true, all required fields are filled out
      if (this.$refs.form.validate()) {
        if (this.creationType == "INVITE") {
          if (this.$store.state.debug)
            console.log("Generate code. NOT YET IMPLEMENTED.");
        } else if (this.creationType == "DUMMY") {
          if (this.$store.state.debug) console.log("Created dummy");

          this.createDummy();
        }
      }
    },
    createDummy() {
      // create dummy
      let dummy = {
        id: uuid.v4(),
        type: "DUMMY",
        username: this.name,
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
      this.selectRoom(this.roomId).currentRoomie = this.$store.state.dummies[
        indexOfRoomie
      ];
    },

    selectRoom(roomId) {
      return this.$store.state.rooms.find(room => room.id === roomId);
    }
  }
};
</script>