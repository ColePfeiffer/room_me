<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="500">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Room Manager</h3>
            </div>
          </v-card-title>
          <v-card-text cols="12" sm="12">
            <v-container>
              <v-row justify="space-around">
                <v-col xs="12" sm="6" md="3">
                  <v-carousel height="auto" hide-delimiter-background show-arrows-on-hover>
                    <v-carousel-item v-for="(room) in rooms" :key="room.id">
                      <v-sheet :color="room.currentRoomie.color" height="100%">
                        <v-row class="fill-height" align="center" justify="center">
                          <div class="rooms">
                            <v-row>
                              <v-col>
                                <h3>{{room.name}}</h3>
                              </v-col>
                              <v-col class="text-right">
                                <v-btn small text>
                                  <v-icon @click="acceptItem(item)">mdi-delete</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <span class="currentRoomie">{{room.currentRoomie.username}}</span>
                              </v-col>
                              <v-col class="text-right">
                                <v-btn small text>
                                  <v-icon @click="acceptItem(item)">mdi-delete</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                            <v-row v-for="pastRoomie in room.pastRoomies" :key="pastRoomie.id">
                              <v-col>
                                <span class="pastRoomie">{{pastRoomie.username}}</span>
                              </v-col>
                              <v-col class="text-right">
                                <v-btn small text>
                                  <v-icon @click="acceptItem(item)">mdi-delete</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                            <v-card elevation="10" max-width="100%">
                              <v-card-title>{{ room.name }}</v-card-title>
                              <v-card-text>{{room.name}}</v-card-text>
                            </v-card>
                          </div>
                        </v-row>
                      </v-sheet>
                    </v-carousel-item>
                  </v-carousel>
                </v-col>
              </v-row>

              <div v-for="room in rooms" :key="room.id"></div>
            </v-container>
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
            >Generate an invitation code and send it to your new roommate. While creating an account, they will be asked for their code.</div>
          </v-card-text>
          <!-- Enter name -->
          <v-text-field
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
          <!-- Select room -->
          <v-select
            :items="rooms"
            v-model="roomSelection"
            :color="color"
            name="roomSelection"
            item-text="name"
            label="Select room"
            prepend-icon="mdi-square-outline"
            :rules="[rules.required]"
            required
          ></v-select>

          <v-card-actions>
            <v-row justify="space-around">
              <v-btn color="gray" @click="closeDialog">Cancel</v-btn>
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
      name: "",
      roomSelection: "",
      valid: true,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
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
.currentRoomie {
  color: black;
}
.pastRoomie {
  color: gray;
}

.rooms {
  width: 400 px;
}
</style>