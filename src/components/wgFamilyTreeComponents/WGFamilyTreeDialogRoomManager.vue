<template>
  <div>
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
                                  <v-btn x-small text @click="changeView('DELETE_USER')">
                                    delete
                                    <v-icon right dark x-small>mdi-delete</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <br />
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

          <v-container>
            <v-row align="center" justify="center">
              <!-- Content that can be hidden -->

              <!-- Enter room name, NAME -->
              <v-text-field
                v-if="visibleField == 'NAME'"
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

              <div
                v-else-if="visibleField == 'DELETE_USER'"
              >Dummy roomies aren't real roomies. They are used to complete the family tree.</div>
              <div v-else-if="visibleField == 'DELETE_ROOM'">
                Generate an invitatio.
                Blubb.t, they will be asked for their code.
              </div>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-row justify="space-around">
              <v-btn color="pink" :disabled="!valid" @click="create">Create</v-btn>
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
  emits: ["set-showDialog"],

  props: {
    showDialog: Boolean,
    rooms: Array
  },
  created() {},

  data() {
    return {
      color: "#FF6F00", //dialogColor
      creationType: "INVITE",
      // NAME, DELETE_USER, DELETE_ROOM
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
    changeView(viewString) {
      this.visibleField = viewString;
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