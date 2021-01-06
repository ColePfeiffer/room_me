<template>
  <div class="comment">
    <DialogProfilePage :roomie="comment.roomie" @save-changes="saveChangesInProfilePage"></DialogProfilePage>
    <div class="avatar">
      <v-img
        @click="comment.roomie.showProfilePage = true"
        class="profilePicture"
        v-bind:src="comment.roomie.profilePicture"
      ></v-img>
    </div>
    <div class="text">
      <span class="username">{{ comment.roomie.username }}:</span>
      <span>{{ comment.text }}</span>
    </div>
  </div>
</template>

<script>
import DialogProfilePage from "./DialogProfilePage";
export default {
  name: "singleComment",
  components: {
    DialogProfilePage
  },
  props: ["comment"],
  methods: {
    saveChangesInProfilePage(roomie, changeData) {
      roomie.username = changeData.username;
      roomie.description = changeData.description;
      roomie.profilePicture = changeData.profilePicture;
      roomie.color = changeData.color;
      roomie.showProfilePage = false;
    }
  }
};
</script>

<style scoped>
/* Single-comment component */
.profilePicture {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  align-self: start;
}
.comment {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  color: #333;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
.comment .avatar {
  align-self: flex-start;
}
.comment .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  align-self: start;
}
.comment .text {
  text-align: left;
  margin-left: 5px;
}
.comment .text span {
  margin-left: 5px;
}
.comment .text .username {
  font-weight: bold;
  color: #333;
}
</style>