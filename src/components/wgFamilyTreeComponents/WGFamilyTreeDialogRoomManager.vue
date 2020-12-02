<template>
  <v-dialog v-model="showDialog" width="550">
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
                                <v-btn x-small text @click="changeView('NAME')">
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
        <v-container v-if="visibleField == 'NAME'">
          <v-row align="center" justify="center">Enter name and hit create.</v-row>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-text-field
                outlined
                clearable
                dense
                :value="name"
                label="Name"
                sm="6"
                m="6"
                prepend-icon="mdi-account"
                :color="color"
                :rules="[rules.required]"
                maxlength="15"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else-if="visibleField == 'DELETE_USER'">
          <v-row align="center" justify="center">Das kann nicht rückgänig gemacht werden. OK.</v-row>
        </v-container>

        <v-container v-else-if="visibleField == 'DELETE_ROOM'">
          <v-row align="center" justify="center">Wirklich löschen?</v-row>
        </v-container>
        <v-card-actions>
          <v-row justify="space-around">
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn color="pink" :disabled="!valid" @click="changeView('NAME')">{{ buttonLabel}}</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn v-if="showCancel" color="gray" @click="changeView('NADA')">cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "WGFamilyTreeDialogRoomManager",
  emits: ["set-showDialog"],

  props: {
    showDialog: Boolean,
    rooms: Array
  },
  created() {},

  data() {
    return {
      showCancel: false,
      buttonLabel: "new room",
      color: "#FF6F00", //dialogColor
      creationType: "INVITE",
      // NAME, DELETE_USER, DELETE_ROOM, NADA
      visibleField: "",
      name: "",
      roomSelection: "",
      valid: true,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    createNewRoom() {
      //roomname, emit
    },

    // changes View and label of button
    changeView(viewString) {
      this.visibleField = viewString;
      if (viewString == "NAME") {
        this.buttonLabel = "create";
        this.showCancel = true;
      } else if (viewString == "NADA") {
        this.buttonLabel = "new room";
        this.showCancel = false;
      }
      console.log(viewString + this.visibleField);
    },
    closeDialog() {
      this.$emit("set-showDialog");
    },
    create() {
      // if this returns true, all required fields are filled out
      if (this.$refs.form.validate()) {
        if (this.creationType == "INVITE") {
          console.log("generate code");
        } else if (this.creationType == "DUMMY") {
          console.log("created dummy");
        }
      }
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