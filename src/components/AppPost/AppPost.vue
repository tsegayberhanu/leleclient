<template>
  <div class="pb-4 mb-4">
    <app-post-header :post="post" @edit_post="edit" />
    <v-card-text class="pb-0">
      <app-post-content :postContent="post.content" :postId="post._id" :readonly="isReadOnly" @setReadOnlyToTrue="readOnlyToTrue" />
      <v-divider />
      <app-post-lds
        :postlds="{
          postId: post._id,
          likes: post.likes,
          deslikes: post.deslikes,
          shares: post.shares,
        }"
      ></app-post-lds>
      <v-divider />
      <div class="add-comment">
        <v-btn text depressed icon light tile @click="focu(post._id)">
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <v-btn
          text
          light
          x-small
          v-if="post.comments.length > 0"
          @click="display(post.comments)"
          >{{ post.comments.length }} comments</v-btn
        >
      </div>

      <write-comment
        class="my-4"
        @update="focuss = $event"
        :postId="post._id"
      />

      <v-divider />
    </v-card-text>
    <v-card-text class="pt-0">
      <span v-for="comment in post.comments" :key="comment.commentedOn">
        <app-post-comment :comment="comment"></app-post-comment>
      </span>
    </v-card-text>
  </div>
</template>
<script>
import appPostHeader from "./AppPostHeader.vue";
import appPostContent from "./AppPostContent";
import appPostComment from "./AppPostComment.vue";
import appPostLDS from "./AppPostLDSC";
import writeComment from "../../views/post/appComment.vue";
import { mapGetters } from "vuex";
export default {
  props: ["post"],
  data() {
    return {
     isReadOnly:true
    }
  },
  components: {
    "write-comment": writeComment,
    "app-post-header": appPostHeader,
    "app-post-content": appPostContent,
    "app-post-comment": appPostComment,
    "app-post-lds": appPostLDS,
  },
  computed:{
    ...mapGetters(['findPostById'])
  },
  methods: {
    edit(){
      this.isReadOnly = !this.isReadOnly
    },
    readOnlyToTrue() {
      this.isReadOnly = true
    }
  },
};
</script>
<style scoped>
</style>