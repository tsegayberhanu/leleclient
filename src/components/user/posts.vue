<template>
  <div>
    <p v-if="!toSeePosts.length" class="ml-12"> no posts to see</p>
    <span v-for="post of toSeePosts" :key="post._id">
      <v-card>
        <app-post :post="post" />
      </v-card>
    </span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import appPost from "../../components/AppPost/AppPost.vue";
export default {
  props: ["userId"],
  components: {
    "app-post": appPost,
  },
  computed: {
    ...mapGetters(["findPostsByAuthor"]),
    ...mapGetters({
      getCurrentUser:"user/getCurrentUser"
    }),
   toSeePosts() {
      const posts = this.findPostsByAuthor({ authorId: this.userId });
      if (!!posts) {
        return posts.filter(
          (post) =>
            this.postIsPublic(post) ||
            (this.onlyFriendsCanSeeThisPost(post) &&
              this.postAuthorIsYourFriend(post)) ||
            this.youAreAuthorOfThePOst(post)
        );
      } else {
        return [];
      }
    },
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