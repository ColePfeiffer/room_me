<template>
<div @click="closeDialog()">
    <v-dialog :value="showDialog" width="550">
    <v-card class="removeScrollbar">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title primary-title>
          <h3 class="headline mb-0">Room Manager</h3>
        </v-card-title>

        <!-- bla -->
        <v-container>
          <v-row justify="space-around">
            <v-col xs="12" sm="12" md="12">
              <v-carousel height="auto" hide-delimiters show-arrows-on-hover>
                <v-carousel-item v-for="(room) in rooms" :key="room.id">
                  <v-sheet height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <v-card elevation="10" max-width="100%" width="280px">
                        <v-card-title>
                          <v-row>
                            <v-col>{{room.name}}</v-col>
                            <v-col class="text-right">
                              <v-btn x-small text @click="changeView('DELETE_ROOM')">
                                delete
                                <v-icon right dark x-small>mdi-delete</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-title>
                        <v-card-text>
                          <div class="rooms">
                            <v-row>
                              <v-col>
                                <span class="currentRoomie">{{room.currentRoomie.username}}</span>
                              </v-col>
                              <v-col class="text-right">
                                <v-btn x-small text @click="changeView('MOVE_OUT')">
                                  move out
                                  <v-icon right dark x-small>mdi-home</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                            <v-row v-for="pastRoomie in room.pastRoomies" :key="pastRoomie.id">
                              <v-col>
                                <span class="pastRoomie">{{pastRoomie.username}}</span>
                              </v-col>
                              <v-col class="text-right">
                                <v-btn x-small text @click="changeView('DELETE_USER')" n>
                                  delete
                                  <v-icon right dark x-small>mdi-delete</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-container>

        <!-- Content that can be hidden -->

        <!-- Enter room name, NAME -->
        <v-container v-if="viewState == 'NEW_ROOM'">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card class="ma-0 pa-0">
                <v-card-text align="center">
                  Enter name and hit create.
                  <v-col cols="8">
                    <v-text-field
                      class="ma-0 pa-0"
                      outlined
                      clearable
                      dense
                      label="name"
                      sm="6"
                      m="6"
                      prepend-icon="mdi-account"
                      :color="color"
                      :rules="[rules.required]"
                      maxlength="15"
                      required
                      v-model="roomName"
                    ></v-text-field>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else-if="(viewState == 'DELETE_USER' || viewState == 'DELETE_USER_2')">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card>
                <v-card-text align="center">Warning. Deleting a roomie can't be undone.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else-if="(viewState == 'DELETE_ROOM' || viewState == 'DELETE_ROOM_2')">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card>
                <v-card-text align="center">
                  Warning. This can't be undone.
                  You are going to erase the room's history and you will delete all roomies associated with it.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-row justify="space-around">
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn color="pink" :disabled="!valid" @click="changeView()">{{ buttonLabel}}</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn v-if="showCancel" color="gray" @click="reset()">cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: "WGFamilyTreeDialogRoomManager",
  emits: ["toggle-visibility", "create-new-room"],

  props: {
    showDialog: Boolean,
    rooms: Array
  },
  created() {},

  data() {
    return {
      // State Management
      debug: true,
      showCancel: false,
      viewState: "INIT",
      buttonLabel: "new room",

      // Component Settings
      color: "#FF6F00", //dialogColor
      valid: true,
      rules: {
        required: value => !!value || "Required."
      },

      // Data
      roomName: "room " + (this.rooms.length+1)
    };
  },
  methods: {
    // changes View and label of button
    // WIP, bug test and usage of reset
    changeView(newState) {
      switch (arguments.length) {
        // if there are no parameters passed
        case 0:
          switch (this.viewState) {
            // from init to new Room
            case "INIT":
              this.buttonLabel = "create";
              this.viewState = "NEW_ROOM";
              this.showCancel = true;
              break;

            case "NEW_ROOM": // from new room back to init
              this.reset();
              this.createNewRoom();
              break;
            // from anywhere to delete_Room
            case "DELETE_ROOM":
              this.buttonLabel = "delete";
              this.showCancel = true;
              this.viewState = "DELETE_ROOM_2";
              break;
            case "DELETE_ROOM_2":
              this.reset();
              this.deleteRoom();
              break;
            case "DELETE_USER":
              this.buttonLabel = "delete";
              this.showCancel = true;
              this.viewState = "DELETE_USER_2";
              break;

            case "DELETE_USER_2":
              this.reset();
              this.deleteRoom();
              break;

            default:
              break;
          }
          break;

        case 1:
          this.viewState = newState;
          this.changeView();
          break;
      }
    },
    createNewRoom() {
      this.$emit("create-new-room", this.roomName);
    },
    deleteRoom() {
      this.$emit("delete-room");
    },
    deleteUser() {
      this.$emit("delete-user");
    },
    reset() {
      this.buttonLabel = "new room";
      this.showCancel = false;
      this.viewState = "INIT";
      if (this.debug) {
        console.log("Resetted");
      }
    },
    closeDialog() {
      this.$emit("toggle-visibility");
    }
  }
};
</script>

<style>
.removeScrollbar {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.currentRoomie {
}
.pastRoomie {
  color: gray;
}

.rooms {
  width: 400 px;
}
</style>