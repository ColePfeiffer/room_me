<template>
  <v-container class="commentsection" fluid>
    <div class="comments-outside">
      <div class="comments-header">
        <div class="comments-stats">
        </div>
        
      </div>
      <comments
        :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
        :comments="comments"
        @submit-comment="submitComment"
      ></comments>
    </div>
  </v-container>
</template>



<script>

import Comments from './Comments.vue';

export default {

  name: "Home",
 components: {
    Comments
  },
  // Leer
  data() {
    return {

    };
  },
  methods: {
    submitComment: function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.$store.getters.currentUser.username,
        avatar: this.$store.getters.currentUser.profilePicture,
        text: reply
      });
    },
  },
  created() {}
};
</script>

<style>
.comments {
  margin-top: 30px;

  border-radius: 25px;
  padding: 20px;
  padding-bottom: 50px;
}

.comments h1 {
}

.home {
  margin: 5px;
}

.roomme .v-card__title {
  font-size: 1rem;
}
</style>
