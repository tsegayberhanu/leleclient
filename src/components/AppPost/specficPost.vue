<template>
  <div>
    <app-header />
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="7">
        <v-card outlined>
          <app-post :post="getPost" />
        </v-card>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <app-footer />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import appPost from "../../components/AppPost/AppPost.vue";
export default {
  props: ["userId", "postId"],
  computed: {
    ...mapGetters(["findPostById"]),
    ...mapGetters({
      findUserById: "user/findUserById",
    }),
    getPost() {
      return this.findPostById(this.postId);
    },
  },
  components: {
    "app-post": appPost,
  },
};
</script>