<template>
<!--    Formular Beginn-->
    <v-form v-model="userSettings">
        <v-container>
            <v-column>
                <v-col
                        cols="12"
                        md="4"
                >
                    <div class ="settings">
<!--                       change is an event-listener-->
<!--                        it triggers, whenever a user selects a new file-->
                        <input
                                style="display:none"
                                type="file"
                                @change="onFileSelected"
                                ref="fileInput">
<!--                        ref sets a reference to a different element (for example a button) and re-directs the click to this element-->
                        <button type="button" class="btn btn-success" @click="$refs.fileInput.click()">Pick file</button>

                        <v-img id="profilePicture"
                            max-width= 200
                            max-height= 200
                               :src = "selectedFile"></v-img>
<!--                        change tells src to change based on onFileSelected-->

<!--                        Upload-Function-->
                        <input type="file" @change="onFileSelected">
                        <button @click="onUpload">Upload</button></div>

                    <v-text-field
                            v-model="userSettings"
                            type="text"
                            :counter="10"
                            label="Name"
                            required
                    >{{ username }}</v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="movedInDate"
                            :rules="movedInDateRules"
                            :counter="10"
                            label="Moved in on"
                            required
                    ></v-text-field>
                </v-col>

                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="about"
                            :rules="aboutRules"
                            label="About me"
                            required
                    ></v-text-field>
                    <button type="button" class="btn btn-success" @click="saveUserInput">Save</button>
                </v-col>
            </v-column>

        </v-container>

    </v-form>

</template>

<script>

    export default {
        name: "Settings",
        components: {

        },
        // This stores our data
        data() {

            // will return objects:
            return {
                selectedFile: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",

                showUploadAction: true,
                username: "",
                bio: "",
                livingHereSince: "",
                placeholder: null,
            }
        },
        methods: {
            onFileSelected(event) {
                // event.target.files[0]: our selected file (comes in an array for multi selection)
                this.selectedFile = event.target.files[0] // changes our stored variable to the new file
                console.log(event)
            },
            onUpload(){

            },
            saveUserInput(username) {
                this.username = username;
                console.log(this.username);

            },
            safeSettings() {

            }


        },
    }
</script>

<style scoped>

    .user {
        border: 2px solid white;
    }

</style>