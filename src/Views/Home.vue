<template>
  <v-container class="home" fluid>
    <v-carousel height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(post, i) in posts" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="posts">
              <v-card elevation="10" max-width="100%">
                <v-card-title>{{ post.postTitle }}</v-card-title>
                <v-card-text>{{post.postContent}}</v-card-text>
              </v-card>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <CommentSectionHomePage></CommentSectionHomePage>
  </v-container>
</template>

<script>
import axios from "axios";
import CommentSectionHomePage from '../components/CommentSectionHomePage.vue';
export default {
  /*
        beforeCreate: function () {
            document.body.className = 'home';
        },*/
  name: "Home",
components: {
  CommentSectionHomePage,
},
  // Leer
  data() {
    return {
      posts: [
        {
          postId: 1,
          postAuthor: "Peter",
          postTitle: "Hi friends!",
          postContent: "Who wants to go to the beach tomorrow?",
          postTimeDate: "06.06.2020, 13:00",
          comments: [
            {
              commentAuthor: "Clara",
              commentContent: "Me!",
              commentTimeDate: "06.06.2020, 13:30"
            }
          ]
        },
        {
          postid: 2,
          postAuthor: "Clara",
          postTitle: "We need to buy cleaning supplies.",
          postContent: "See title.",
          postTimeDate: "07.06.2020, 14:00",
          comments: [
            {
              commentAuthor: "",
              commentContent: "",
              commentTimeDate: ""
            }
          ]
        }
      ],
      commentTitle: String,
      commentText: String,
      commentTimeDate: Object,
      //activeUser von App.vue;
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },
  methods: {
    postComment() {},
    getComments() {
      axios
        .get("https://jsonplaceholder.typicode.com/comments?_limit=5")
        // res = response, array wird damit gefüllt...
        .then(res => (this.posts = res.data))
        .catch(err => console.log(err));
    }
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
