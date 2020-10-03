<template>
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
            placeholder="Name"
            :value="roomie.username"
            rows="1"
            append-outer-icon="edit"
            prepend-icon="mdi-account"
          ></v-textarea>

          <v-textarea
            class="mx-2"
            label="Info"
            placeholder="Write something about yourself!"
            :value="roomie.description"
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
      <v-btn color="primary">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "profilePage",

  props: ["roomie"],
  /*{
    'id': Number,
    'username': String,
    'description': String,
    'profilePicture': String,
    'balance': Number,
    'balancePlus': Boolean,
    'selected': Boolean,
    'color': String
  }*/
  computed: {},
  data() {
    return {
      roomie2: {
        id: 0,
        username: "Chris",
        description: "Hi there!",
        profilePicture:
          "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        balance: +3,
        balancePlus: true,
        selected: true,
        color: "#1F85DE"
      },
      title: ""
    };
  },
  methods: {
    uploadPicture: function(event, roomie) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData

          this.roomies.forEach(r => {
            if (r.username === roomie.username) {
              r.profilePicture = e.target.result;
            }
          });
          //this.profilePicture = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>

<style>
</style>