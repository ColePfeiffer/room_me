<template>
  <v-dialog v-model="roomie.showProfilePage" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">Profile Page</v-card-title>
      <v-card-text cols="12" sm="12">
        <v-row class="justify-center mt-5">
          <div class="container">
            <v-img
              width="160"
              height="160"
              max-width="160"
              max-height="160"
              absolute
              class="profile-picture ma-2 rounded-circle"
              :src="changeData.profilePicture"
            ></v-img>

            <div>
              <v-btn fab color="pink" class="btn" depressed @click="onButtonClick">
                <v-icon absolute>mdi-plus</v-icon>
              </v-btn>

              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                v-if="roomie.isLoggedIn"
                @change="uploadPicture"
              />
            </div>
          </div>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              class="mx-2"
              placeholder="Name"
              v-model="changeData.username"
              :disabled="!roomie.isLoggedIn"
              rows="1"
              append-outer-icon="edit"
              prepend-icon="mdi-account"
            ></v-textarea>

            <v-textarea
              class="mx-2"
              label="Info"
              placeholder="Write something about yourself!"
              v-model="changeData.description"
              :disabled="!roomie.isLoggedIn"
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
        <v-btn color="primary" @click="closeDialog">
          {{
          roomie.isLoggedIn ? "Cancel" : "Close"
          }}
        </v-btn>
        <v-btn color="primary" v-if="roomie.isLoggedIn" @click="saveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogProfilePage",
  emits: ["save-changes"],
  props: {
    ["roomie"]: Object
  },
  computed: {},
  data() {
    return {
      changeData: {
        username: this.roomie.username,
        description: this.roomie.description,
        profilePicture: this.roomie.profilePicture,
        color: this.roomie.color
      }
    };
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },

    saveChanges() {
      console.log();
      this.$emit("save-changes", this.roomie, this.changeData);
    },

    closeDialog() {
      this.roomie.showProfilePage = false;

      // reset displayed data to roomies data
      this.changeData.username = this.roomie.username;
      this.changeData.description = this.roomie.description;
      this.changeData.profilePicture = this.roomie.profilePicture;
      this.changeData.color = this.roomie.color;
    },

    uploadPicture: function(event) {
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
          this.roomie.profilePicture = e.target.result;
          this.changeData.profilePicture = e.target.result;
          //this.profilePicture = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 50%;
}
.container img {
  width: 100%;
  height: auto;
}
.container .btn {
  position: absolute;
  top: 80%;
  left: 60%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 24px;

  cursor: pointer;
}
</style>


// text-none