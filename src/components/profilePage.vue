<template>
  <div class="profilePage">
    <v-dialog v-show="show" width="500">
      <!--Profile Page-->
      <v-card>
        <v-card-title class="headline grey lighten-2">Profile Page</v-card-title>
        <v-card-text cols="12" sm="12">
          <v-row class="justify-center mt-5">
            <v-img
              width="160"
              height="160"
              max-width="160"
              max-height="160"
              class="profile-picture ma-2 rounded-circle"
              :src="roomie.profilePicture"
            >
              <input type="file" @change="uploadPicture(roomie)" accept="image/*" />
              <v-icon>mdi-plus</v-icon>
            </v-img>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                class="mx-2"
                placeholder="Boss Bitch"
                rows="1"
                append-outer-icon="edit"
                prepend-icon="mdi-account"
              ></v-textarea>

              <v-textarea
                class="mx-2"
                label="Info"
                placeholder="...Tell your Roomies something about yourself!"
                rows="1"
                append-outer-icon="edit"
                prepend-icon="info"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogProfilePage = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "profilePage",
  props: {
    value: Boolean
  },
  computed: {},
  data() {
    return {
      title: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>