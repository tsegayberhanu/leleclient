<template>
  <div class="post-header">
    <v-avatar size="48">
      <img
        :src="findUserById(post.authorId).avaterUrl"
        alt="hhh"
        v-on:click="alert(4)"
      />
    </v-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <router-link
          :to="{
            name: 'user',
            params: {
              userId: post.authorId,
              username: findUserById(post.authorId).username,
            },
          }"
          id="username"
          >{{ getUserName }}</router-link
        >
      </v-list-item-title>
      <v-list-item-subtitle>
        <router-link
          style="color: black"
          :to="{
            name: 'post',
            params: { userId: post.authorId, postId: post._id },
          }"
          id="postondate"
          >{{ getPostedDate.calander }} at
          {{
            `${getPostedDate.hours}:${getPostedDate.minutes}:${getPostedDate.seconds}`
          }}</router-link
        >
        <v-menu bottom left v-if="isPostAuthorCurrentUser">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="ml-3" size="20" v-bind="attrs" v-on="on">{{
              whocansee[`${post.whoCanSeeIt}`]
            }}</v-icon>
          </template>
          <v-list>
            <v-list-item
              v-for="(value, prop, index) of whocansee"
              :key="index"
              link
            >
              <v-list-item-icon class="mb-0 mt-0">
                <v-icon>{{ value }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
        <span class="ml-3" v-else>
          <v-icon size="20">{{ whocansee[`${post.whoCanSeeIt}`] }}</v-icon>
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-spacer />
    <v-menu offset-y left v-if="isPostAuthorCurrentUser">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="item.click"
        >
          <v-list-item-icon class="mb-0">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      is_Read_Only: true,
      whocansee: {
        public: "mdi-web",
        friends: "mdi-account-multiple",
        onlyme: "mdi-lock",
      },
      items: [
        {
          icon: "mdi-pencil",
          title: "edit",
          click: this.editPost,
        },
        {
          icon: "mdi-delete",
          title: "delete",
          click: this.DeletePost,
        },
      ],
    };
  },
  props: {
    post: { type: Object },
  },
  computed: {
    ...mapGetters({
      findUserById: "user/findUserById",
      getCurrentUser: "user/getCurrentUser",
    }),
    ...mapGetters(["isReadOnly"]),
    isPostAuthorCurrentUser() {
      return (
        this.findUserById(this.post.authorId)._id == this.getCurrentUser._id
      );
    },
    getUserName() {
      let user = this.findUserById(this.post.authorId);
      if (user) {
        return user.username ? user.username : "unknown";
      } else {
        return "unknown";
      }
    },
    getPostedDate() {
      let dat = new Date(this.post.createdAt);
      let hours = dat.getHours();
      let minutes = dat.getMinutes();
      let seconds = dat.getSeconds();

      const date = {
        calander: dat.toDateString(),
        hours,
        minutes,
        seconds,
      };

      return date;
    },
  },
  methods: {
    ...mapActions(["deletePost"]),
    ...mapMutations(["SET_ISREADONLY"]),
    DeletePost() {
      const post = {
        postId: this.post._id,
      };
      this.deletePost(post);
    },
    editPost() {
      this.$emit("edit_post", this.postId);
      //this.SET_ISREADONLY(!this.isReadOnly);
    },
  },
};
</script>
<style scoped>
.post-header {
  display: flex;
  flex-direction: row;
}
#postondate,
#username {
  text-decoration: none;
}
.v-avatar {
  margin: 6px;
}
</style>