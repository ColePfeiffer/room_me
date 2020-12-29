<template>
  <v-container class="commentsection" fluid>
    <div class="comments-outside">
      <div class="comments-header">
        <div class="comments-stats">
          <span><i class="fa fa-thumbs-up"></i> {{ likes }}</span>
          <span><i class="fa fa-comment"></i> {{ comments.length }}</span>
        </div>
        <div class="post-owner">
          <div class="avatar">
            <img :src="creator.avatar" alt="" />
          </div>
          <div class="username">
            <a href="#">@{{ creator.user }}</a>
          </div>
        </div>
      </div>
      <comments
        :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
        :comments="comments"
        :current_user="current_user"
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
 likes: 15,
      creator: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampleCreator'
      },
      current_user: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampler'
      },
      comments: [
        {
          id: 1,
          user: 'Hannah',
          avatar: "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          text: 'Der Chat funktioniert, juhu. Was geht!',
        },
        {
          id: 3,                            
          user: 'Tim',
          avatar:  "https://images.unsplash.com/photo-1516210673878-84fa2173547b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          text: 'Steilo!',
        },
        {
          id: 2,                            
          user: 'Rufus',
          avatar: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          text: 'Who let the dogs out, wuf - wuf - wuf...',
        },
      ],

    };
  },
  methods: {
    submitComment: function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
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
