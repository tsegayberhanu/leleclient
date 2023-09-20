<template>
  <v-card-text class="pb-0 pt-0">
    <v-row>
      <v-list-item>
        <v-list-item-avatar>
          <img :src="getCommentAuthor.avaterUrl" />
        </v-list-item-avatar>
        <v-list-item-content class="ma-0 pa-0">
          <v-list-item-title>
            <v-textarea
              auto-grow
              rows="1"
              :readonly="!edit"
              @input="handleInput"
              v-model="content"
              dense
              flat
              hide-details
              filled
              persistent-hint
              rounded
              @keyup.enter="editComment"
            >
              <template #prepend-inner>
                <router-link
                  :to="{
                    name: 'user',
                    params: { userId: getCommentAuthor._id, username: getCommentAuthor.username },
                  }"
                  id="username"
                  >{{ getCommentAuthor.username }}</router-link
                >
                <v-icon v-if="edit" @click="emoji = true">mdi-face</v-icon>
              </template>
              <template #append>
                <v-icon v-if="edit" @click="edit_comment">mdi-send</v-icon>
              </template>
              <template #append-outer v-if="isCommentAuthorCurrentUser">
                <v-menu offset-y nudge-left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      link
                      @click="item.click"
                    >
                      <v-list-item-icon class="mb-0">
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-textarea>

            <v-row no-gutters>
              <v-col cols="8" sm="6"></v-col>
              <v-col cols="4" sm="6">
                <v-dialog v-model="emoji" max-width="250" hide-overlay>
                  <v-emoji-picker @select="selectEmoji" v-if="emoji" />
                </v-dialog>
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row class="ml-8" v-if="!ItIsReplay">
      <v-col class="pt-0 pl-8 pb-0">
        <a text @click="likeComment">like</a>
        <a text @click="replay = !replay" class="ml-3">replay</a>
        <a text to="" class="ml-3">1 min</a>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="pt-0 pb-0">
        <v-spacer></v-spacer>
        <a
          text
          to=""
          @click="seeReplays = !seeReplays"
          v-if="comment.replays.length"
          > {{seeReplays?'hide':'see'}}  {{ comment.replays.length }}
          {{ comment.replays.length > 1 ? "replays" : "replay" }}</a
        >
        <v-btn text icon class="ml-3" v-if="comment.likes.length > 0">
          <v-icon>mdi-thumb-up</v-icon>
          <like-tool-tip :data="comment.likes"></like-tool-tip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-12">
      <v-list-item v-if="replay" class="pa-0 ml-8">
        <v-list-item-avatar class="ma-0 mt-n7">
          <img :src="getCurrentUser.avaterUrl" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="pl-6">
            <v-form @submit.prevent="replayToComment">
              <replay-to-comment v-model="replayContent"></replay-to-comment>
              <v-col class="ml-12 pb-0">
                <a @click="replay = false"> cancel </a>
                <a class="ml-3" @click="replayToComment"> replay </a>
              </v-col>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row v-if="seeReplays" class="ml-12">
      <v-list-item v-for="replay of comment.replays" :key="replay._id">
        <app-post-comment
          :comment="replay"
          :ItIsReplay="true"
          :postId="comment.commentedTo"
        ></app-post-comment>
      </v-list-item>
    </v-row>
  </v-card-text>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import liketooltip from "./ldstooltip.vue";
import basicinput from "../textinputs/basicInput.vue";
import VEmojiPicker from "v-emoji-picker";
import axios from "axios";

export default {
  name: "app-post-comment",
  props: ["comment", "ItIsReplay", "postId"],
  data() {
    return {
      edit: false,
      replay: false,
      seeReplays: false,
      replayContent: "",
      emoji: false,
      content: "",
      items: [
        {
          icon: "mdi-pencil",
          title: "edit",
          click: () => {
            this.edit = true;
          },
        },
        {
          icon: "mdi-delete",
          title: "delete",
          click: this.DeleteComment,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
      getCurrentUser: "user/getCurrentUser",
    }),
    getCommentAuthor() {
      let user = this.findUserById(this.comment.authorId);
      return user;
    },
    isCommentAuthorCurrentUser() {
      return this.getCurrentUser._id == this.comment.authorId;
    },
  },
  mounted() {
    this.content = this.comment.content;
  },
  components: {
    "replay-to-comment": basicinput,
    "v-emoji-picker": VEmojiPicker,
    "like-tool-tip": liketooltip,
  },
  methods: {
    ...mapActions([
      "editComment",
      "deleteComment",
      "likeToComment",
      "editReplay",
      "deleteReplay"
    ]),
    likeComment() {
      const body = {
        postId: this.comment.commentedTo,
        commentId: this.comment._id,
        userId: this.getCurrentUser._id,
      };
      this.likeToComment(body);
    },
    replayToComment() {
      const postId = this.comment.commentedTo;
      const body = {
        authorId: this.getCurrentUser._id,
        commentedTo: this.comment._id,
        content: this.replayContent,
      };
      const data = {
        postId,
        body,
      };
      this.$store
        .dispatch("writeReplay", data)
        .then(() => {
          this.replay = false;
          this.replayContent = "";
        })
        .catch((err) => {
          console.log(err.message);
          this.replay = false;
          this.replayContent = "";
        });
    },

    edit_comment() {
      if (this.ItIsReplay) {
        const replay = {
          replayId: this.comment._id,
          commentId: this.comment.commentedTo,
          postId: this.postId,
          content: this.content,
        };
        this.editReplay(replay);
        this.edit = !this.edit;
      } else {
        const comment = {
          postId: this.comment.commentedTo,
          commentId: this.comment._id,
          content: this.content,
        };
        this.editComment(comment);
        this.edit = !this.edit;
      }
    },
    DeleteComment() {
      if (this.ItIsReplay) {
        const replay = {
          replayId: this.comment._id,
          commentId: this.comment.commentedTo,
          postId: this.postId,
        };
        this.deleteReplay(replay)
      } else {
        const comment = {
          postId: this.comment.commentedTo,
          commentId: this.comment._id,
        };
        this.deleteComment(comment);
      }
    },
    handleInput(e) {
      this.$emit("input", this.content);
    },

    selectEmoji(emoji) {
      this.content += emoji.data;
      this.$emit("input", this.content);
    },
  },
};
</script>
<style scoped>
.comment {
  display: flex;
  flex-direction: row;
}
a {
  text-decoration: none;
}
.container pa-0 {
  margin-left: 0;
}
</style>