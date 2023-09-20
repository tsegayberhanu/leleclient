<template>
  <div>
    <v-card v-for="post of getAllowedPosts" :key="post._id">
      <app-post :post="post"></app-post>
    </v-card>
  </div>
</template>
<script>
import appPost from "../../components/AppPost/AppPost.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPosts"]),
    ...mapGetters({
      getCurrentUser: "user/getCurrentUser",
    }),
    getAllowedPosts() {
      return this.getPosts.filter(
        (post) =>
          this.postIsPublic(post) ||
          (this.onlyFriendsCanSeeThisPost(post) &&
            this.postAuthorIsYourFriend(post)) ||
          this.youAreAuthorOfThePOst(post)
      );
    },
  },
  components: {
    "app-post": appPost,
  },
  methods: {
    postIsPublic(post) {
      return post.whoCanSeeIt == "public";
    },
    onlyFriendsCanSeeThisPost(post) {
      return post.whoCanSeeIt == "friends";
    },
    postAuthorIsYourFriend(post) {
      return !!this.getCurrentUser.friends.find(
        (friend) => friend.userId == post.authorId
      );
    },
    youAreAuthorOfThePOst(post) {
      return post.authorId == this.getCurrentUser._id;
    },
  },
};
</script>